import type { RenderOptions, RenderResult } from "@testing-library/react";
import {
  act,
  render as baseRender,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactElement } from "react";
import { Fragment } from "react";
import { CoreProviders } from "../../CoreProviders";
import { Button } from "../../button";
import { Snackbar } from "../Snackbar";
import type { CreateToastOptions } from "../ToastManagerProvider";
import {
  ToastManager,
  ToastManagerProvider,
  addToast,
  clearToasts,
  popToast,
  removeToast,
  toastManager,
  useAddToast,
} from "../ToastManagerProvider";

const render = (
  ui: ReactElement,
  options: RenderOptions = {}
): RenderResult => {
  const { wrapper: Wrapper = Fragment } = options;
  return baseRender(ui, {
    ...options,
    wrapper: ({ children }) => (
      <CoreProviders elementInteractionMode="none">
        <Wrapper>{children}</Wrapper>
      </CoreProviders>
    ),
  });
};

const renderWithManager = (ui: ReactElement): RenderResult =>
  render(ui, {
    wrapper: ({ children }) => (
      <ToastManagerProvider manager={new ToastManager()}>
        {children}
      </ToastManagerProvider>
    ),
  });

interface SimpleTestProps {
  toast?: CreateToastOptions;
}

function SimpleTest(props: SimpleTestProps): ReactElement {
  const { toast = {} } = props;

  const addToast = useAddToast();
  return (
    <>
      <Button onClick={() => addToast({ children: "Hello, world!", ...toast })}>
        Button
      </Button>
      <Snackbar />
    </>
  );
}

