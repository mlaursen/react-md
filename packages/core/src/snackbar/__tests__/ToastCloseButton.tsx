import { type MouseEvent, createRef } from "react";
import { describe, expect, it, vi } from "vitest";

import {
  render,
  rmdRender,
  screen,
  userEvent,
} from "../../test-utils/index.js";
import { ToastCloseButton } from "../ToastCloseButton.js";
import {
  type CurrentToastActions,
  CurrentToastActionsProvider,
} from "../useCurrentToastActions.js";

describe("ToastCloseButton", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLButtonElement>();
    const props = {
      ref,
    } as const;
    const actions: CurrentToastActions = {
      clearTimer: vi.fn(),
      removeToast: vi.fn(),
      pauseRemoveTimeout: vi.fn(),
      startRemoveTimeout: vi.fn(),
      resumeRemoveTimeout: vi.fn(),
    };
    const { rerender } = render(
      <CurrentToastActionsProvider value={actions}>
        <ToastCloseButton {...props} />
      </CurrentToastActionsProvider>
    );

    const button = screen.getByRole("button", { name: "Close" });
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
    const removeToast = vi.fn();
    const handleClick = vi.fn((_event: MouseEvent<HTMLButtonElement>) => {
      // do nothing
    });
    const actions: CurrentToastActions = {
      removeToast,
      clearTimer: vi.fn(),
      pauseRemoveTimeout: vi.fn(),
      startRemoveTimeout: vi.fn(),
      resumeRemoveTimeout: vi.fn(),
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
    const removeToast = vi.fn();
    const actions: CurrentToastActions = {
      removeToast,
      clearTimer: vi.fn(),
      startRemoveTimeout: vi.fn(),
      pauseRemoveTimeout: vi.fn(),
      resumeRemoveTimeout: vi.fn(),
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
    const error = vi.spyOn(console, "error").mockImplementation(() => {
      // do nothing
    });
    expect(() => render(<ToastCloseButton />)).toThrowError(
      "The `CurrentToastActionsProvider` has not been initialized"
    );

    error.mockRestore();
  });
});
