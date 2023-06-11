import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef, type MouseEvent } from "react";
import { ToastActionButton } from "../ToastActionButton";
import { RemoveToastProvider } from "../useRemoveToast";
import { CoreProviders } from "../../CoreProviders";

describe("ToastActionButton", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLButtonElement>();
    const props = {
      ref,
      children: "Button",
    } as const;
    const { getByRole, rerender } = render(<ToastActionButton {...props} />);

    const button = getByRole("button", { name: "Button" });
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current).toBe(button);
    expect(button).toMatchSnapshot();

    rerender(
      <ToastActionButton
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(button).toMatchSnapshot();

    rerender(<ToastActionButton {...props} reordered />);
    expect(button).toMatchSnapshot();
  });

  it("should not call removeToast if event.stopPropagation() is called", async () => {
    const user = userEvent.setup();
    const removeToast = jest.fn();
    const handleClick = jest.fn((_event: MouseEvent<HTMLButtonElement>) => {
      // do nothing
    });
    const { rerender } = render(
      <ToastActionButton onClick={handleClick}>Button</ToastActionButton>,
      {
        wrapper: ({ children }) => (
          <CoreProviders elementInteractionMode="none">
            <RemoveToastProvider value={removeToast}>
              {children}
            </RemoveToastProvider>
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
});
