import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef, type MouseEvent } from "react";
import { CoreProviders } from "../../CoreProviders";
import { ToastCloseButton } from "../ToastCloseButton";
import { RemoveToastProvider } from "../useRemoveToast";

describe("ToastCloseButton", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLButtonElement>();
    const props = {
      ref,
    } as const;
    const { getByRole, rerender } = render(<ToastCloseButton {...props} />);

    const button = getByRole("button", { name: "Close" });
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current).toBe(button);
    expect(button).toMatchSnapshot();

    rerender(
      <ToastCloseButton
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(button).toMatchSnapshot();

    rerender(<ToastCloseButton {...props} reordered />);
    expect(button).toMatchSnapshot();
  });

  it("should not call removeToast when event.stopPropagation() is called", async () => {
    const user = userEvent.setup();
    const removeToast = jest.fn();
    const handleClick = jest.fn((_event: MouseEvent<HTMLButtonElement>) => {
      // do nothing
    });
    render(
      <CoreProviders elementInteractionMode="none">
        <RemoveToastProvider value={removeToast}>
          <ToastCloseButton onClick={handleClick} />
        </RemoveToastProvider>
      </CoreProviders>
    );

    const button = screen.getByRole("button", { name: "Close" });

    await user.click(button);
    expect(removeToast).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledTimes(1);

    handleClick.mockImplementation((event) => {
      event?.stopPropagation();
    });
    await user.click(button);
    expect(removeToast).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  it("should add an aria-label for text button types when an aria-labelledby has not been provided", async () => {
    const user = userEvent.setup();
    const removeToast = jest.fn();
    const { rerender } = render(<ToastCloseButton />, {
      wrapper: ({ children }) => (
        <CoreProviders elementInteractionMode="none">
          <RemoveToastProvider value={removeToast}>
            {children}
          </RemoveToastProvider>
        </CoreProviders>
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

  it("should not crash if the button is clicked without a parent RemoveToastProvider", async () => {
    const user = userEvent.setup();
    render(
      <CoreProviders elementInteractionMode="none">
        <ToastCloseButton />
      </CoreProviders>
    );

    const button = screen.getByRole("button", { name: "Close" });
    await user.click(button);
    expect(button).toMatchSnapshot();
  });
});
