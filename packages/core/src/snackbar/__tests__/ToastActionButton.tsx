import { type MouseEvent, createRef } from "react";
import { describe, expect, it, vi } from "vitest";

import {
  render,
  rmdRender,
  screen,
  userEvent,
} from "../../test-utils/index.js";
import { ToastActionButton } from "../ToastActionButton.js";
import {
  type CurrentToastActions,
  CurrentToastActionsProvider,
} from "../useCurrentToastActions.js";

describe("ToastActionButton", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLButtonElement>();
    const props = {
      ref,
      children: "Button",
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
        <ToastActionButton {...props} />
      </CurrentToastActionsProvider>
    );

    const button = screen.getByRole("button", { name: "Button" });
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current).toBe(button);
    expect(button).toMatchSnapshot();

    rerender(
      <CurrentToastActionsProvider value={actions}>
        <ToastActionButton
          {...props}
          style={{ color: "white" }}
          className="custom-class-name"
        />
      </CurrentToastActionsProvider>
    );
    expect(button).toMatchSnapshot();

    rerender(
      <CurrentToastActionsProvider value={actions}>
        <ToastActionButton {...props} reordered />
      </CurrentToastActionsProvider>
    );
    expect(button).toMatchSnapshot();
  });

  it("should not call removeToast if event.stopPropagation() is called", async () => {
    const user = userEvent.setup();
    const removeToast = vi.fn();
    const handleClick = vi.fn((_event: MouseEvent<HTMLButtonElement>) => {
      // do nothing
    });
    const actions: CurrentToastActions = {
      clearTimer: vi.fn(),
      removeToast,
      pauseRemoveTimeout: vi.fn(),
      startRemoveTimeout: vi.fn(),
      resumeRemoveTimeout: vi.fn(),
    };
    const { rerender } = rmdRender(
      <ToastActionButton onClick={handleClick}>Button</ToastActionButton>,
      {
        wrapper: ({ children }) => (
          <CurrentToastActionsProvider value={actions}>
            {children}
          </CurrentToastActionsProvider>
        ),
      }
    );

    const button = screen.getByRole("button", { name: "Button" });

    await user.click(button);
    expect(removeToast).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledTimes(1);

    handleClick.mockImplementation((event) => {
      event.stopPropagation();
    });
    await user.click(button);
    expect(removeToast).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledTimes(2);

    rerender(<ToastActionButton>Button</ToastActionButton>);
    await user.click(button);
    expect(removeToast).toHaveBeenCalledTimes(2);
  });

  it("should throw an error if mounted without a parent CurrentToastActionsProvider", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {
      // do nothing
    });
    expect(() => render(<ToastActionButton />)).toThrowError(
      "The `CurrentToastActionsProvider` has not been initialized"
    );

    error.mockRestore();
  });
});