describe("Snackbar", () => {
  describe("default toast manager", () => {
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
            <Snackbar />
          </>
        );
      }

      render(<Test />);
      const button = screen.getByRole("button", { name: "Button" });
      const snackbar = screen.getByRole("status");
      expect(snackbar).toBeInTheDocument();

      await user.click(button);
      const message = snackbar.firstElementChild;
      if (!message) {
        throw new Error();
      }

      expect(snackbar).toMatchSnapshot();

      await waitFor(() => {
        expect(message).not.toHaveClass("rmd-toast--enter");
      });
      expect(snackbar).toMatchSnapshot();
    });

    it("should allow toasts to be added outside of a react component (like redux)", async () => {
      render(<Snackbar />);
      const snackbar = screen.getByRole("status");
      expect(snackbar).toBeInTheDocument();
      expect(snackbar).toBeEmptyDOMElement();

      act(() => {
        addToast({ toastId: "toast-id", children: "Fired outside of react!" });
      });

      let toast = screen.getByText("Fired outside of react!");
      expect(toast).toBeInTheDocument();
      await waitFor(() => {
        expect(toast.parentElement).not.toHaveClass(
          "rmd-scale-transition--enter-active"
        );
      });

      act(() => {
        popToast();
      });
      expect(toast).not.toBeInTheDocument();

      act(() => {
        addToast({ toastId: "toast-id", children: "Fired outside of react!" });
        addToast({ toastId: "toast-id-2", children: "Second toast" });
      });
      toast = screen.getByText("Fired outside of react!");
      expect(toast).toBeInTheDocument();

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
      expect(snackbar).toBeEmptyDOMElement();
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
            <Snackbar />
          </>
        );
      }

      renderWithManager(<Test />);
      const snackbar = screen.getByRole("status");
      const scopedAdd = screen.getByRole("button", { name: "Scoped" });
      const globalAdd = screen.getByRole("button", { name: "Global" });

      await user.click(globalAdd);
      expect(snackbar).toBeEmptyDOMElement();

      await user.click(scopedAdd);
      expect(snackbar).not.toBeEmptyDOMElement();
      expect(within(snackbar).getByText("Scoped")).toBeInTheDocument();
    });
  });

  describe("toast queue", () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.clearAllTimers();
      jest.useRealTimers();
    });

    it("should animate a new toast once added to the queue, create an leave timeout, and then leave when the visibleTime is not null", async () => {
      const user = userEvent.setup({ delay: null });
      renderWithManager(<SimpleTest />);
      const button = screen.getByRole("button", { name: "Button" });
      const snackbar = screen.getByRole("status");
      expect(snackbar).toBeEmptyDOMElement();

      await user.click(button);
      expect(snackbar).not.toBeEmptyDOMElement();
      const message = snackbar.firstElementChild;
      if (!message) {
        throw new Error();
      }

      act(() => {
        jest.runOnlyPendingTimers();
      });
      expect(message).toBeInTheDocument();

      act(() => {
        jest.advanceTimersByTime(3000);
      });
      expect(message).toBeInTheDocument();
      expect(message).not.toHaveClass("rmd-scale-transition--exit");

      act(() => {
        jest.advanceTimersByTime(2000);
      });
      expect(message).toBeInTheDocument();
      expect(message).toHaveClass("rmd-scale-transition--exit");
      act(() => {
        jest.runOnlyPendingTimers();
      });
      expect(message).not.toBeInTheDocument();
    });

    it("should pause the leave transition if the user hovers the toast", async () => {
      const user = userEvent.setup({ delay: null });
      renderWithManager(<SimpleTest />);
      const button = screen.getByRole("button", { name: "Button" });
      const snackbar = screen.getByRole("status");
      expect(snackbar).toBeEmptyDOMElement();

      await user.click(button);
      expect(snackbar).not.toBeEmptyDOMElement();
      const message = snackbar.firstElementChild;
      if (!message) {
        throw new Error();
      }

      act(() => {
        jest.runOnlyPendingTimers();
      });
      expect(message).toBeInTheDocument();

      act(() => {
        jest.advanceTimersByTime(3000);
      });
      expect(message).toBeInTheDocument();
      expect(message).not.toHaveClass("rmd-scale-transition--exit");

      await user.hover(message);
      act(() => {
        jest.advanceTimersByTime(3000);
      });
      expect(message).toBeInTheDocument();
      expect(message).not.toHaveClass("rmd-scale-transition--exit");

      await user.unhover(message);
      expect(message).toBeInTheDocument();
      expect(message).not.toHaveClass("rmd-scale-transition--exit");
      act(() => {
        jest.advanceTimersByTime(2000);
      });
      expect(message).toBeInTheDocument();
      expect(message).toHaveClass("rmd-scale-transition--exit");
      act(() => {
        jest.runOnlyPendingTimers();
      });
      expect(message).not.toBeInTheDocument();
    });

    it("should pause and restart the leave transition when the browser loses focus", async () => {
      const user = userEvent.setup({ delay: null });
      renderWithManager(<SimpleTest />);
      const button = screen.getByRole("button", { name: "Button" });
      const snackbar = screen.getByRole("status");
      expect(snackbar).toBeEmptyDOMElement();

      await user.click(button);
      expect(snackbar).not.toBeEmptyDOMElement();
      const message = snackbar.firstElementChild;
      if (!message) {
        throw new Error();
      }

      act(() => {
        jest.runOnlyPendingTimers();
      });
      expect(message).toBeInTheDocument();

      act(() => {
        jest.advanceTimersByTime(3000);
      });
      expect(message).toBeInTheDocument();
      expect(message).not.toHaveClass("rmd-scale-transition--exit");

      await user.hover(message);
      act(() => {
        jest.advanceTimersByTime(3000);
      });
      expect(message).toBeInTheDocument();
      expect(message).not.toHaveClass("rmd-scale-transition--exit");

      jest
        .spyOn(document, "visibilityState", "get")
        .mockReturnValueOnce("hidden")
        .mockReturnValueOnce("visible");

      act(() => {
        document.dispatchEvent(new Event("visibilitychange"));
        jest.advanceTimersByTime(10000);
      });
      expect(message).toBeInTheDocument();
      expect(message).not.toHaveClass("rmd-scale-transition--exit");

      act(() => {
        document.dispatchEvent(new Event("visibilitychange"));
      });
      expect(message).toBeInTheDocument();
      expect(message).not.toHaveClass("rmd-scale-transition--exit");
      act(() => {
        jest.advanceTimersByTime(2000);
      });
      expect(message).toBeInTheDocument();
      expect(message).toHaveClass("rmd-scale-transition--exit");
      act(() => {
        jest.runOnlyPendingTimers();
      });
      expect(message).not.toBeInTheDocument();
    });

    it("should restart toasts with the same toastId by default", async () => {
      const user = userEvent.setup({ delay: null });
      renderWithManager(<SimpleTest toast={{ toastId: "same-toast-id" }} />);
      const button = screen.getByRole("button", { name: "Button" });
      const snackbar = screen.getByRole("status");
      expect(snackbar).toBeEmptyDOMElement();

      await user.click(button);
      expect(snackbar).not.toBeEmptyDOMElement();
      const message = snackbar.firstElementChild;
      if (!message) {
        throw new Error();
      }

      act(() => {
        jest.runOnlyPendingTimers();
      });
      expect(message).toBeInTheDocument();

      act(() => {
        jest.advanceTimersByTime(3000);
      });
      expect(message).toBeInTheDocument();
      expect(message).not.toHaveClass("rmd-scale-transition--exit");

      await user.click(button);
      act(() => {
        jest.advanceTimersByTime(2000);
      });
      expect(message).toBeInTheDocument();
      expect(message).not.toHaveClass("rmd-scale-transition--exit");

      act(() => {
        jest.advanceTimersByTime(2000);
      });
      expect(message).toBeInTheDocument();
      expect(message).not.toHaveClass("rmd-scale-transition--exit");

      act(() => {
        jest.advanceTimersByTime(1000);
      });
      expect(message).toBeInTheDocument();
      expect(message).toHaveClass("rmd-scale-transition--exit");
    });
  });
});
