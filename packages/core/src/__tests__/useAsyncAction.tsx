import { act, render as baseRender, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { MouseEvent, ReactElement } from "react";
import { box } from "../box";
import type { ButtonProps } from "../button";
import { Button } from "../button";
import { CoreProviders } from "../CoreProviders";
import { CircularProgress } from "../progress";
import { useAsyncAction } from "../useAsyncAction";

const render = (ui: ReactElement): ReturnType<typeof baseRender> =>
  baseRender(ui, {
    wrapper: ({ children }) => (
      <CoreProviders elementInteractionMode="none">{children}</CoreProviders>
    ),
  });

interface TestProps extends ButtonProps {
  onClick(event: MouseEvent<HTMLButtonElement>): Promise<void>;
  hookDisabled?: boolean;
}

function Test(props: TestProps): ReactElement {
  const {
    onClick,
    children = "Button",
    theme,
    disabled,
    hookDisabled,
    ...remaining
  } = props;
  const { handleAsync, pending } = useAsyncAction({
    disabled: disabled || hookDisabled,
  });

  return (
    <Button
      {...remaining}
      aria-disabled={pending || undefined}
      disabled={disabled}
      theme={pending ? "disabled" : theme}
      onClick={handleAsync(onClick)}
    >
      {children}
      {pending && (
        <span
          className={box({
            align: "center",
            disablePadding: true,
          })}
        >
          <CircularProgress />
        </span>
      )}
    </Button>
  );
}

describe("useAsyncAction", () => {
  it("should start the async flow once clicked, prevent additional actions from being fired while pending, and not trigger the action if unmounted", async () => {
    const user = userEvent.setup();

    // this is how you can manually resolve a promise using events
    const instance = new EventTarget();
    const onClick = jest.fn(() => {
      return new Promise<void>((resolve) => {
        instance.addEventListener("resolve-promise", () => resolve());
      });
    });
    const { getByRole, unmount } = render(<Test onClick={onClick} />);
    const button = getByRole("button", { name: "Button" });

    expect(button).not.toHaveAttribute("aria-disabled");
    await user.click(button);
    expect(button).toHaveAttribute("aria-disabled", "true");
    expect(button).not.toHaveAttribute("disabled");
    expect(onClick).toHaveBeenCalledTimes(1);

    act(() => {
      // resolve the promise
      instance.dispatchEvent(new Event("resolve-promise"));
    });
    await waitFor(() => {
      expect(button).not.toHaveAttribute("aria-disabled");
      expect(button).not.toHaveAttribute("disabled");
    });

    await user.click(button);
    expect(button).toHaveAttribute("aria-disabled", "true");
    expect(button).not.toHaveAttribute("disabled");
    expect(onClick).toHaveBeenCalledTimes(2);

    await user.click(button);
    await user.click(button);
    expect(onClick).toHaveBeenCalledTimes(2);

    unmount();

    act(() => {
      instance.dispatchEvent(new Event("resolve-promise"));
    });
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it("should do nothing if the disabled option was provided", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn(async () => {});
    const props: TestProps = {
      onClick,
    };

    const { getByRole, rerender } = render(<Test {...props} disabled />);
    const button = getByRole("button", { name: "Button" });
    expect(button).toBeDisabled();

    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();

    rerender(<Test {...props} hookDisabled />);
    expect(button).not.toBeDisabled();
    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });
});
