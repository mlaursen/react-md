import { describe, expect, it, jest } from "@jest/globals";
import type { ReactElement } from "react";
import { fireEvent, render, waitFor, within } from "../../test-utils/index.js";

import { Button } from "../../button/Button.js";
import { SsrProvider } from "../../SsrProvider.js";
import { useToggle } from "../../useToggle.js";
import type { OverlayProps } from "../Overlay.js";
import { Overlay } from "../Overlay.js";

interface TestProps {
  defaultVisible?: boolean;
}

function Test({ defaultVisible = false }: TestProps): ReactElement {
  const { toggle, disable, toggled: visible } = useToggle(defaultVisible);

  return (
    <>
      <Button onClick={toggle}>Toggle</Button>
      <Overlay data-testid="overlay" visible={visible} onClick={disable} />
    </>
  );
}

describe("Overlay", () => {
  it("should support rendering inline if disablePortal prop is true", () => {
    const { container, getByTestId } = render(
      <Overlay data-testid="overlay" visible disablePortal />
    );

    const overlay = getByTestId("overlay");
    expect(container.firstElementChild).toBe(overlay);
    expect(container).toMatchSnapshot();
  });

  it("should suport rendering inline if it was visible by default and rendered through ssr", async () => {
    const { container, getByRole, getByTestId } = render(
      <Test defaultVisible />,
      {
        wrapper: ({ children }) => <SsrProvider ssr>{children}</SsrProvider>,
      }
    );

    const button = getByRole("button", { name: "Toggle" });
    const overlay = getByTestId("overlay");
    expect(button.nextElementSibling).toBe(overlay);
    expect(container).toMatchSnapshot();

    fireEvent.click(overlay);
    await waitFor(() => {
      expect(overlay).not.toBeInTheDocument();
    });

    fireEvent.click(button);
    await waitFor(() => {
      expect(() => getByTestId("overlay")).not.toThrow();
      expect(() => within(container).getByTestId("overlay")).toThrow();
    });
  });

  it("should allow for overriding CSS transition options", async () => {
    const onEnter = jest.fn();
    const onEntering = jest.fn();
    const onEntered = jest.fn();
    const onExit = jest.fn();
    const onExiting = jest.fn();
    const onExited = jest.fn();

    const props: Partial<OverlayProps> & { "data-testid": string } = {
      "data-testid": "overlay",
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
      temporary: false,
    };

    const { getByTestId, rerender } = render(
      <Overlay {...props} visible={false} />
    );

    const overlay = getByTestId("overlay");
    expect(overlay).toHaveAttribute("hidden");
    expect(overlay).toMatchSnapshot();

    expect(onEnter).not.toHaveBeenCalled();
    expect(onEntering).not.toHaveBeenCalled();
    expect(onEntered).not.toHaveBeenCalled();
    expect(onExit).not.toHaveBeenCalled();
    expect(onExiting).not.toHaveBeenCalled();
    expect(onExited).not.toHaveBeenCalled();

    rerender(<Overlay {...props} visible />);
    await waitFor(() => {
      expect(onEnter).toHaveBeenCalledTimes(1);
      expect(onEntering).toHaveBeenCalledTimes(1);
      expect(onEntered).toHaveBeenCalledTimes(1);
      expect(onExit).not.toHaveBeenCalled();
      expect(onExiting).not.toHaveBeenCalled();
      expect(onExited).not.toHaveBeenCalled();
    });
    expect(overlay).not.toHaveAttribute("hidden");
    expect(overlay).toMatchSnapshot();

    rerender(<Overlay {...props} visible={false} />);
    await waitFor(() => {
      expect(onEnter).toHaveBeenCalledTimes(1);
      expect(onEntering).toHaveBeenCalledTimes(1);
      expect(onEntered).toHaveBeenCalledTimes(1);
      expect(onExit).toHaveBeenCalledTimes(1);
      expect(onExiting).toHaveBeenCalledTimes(1);
      expect(onExited).toHaveBeenCalledTimes(1);
    });
    expect(overlay).toHaveAttribute("hidden");
    expect(overlay).toMatchSnapshot();
  });

  it("should disable the transition if the noOpacity prop is true", async () => {
    const onEnter = jest.fn();
    const onEntering = jest.fn();
    const onEntered = jest.fn();
    const onExit = jest.fn();
    const onExiting = jest.fn();
    const onExited = jest.fn();
    const props = {
      "data-testid": "overlay",
      visible: false,
      noOpacity: true,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
    } as const;

    const { getByTestId, rerender } = render(<Overlay {...props} />);
    expect(() => getByTestId("overlay")).toThrow();

    rerender(<Overlay {...props} visible />);
    await waitFor(() => {
      expect(onEnter).not.toHaveBeenCalled();
      expect(onEntering).not.toHaveBeenCalled();
      expect(onEntered).toHaveBeenCalledTimes(1);
      expect(onExit).not.toHaveBeenCalled();
      expect(onExiting).not.toHaveBeenCalled();
      expect(onExited).not.toHaveBeenCalled();
    });

    const overlay = getByTestId("overlay");
    expect(overlay).toMatchSnapshot();
  });
});
