import { describe, expect, it, jest } from "@jest/globals";
import { createRef, type MouseEvent } from "react";
import {
  render,
  rmdRender,
  screen,
  userEvent,
} from "../../test-utils/index.js";

import { ToastCloseButton } from "../ToastCloseButton.js";
import {
  CurrentToastActionsProvider,
  type CurrentToastActions,
} from "../useCurrentToastActions.js";

describe("ToastCloseButton", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLButtonElement>();
    const props = {
      ref,
    } as const;
    const actions: CurrentToastActions = {
      clearTimer: jest.fn(),
      removeToast: jest.fn(),
      pauseRemoveTimeout: jest.fn(),
      startRemoveTimeout: jest.fn(),
      resumeRemoveTimeout: jest.fn(),
    };
    const { getByRole, rerender } = render(
      <CurrentToastActionsProvider value={actions}>
        <ToastCloseButton {...props} />
      </CurrentToastActionsProvider>
    );

    const button = getByRole("button", { name: "Close" });
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current).toBe(button);
    expect(button).toMatchSnapshot();

    rerender(
      <CurrentToastActionsProvider value={actions}>
        <ToastCloseButton
          {...props}
          style={{ color: "white" }}
          className="custom-class-name"
        />
      </CurrentToastActionsProvider>
    );
    expect(button).toMatchSnapshot();

    rerender(
      <CurrentToastActionsProvider value={actions}>
        <ToastCloseButton {...props} reordered />
      </CurrentToastActionsProvider>
    );
    expect(button).toMatchSnapshot();
  });

  it("should not call removeToast when event.stopPropagation() is called", async () => {
    const user = userEvent.setup();
    const removeToast = jest.fn();
    const handleClick = jest.fn((_event: MouseEvent<HTMLButtonElement>) => {
      // do nothing
    });
    const actions: CurrentToastActions = {
      removeToast,
      clearTimer: jest.fn(),
      pauseRemoveTimeout: jest.fn(),
      startRemoveTimeout: jest.fn(),
      resumeRemoveTimeout: jest.fn(),
    };
    rmdRender(
      <CurrentToastActionsProvider value={actions}>
        <ToastCloseButton onClick={handleClick} />
      </CurrentToastActionsProvider>
    );

    const button = screen.getByRole("button", { name: "Close" });

    await user.click(button);
    expect(removeToast).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledTimes(1);

    handleClick.mockImplementation((event) => {
      event.stopPropagation();
    });
    await user.click(button);
    expect(removeToast).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  it("should add an aria-label for text button types when an aria-labelledby has not been provided", async () => {
    const user = userEvent.setup();
    const removeToast = jest.fn();
    const actions: CurrentToastActions = {
      removeToast,
      clearTimer: jest.fn(),
      startRemoveTimeout: jest.fn(),
      pauseRemoveTimeout: jest.fn(),
      resumeRemoveTimeout: jest.fn(),
    };
    const { rerender } = rmdRender(<ToastCloseButton />, {
      wrapper: ({ children }) => (
        <CurrentToastActionsProvider value={actions}>
          {children}
        </CurrentToastActionsProvider>
      ),
    });

    const button = screen.getByRole("button", { name: "Close" });
    expect(button).toHaveAttribute("aria-label", "Close");
    expect(button).toMatchSnapshot();

    rerender(<ToastCloseButton aria-label="Custom" />);
    expect(button).toHaveAttribute("aria-label", "Custom");
    expect(button).toMatchSnapshot();

    rerender(<ToastCloseButton aria-labelledby="custom-id" />);
    expect(button).not.toHaveAttribute("aria-label");
    expect(button).toMatchSnapshot();

    rerender(<ToastCloseButton buttonType="text">Close</ToastCloseButton>);
    expect(button).not.toHaveAttribute("aria-label");
    expect(button).toMatchSnapshot();

    await user.click(button);
    expect(removeToast).toHaveBeenCalled();
  });

  it("should throw an error if mounted without a parent CurrentToastActionsProvider", () => {
    const error = jest.spyOn(console, "error").mockImplementation(() => {
      // do nothing
    });
    expect(() => render(<ToastCloseButton />)).toThrow(
      "The `CurrentToastActionsProvider` has not been initialized"
    );

    error.mockRestore();
  });
});
