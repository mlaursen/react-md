import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import {
  act,
  rmdRender,
  screen,
  userEvent,
  waitFor,
  within,
  type RenderResult,
} from "../../test-utils/index.js";

import { type ReactElement, type ReactNode } from "react";
import { Button } from "../../button/Button.js";
import { TRANSITION_CONFIG } from "../../transition/config.js";
import { Snackbar, type SnackbarProps } from "../Snackbar.js";
import {
  ToastManager,
  addToast,
  clearToasts,
  popToast,
  removeToast,
  toastManager,
  type CreateToastOptions,
} from "../ToastManager.js";
import { ToastManagerProvider, useAddToast } from "../ToastManagerProvider.js";

const ENTER_CLASS_NAME = "rmd-scale-transition--enter";
const LEAVE_CLASS_NAME = "rmd-scale-transition--exit";

const renderWithManager = (ui: ReactElement): RenderResult =>
  rmdRender(ui, {
    wrapper: ({ children }) => (
      <ToastManagerProvider manager={new ToastManager()}>
        {children}
      </ToastManagerProvider>
    ),
  });

const expectToastTimeoutFlow = (
  message: Element | null,
  content: string
): void => {
  expect(message).toHaveTextContent(content);
  act(() => {
    jest.runOnlyPendingTimers();
  });
  expect(message).not.toHaveClass(ENTER_CLASS_NAME);
  act(() => {
    jest.runOnlyPendingTimers();
  });
  expect(message).toHaveClass(LEAVE_CLASS_NAME);
  act(() => {
    jest.runOnlyPendingTimers();
  });
  expect(message).not.toBeInTheDocument();
};

interface SimpleTestProps {
  toast?: CreateToastOptions;
  snackbar?: SnackbarProps;
  children?: ReactNode;
}

function SimpleTest(props: SimpleTestProps): ReactElement {
  const { toast = {}, children, snackbar } = props;

  const addToast = useAddToast();
  return (
    <>
      <Button onClick={() => addToast({ children: "Hello, world!", ...toast })}>
        Button
      </Button>
      {children}
      <Snackbar data-testid="snackbar" {...snackbar} />
    </>
  );
}

