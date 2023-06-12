import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef, type MouseEvent } from "react";
import { CoreProviders } from "../../CoreProviders";
import { ToastActionButton } from "../ToastActionButton";
import type { CurrentToastActions } from "../useCurrentToastActions";
import { CurrentToastActionsProvider } from "../useCurrentToastActions";

describe("ToastActionButton", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLButtonElement>();
    const props = {
      ref,
      children: "Button",
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
        <ToastActionButton {...props} />
      </CurrentToastActionsProvider>
    );

    const button = getByRole("button", { name: "Button" });
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
    const removeToast = jest.fn();
    const handleClick = jest.fn((_event: MouseEvent<HTMLButtonElement>) => {
      // do nothing
    });
    const actions: CurrentToastActions = {
      clearTimer: jest.fn(),
      removeToast,
      pauseRemoveTimeout: jest.fn(),
      startRemoveTimeout: jest.fn(),
      resumeRemoveTimeout: jest.fn(),
    };
    const { rerender } = render(
      <ToastActionButton onClick={handleClick}>Button</ToastActionButton>,
      {
        wrapper: ({ children }) => (
          <CoreProviders elementInteractionMode="none">
            <CurrentToastActionsProvider value={actions}>
              {children}
            </CurrentToastActionsProvider>
          </CoreProviders>
        ),
      }
    );

    const button = screen.getByRole("button", { name: "Button" });

    await user.click(button);
    expect(removeToast).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledTimes(1);

    handleClick.mockImplementation((event) => {
      event?.stopPropagation();
    });
    await user.click(button);
    expect(removeToast).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledTimes(2);

    rerender(<ToastActionButton>Button</ToastActionButton>);
    await user.click(button);
    expect(removeToast).toHaveBeenCalledTimes(2);
  });

  it("should throw an error if mounted without a parent CurrentToastActionsProvider", () => {
    const error = jest.spyOn(console, "error").mockImplementation(() => {
      // do nothing
    });
    expect(() => render(<ToastActionButton />)).toThrow(
      "The `CurrentToastActionsProvider` has not been initialized"
    );

    error.mockRestore();
  });
});