describe("ToastManagerProvider", () => {
  describe("default toast manager", () => {
    beforeEach(() => {
      TRANSITION_CONFIG.disabled = false;
    });

    afterEach(() => {
      toastManager.clearToasts(true);
    });

    it("should work without needing to setup a toast manager yourself", async () => {
      const user = userEvent.setup();
      function Test(): ReactElement {
        return (
          <>
            <Button onClick={() => addToast({ children: "Hello, world!" })}>
              Button
            </Button>
            <Snackbar data-testid="snackbar" />
          </>
        );
      }

      rmdRender(<Test />);
      const button = screen.getByRole("button", { name: "Button" });
      expect(() => screen.getByTestId("snackbar")).toThrow();

      await user.click(button);
      const snackbar = await screen.findByTestId("snackbar");
      const message = await screen.findByRole("status");

      expect(snackbar).toMatchSnapshot();

      await waitFor(() => {
        expect(message).not.toHaveClass(ENTER_CLASS_NAME);
      });
      expect(snackbar).toMatchSnapshot();
    });

    it("should allow toasts to be added outside of a react component (like redux)", async () => {
      rmdRender(<Snackbar data-testid="snackbar" />);

      act(() => {
        addToast({ toastId: "toast-id", children: "Fired outside of react!" });
      });

      let toast = await screen.findByRole("status");
      expect(toast).toBeInTheDocument();

      act(() => {
        popToast();
      });
      expect(toast).not.toBeInTheDocument();

      act(() => {
        addToast({ toastId: "toast-id", children: "Fired outside of react!" });
        addToast({ toastId: "toast-id-2", children: "Second toast" });
      });
      toast = await screen.findByRole("status");

      act(() => {
        removeToast("invalid-toast-id", false);
      });
      expect(toast).toBeInTheDocument();

      act(() => {
        removeToast("toast-id", false);
      });
      expect(toast).not.toBeInTheDocument();
      expect(screen.getByText("Second toast")).toBeInTheDocument();

      act(() => {
        addToast({ children: "Toast" });
        addToast({ children: "Toast" });
        addToast({ children: "Toast" });
        clearToasts();
      });
      expect(() => screen.getByTestId("snackbar")).toThrow();
    });

    it("should not add a toast to another toast manager", async () => {
      const user = userEvent.setup();
      function Test(): ReactElement {
        const scopedAddToast = useAddToast();
        return (
          <>
            <Button onClick={() => scopedAddToast({ children: "Scoped" })}>
              Scoped
            </Button>
            <Button onClick={() => addToast({ children: "Global" })}>
              Global
            </Button>
            <Snackbar data-testid="snackbar" />
          </>
        );
      }

      renderWithManager(<Test />);
      const scopedAdd = screen.getByRole("button", { name: "Scoped" });
      const globalAdd = screen.getByRole("button", { name: "Global" });

      await user.click(globalAdd);
      expect(() => screen.getByTestId("snackbar")).toThrow();

      await user.click(scopedAdd);
      const snackbar = await screen.findByTestId("snackbar");
      expect(within(snackbar).getByText("Scoped")).toBeInTheDocument();
    });
  });

  describe("toast queue", () => {
    beforeEach(() => {
      jest.useFakeTimers();
      TRANSITION_CONFIG.disabled = false;
    });

    afterEach(() => {
      jest.clearAllTimers();
      jest.useRealTimers();
    });

    const init = async (props?: SimpleTestProps) => {
      // eslint-disable-next-line testing-library/await-async-events
      const user = userEvent.setup({ delay: null });
      // eslint-disable-next-line testing-library/render-result-naming-convention
      const result = renderWithManager(<SimpleTest {...props} />);
      const button = screen.getByRole("button", { name: "Button" });

      await user.click(button);
      const snackbar = await screen.findByTestId("snackbar");
      const message = await screen.findByRole("status");

      act(() => {
        jest.runOnlyPendingTimers();
      });
      expect(message).toBeInTheDocument();

      act(() => {
        jest.advanceTimersByTime(3000);
      });
      expect(message).toBeInTheDocument();
      expect(message).not.toHaveClass(LEAVE_CLASS_NAME);

      return {
        user,
        button,
        snackbar,
        message,
        ...result,
      };
    };

    it("should animate a new toast once added to the queue, create an leave timeout, and then leave when the visibleTime is not null", async () => {
      const { message } = await init();

      act(() => {
        jest.advanceTimersByTime(2000);
      });
      expect(message).toBeInTheDocument();
      expect(message).toHaveClass(LEAVE_CLASS_NAME);
      act(() => {
        jest.runOnlyPendingTimers();
      });
      expect(message).not.toBeInTheDocument();
    });

    it("should pause the leave transition if the user hovers the toast", async () => {
      const { message, user } = await init();

      await user.hover(message);
      act(() => {
        jest.advanceTimersByTime(3000);
      });
      expect(message).toBeInTheDocument();
      expect(message).not.toHaveClass(LEAVE_CLASS_NAME);

      await user.unhover(message);
      expect(message).toBeInTheDocument();
      expect(message).not.toHaveClass(LEAVE_CLASS_NAME);
      act(() => {
        jest.advanceTimersByTime(2000);
      });
      expect(message).toBeInTheDocument();
      expect(message).toHaveClass(LEAVE_CLASS_NAME);
      act(() => {
        jest.runOnlyPendingTimers();
      });
      expect(message).not.toBeInTheDocument();
    });

    it("should pause and restart the leave transition when the browser loses focus", async () => {
      const { message, user } = await init();

      await user.hover(message);
      act(() => {
        jest.advanceTimersByTime(3000);
      });
      expect(message).toBeInTheDocument();
      expect(message).not.toHaveClass(LEAVE_CLASS_NAME);

      jest
        .spyOn(document, "visibilityState", "get")
        .mockReturnValueOnce("hidden")
        .mockReturnValueOnce("visible");

      act(() => {
        document.dispatchEvent(new Event("visibilitychange"));
        jest.advanceTimersByTime(10000);
      });
      expect(message).toBeInTheDocument();
      expect(message).not.toHaveClass(LEAVE_CLASS_NAME);

      act(() => {
        document.dispatchEvent(new Event("visibilitychange"));
      });
      expect(message).toBeInTheDocument();
      expect(message).not.toHaveClass(LEAVE_CLASS_NAME);
      act(() => {
        jest.advanceTimersByTime(2000);
      });
      expect(message).toBeInTheDocument();
      expect(message).toHaveClass(LEAVE_CLASS_NAME);
      act(() => {
        jest.runOnlyPendingTimers();
      });
      expect(message).not.toBeInTheDocument();
    });

    it("should restart toasts with the same toastId by default", async () => {
      const user = userEvent.setup({ delay: null });
      renderWithManager(<SimpleTest toast={{ toastId: "same-toast-id" }} />);
      const button = screen.getByRole("button", { name: "Button" });

      await user.click(button);
      const message = await screen.findByRole("status");

      act(() => {
        jest.runOnlyPendingTimers();
      });
      expect(message).toBeInTheDocument();

      act(() => {
        jest.advanceTimersByTime(3000);
      });
      expect(message).toBeInTheDocument();
      expect(message).not.toHaveClass(LEAVE_CLASS_NAME);

      await user.click(button);
      act(() => {
        jest.advanceTimersByTime(2000);
      });
      expect(message).toBeInTheDocument();
      expect(message).not.toHaveClass(LEAVE_CLASS_NAME);

      act(() => {
        jest.advanceTimersByTime(2000);
      });
      expect(message).toBeInTheDocument();
      expect(message).not.toHaveClass(LEAVE_CLASS_NAME);

      act(() => {
        jest.advanceTimersByTime(1000);
      });
      expect(message).toBeInTheDocument();
      expect(message).toHaveClass(LEAVE_CLASS_NAME);
    });

    it("should allow a toast to replace the currently shown toast", async () => {
      function Children() {
        const addToast = useAddToast();
        return (
          <Button
            onClick={() => {
              addToast({ children: "Replace!", priority: "replace" });
            }}
          >
            Replace!
          </Button>
        );
      }
      const { user, message, snackbar } = await init({
        children: <Children />,
      });

      const replace = screen.getByRole("button", { name: "Replace!" });
      await user.click(replace);
      act(() => {
        jest.runOnlyPendingTimers();
      });
      expect(message).not.toBeInTheDocument();
      expect(snackbar).not.toBeEmptyDOMElement();

      const replaceMessage = snackbar.firstElementChild;
      act(() => {
        jest.runOnlyPendingTimers();
      });
      expect(replaceMessage).not.toHaveClass(ENTER_CLASS_NAME);
      expect(replaceMessage).toMatchSnapshot();
      act(() => {
        jest.advanceTimersByTime(5000);
      });
      expect(replaceMessage).toHaveClass(LEAVE_CLASS_NAME);

      act(() => {
        jest.runOnlyPendingTimers();
      });
      expect(replaceMessage).not.toBeInTheDocument();
      expect(snackbar).toBeEmptyDOMElement();
    });

    it("should use the normal queue if there are no toasts in the queue or the only toast is has the same toastId and duplicates are not allowed", async () => {
      function Children() {
        const addToast = useAddToast();
        return (
          <>
            <Button
              onClick={() => {
                addToast({
                  toastId: "next",
                  children: "Next!",
                  priority: "next",
                });
              }}
            >
              Next
            </Button>
            <Button
              onClick={() => {
                addToast({
                  toastId: "replace",
                  children: "Replace!",
                  priority: "replace",
                });
              }}
            >
              Replace
            </Button>
            <Button
              onClick={() => {
                addToast({
                  toastId: "immediate",
                  children: "Immediate!",
                  priority: "immediate",
                });
              }}
            >
              Immediate
            </Button>
          </>
        );
      }
      const { user, message } = await init({
        children: <Children />,
      });
      act(() => {
        jest.runOnlyPendingTimers();
      });
      expect(message).toHaveClass(LEAVE_CLASS_NAME);
      act(() => {
        jest.runOnlyPendingTimers();
      });
      expect(message).not.toBeInTheDocument();

      const next = screen.getByRole("button", { name: "Next" });
      const replace = screen.getByRole("button", { name: "Replace" });
      const immediate = screen.getByRole("button", { name: "Immediate" });

      const testFullFlow = async (button: HTMLElement): Promise<void> => {
        await user.click(button);
        const snackbar = await screen.findByTestId("snackbar");
        const nextMessage = within(snackbar).getByRole("status");
        expect(nextMessage).toHaveClass(ENTER_CLASS_NAME);
        act(() => {
          jest.runOnlyPendingTimers();
        });
        expect(nextMessage).not.toHaveClass(ENTER_CLASS_NAME);

        act(() => {
          jest.advanceTimersByTime(3000);
        });
        expect(nextMessage).toBeInTheDocument();
        expect(nextMessage).not.toHaveClass(LEAVE_CLASS_NAME);

        await user.click(button);
        act(() => {
          jest.advanceTimersByTime(2000);
        });
        expect(nextMessage).toBeInTheDocument();
        expect(nextMessage).not.toHaveClass(LEAVE_CLASS_NAME);

        act(() => {
          jest.runOnlyPendingTimers();
        });
        expect(nextMessage).toHaveClass(LEAVE_CLASS_NAME);
        act(() => {
          jest.runOnlyPendingTimers();
        });
        expect(nextMessage).not.toBeInTheDocument();
        expect(snackbar).toBeEmptyDOMElement();
      };

      await testFullFlow(next);
      await testFullFlow(replace);
      await testFullFlow(immediate);
    });

    it("should reorder the queue if the next added toast has the replace priority but the toast id exists later in the queue", async () => {
      function Children() {
        const addToast = useAddToast();

        return (
          <>
            <Button
              onClick={() =>
                addToast({ toastId: "toast-1", children: "Toast 1" })
              }
            >
              Toast 1
            </Button>
            <Button
              onClick={() =>
                addToast({ toastId: "toast-2", children: "Toast 2" })
              }
            >
              Toast 2
            </Button>
            <Button
              onClick={() =>
                addToast({ toastId: "toast-3", children: "Toast 3" })
              }
            >
              Toast 3
            </Button>
            <Button
              onClick={() =>
                addToast({
                  toastId: "toast-3",
                  children: "Toast 3",
                  priority: "replace",
                })
              }
            >
              Replace
            </Button>
          </>
        );
      }
      const { user, message, snackbar } = await init({
        children: <Children />,
      });
      const toast1 = screen.getByRole("button", { name: "Toast 1" });
      const toast2 = screen.getByRole("button", { name: "Toast 2" });
      const toast3 = screen.getByRole("button", { name: "Toast 3" });
      const replace = screen.getByRole("button", { name: "Replace" });

      await user.click(toast1);
      await user.click(toast2);
      await user.click(toast3);
      expect(message).toBeInTheDocument();

      await user.click(replace);
      expect(message).toHaveClass(LEAVE_CLASS_NAME);
      act(() => {
        jest.runOnlyPendingTimers();
      });

      expectToastTimeoutFlow(snackbar.firstElementChild, "Toast 3");
      expectToastTimeoutFlow(snackbar.firstElementChild, "Toast 1");
      expectToastTimeoutFlow(snackbar.firstElementChild, "Toast 2");
      expect(snackbar).toBeEmptyDOMElement();
    });

    it("should add a toast next in queue if a different toast is being displayed and duplicates are allowed or the toast does not exist in the queue yet", async () => {
      function Children() {
        const addToast = useAddToast();

        return (
          <>
            <Button
              onClick={() => {
                addToast({ children: "Another" });
              }}
            >
              Another
            </Button>
            <Button
              onClick={() => {
                addToast({
                  toastId: "next",
                  children: "Next",
                  priority: "next",
                });
              }}
            >
              Next
            </Button>
          </>
        );
      }

      const { user, message, snackbar } = await init({
        children: <Children />,
      });
      expect(message).toBeInTheDocument();
      const another = screen.getByRole("button", { name: "Another" });
      const next = screen.getByRole("button", { name: "Next" });

      await user.click(another);
      await user.click(next);
      expect(message).toBeInTheDocument();
      expect(message).toMatchSnapshot();

      act(() => {
        jest.runOnlyPendingTimers();
      });
      expect(message).toHaveClass(LEAVE_CLASS_NAME);
      act(() => {
        jest.runOnlyPendingTimers();
      });
      expect(message).not.toBeInTheDocument();
      expect(snackbar).not.toBeEmptyDOMElement();

      expectToastTimeoutFlow(snackbar.firstElementChild, "Next");
      expect(snackbar).not.toBeEmptyDOMElement();
      const anotherMessage = snackbar.firstElementChild;
      expect(anotherMessage).toHaveTextContent("Another");
    });

    it("should move the toast with a matching toastId to next in queue if it was added with priority next", async () => {
      function Children() {
        const addToast = useAddToast();

        return (
          <>
            <Button
              onClick={() => {
                addToast({
                  toastId: "next",
                  children: "Next",
                  priority: "next",
                });
              }}
            >
              Next
            </Button>
            <Button
              onClick={() => {
                addToast({ toastId: "next", children: "Next id" });
              }}
            >
              Next id
            </Button>
          </>
        );
      }
      const { user, message, button, snackbar } = await init({
        children: <Children />,
      });
      const next = screen.getByRole("button", { name: "Next" });
      const nextId = screen.getByRole("button", { name: "Next id" });

      await user.click(button);
      await user.click(button);
      await user.click(nextId);
      expect(message).not.toHaveClass(LEAVE_CLASS_NAME);

      await user.click(button);
      await user.click(next);
      expect(message).toBeInTheDocument();

      act(() => {
        jest.advanceTimersByTime(1000);
      });
      expect(message).toBeInTheDocument();

      act(() => {
        jest.advanceTimersByTime(1000);
      });
      expect(message).toHaveClass(LEAVE_CLASS_NAME);

      act(() => {
        jest.runOnlyPendingTimers();
      });
      expect(message).not.toBeInTheDocument();

      expectToastTimeoutFlow(snackbar.firstElementChild, "Next");
      expectToastTimeoutFlow(snackbar.firstElementChild, "Hello, world!");
      expectToastTimeoutFlow(snackbar.firstElementChild, "Hello, world!");
      expectToastTimeoutFlow(snackbar.firstElementChild, "Hello, world!");
      expect(snackbar).toBeEmptyDOMElement();
    });

    it("should force the current toast to hide, display the next toast, and then replay the toast that was hidden when set to immediate", async () => {
      function Children() {
        const addToast = useAddToast();

        return (
          <>
            <Button
              onClick={() => {
                addToast({ children: "Immediate", priority: "immediate" });
              }}
            >
              Immediate
            </Button>
          </>
        );
      }

      const { user, message, snackbar } = await init({
        children: <Children />,
      });

      const immediate = screen.getByRole("button", { name: "Immediate" });
      await user.click(immediate);
      expect(message).toHaveClass(LEAVE_CLASS_NAME);
      act(() => {
        jest.runOnlyPendingTimers();
      });
      expect(message).not.toBeInTheDocument();

      expectToastTimeoutFlow(snackbar.firstElementChild, "Immediate");

      const helloWorld = snackbar.firstElementChild;
      expect(helloWorld).toHaveTextContent("Hello, world!");
    });

    it("should not trigger a timeout if the visibleTime is null and set the toast to have an alert role", async () => {
      const user = userEvent.setup({ delay: null });
      function Test() {
        const addToast = useAddToast();

        return (
          <>
            <Button
              onClick={() => {
                addToast({ visibleTime: null, children: "Alert!" });
              }}
            >
              Alert
            </Button>
            <Snackbar data-testid="snackbar" />
          </>
        );
      }

      renderWithManager(<Test />);
      const button = screen.getByRole("button", { name: "Alert" });

      await user.click(button);

      const snackbar = screen.getByTestId("snackbar");
      const alert = screen.getByRole("alert");
      expect(snackbar).toMatchSnapshot();

      act(() => {
        jest.advanceTimersByTime(5000);
      });

      expect(alert).not.toHaveClass(LEAVE_CLASS_NAME);
      act(() => {
        jest.advanceTimersByTime(5000);
      });
      expect(alert).toBeInTheDocument();

      await user.click(screen.getByRole("button", { name: "Close" }));
      expect(alert).toHaveClass(LEAVE_CLASS_NAME);
      expect(snackbar).toMatchSnapshot();
    });

    it("should support rendering multiple toasts as once using the limit prop", async () => {
      const { user, message, snackbar, button } = await init({
        snackbar: {
          limit: 3,
        },
      });

      await user.click(button);
      await user.click(button);
      await user.click(button);
      await user.click(button);

      expect(snackbar.childElementCount).toBe(3);
      expect(snackbar).toMatchSnapshot();

      act(() => {
        jest.advanceTimersByTime(2000);
      });
      expect(snackbar.childElementCount).toBe(3);
      expect(message).toHaveClass(LEAVE_CLASS_NAME);

      act(() => {
        jest.advanceTimersByTime(200);
      });
      expect(message).not.toBeInTheDocument();
      expect(snackbar.childElementCount).toBe(3);
      expect(snackbar).toMatchSnapshot();

      act(() => {
        jest.runOnlyPendingTimers();
      });
      expect(snackbar.childElementCount).toBe(3);
      expect(snackbar.firstElementChild).toHaveClass(LEAVE_CLASS_NAME);
      expect(snackbar.firstElementChild?.nextElementSibling).toHaveClass(
        LEAVE_CLASS_NAME
      );
      expect(snackbar.lastElementChild).not.toHaveClass(LEAVE_CLASS_NAME);
      expect(snackbar).toMatchSnapshot();

      act(() => {
        jest.runAllTimers();
      });
      expect(snackbar.childElementCount).toBe(2);
      expect(snackbar).toMatchSnapshot();

      act(() => {
        jest.runOnlyPendingTimers();
      });
      expect(snackbar.childElementCount).toBe(1);
      expect(snackbar.firstElementChild).not.toHaveClass(ENTER_CLASS_NAME);

      act(() => {
        jest.runOnlyPendingTimers();
      });
      expect(snackbar.firstElementChild).toHaveClass(LEAVE_CLASS_NAME);

      act(() => {
        jest.runAllTimers();
      });
      expect(snackbar).toBeEmptyDOMElement();
    });
  });
});
