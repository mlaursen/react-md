import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { createRef, type ReactElement } from "react";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "../../test-utils/index.js";

import { SsrProvider } from "../../SsrProvider.js";
import { Button } from "../../button/Button.js";
import { TRANSITION_CONFIG } from "../../transition/config.js";
import { useToggle } from "../../useToggle.js";
import { DISPLAY_NONE_CLASS } from "../../utils/isElementVisible.js";
import { Overlay, type OverlayProps } from "../Overlay.js";

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
  beforeEach(() => {
    TRANSITION_CONFIG.disabled = false;
  });

  it("should apply the correct styling, HTMLAttributes, and allow a ref", () => {
    const ref = createRef<HTMLSpanElement>();
    const props = {
      "data-testid": "overlay",
      ref,
      visible: true,
    } as const;

    const { rerender } = render(<Overlay {...props} />);

    const element = screen.getByTestId("overlay");
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    expect(ref.current).toBe(element);
    expect(element).toMatchSnapshot();

    rerender(
      <Overlay
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(element).toMatchSnapshot();
  });

  it("should support rendering inline if disablePortal prop is true", () => {
    const { container } = render(
      <Overlay data-testid="overlay" visible disablePortal />
    );

    const overlay = screen.getByTestId("overlay");
    expect(container.firstElementChild).toBe(overlay);
    expect(container).toMatchSnapshot();
  });

  it("should support rendering inline if it was visible by default and rendered through ssr", async () => {
    const { container } = render(<Test defaultVisible />, {
      wrapper: ({ children }) => <SsrProvider ssr>{children}</SsrProvider>,
    });

    const button = screen.getByRole("button", { name: "Toggle" });
    const overlay = screen.getByTestId("overlay");
    expect(button.nextElementSibling).toBe(overlay);
    expect(container).toMatchSnapshot();

    fireEvent.click(overlay);
    await waitFor(() => {
      expect(overlay).not.toBeInTheDocument();
    });

    fireEvent.click(button);
    await waitFor(() => {
      expect(() => screen.getByTestId("overlay")).not.toThrow();
    });
    await waitFor(() => {
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

    const { rerender } = render(<Overlay {...props} visible={false} />);

    const overlay = screen.getByTestId("overlay");
    expect(overlay).toHaveClass(DISPLAY_NONE_CLASS);
    expect(overlay).toMatchSnapshot();

    expect(onEnter).not.toHaveBeenCalled();
    expect(onEntering).not.toHaveBeenCalled();
    expect(onEntered).not.toHaveBeenCalled();
    expect(onExit).not.toHaveBeenCalled();
    expect(onExiting).not.toHaveBeenCalled();
    expect(onExited).not.toHaveBeenCalled();

    rerender(<Overlay {...props} visible />);
    await waitFor(() => {
      expect(onEntered).toHaveBeenCalledTimes(1);
    });
    expect(onEnter).toHaveBeenCalledTimes(1);
    expect(onEntering).toHaveBeenCalledTimes(1);
    expect(onExit).not.toHaveBeenCalled();
    expect(onExiting).not.toHaveBeenCalled();
    expect(onExited).not.toHaveBeenCalled();
    expect(overlay).not.toHaveClass(DISPLAY_NONE_CLASS);
    expect(overlay).toMatchSnapshot();

    rerender(<Overlay {...props} visible={false} />);
    await waitFor(() => {
      expect(onExited).toHaveBeenCalledTimes(1);
    });
    expect(onEnter).toHaveBeenCalledTimes(1);
    expect(onEntering).toHaveBeenCalledTimes(1);
    expect(onEntered).toHaveBeenCalledTimes(1);
    expect(onExit).toHaveBeenCalledTimes(1);
    expect(onExiting).toHaveBeenCalledTimes(1);
    expect(overlay).toHaveClass(DISPLAY_NONE_CLASS);
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

    const { rerender } = render(<Overlay {...props} />);
    expect(() => screen.getByTestId("overlay")).toThrow();

    rerender(<Overlay {...props} visible />);
    await waitFor(() => {
      expect(onEntered).toHaveBeenCalledTimes(1);
    });
    expect(onEnter).not.toHaveBeenCalled();
    expect(onEntering).not.toHaveBeenCalled();
    expect(onExit).not.toHaveBeenCalled();
    expect(onExiting).not.toHaveBeenCalled();
    expect(onExited).not.toHaveBeenCalled();

    const overlay = screen.getByTestId("overlay");
    expect(overlay).toMatchSnapshot();
  });

  it("should support passing the box align/justify to the box class name utils", () => {
    render(
      <Overlay visible align="start" justify="end" data-testid="overlay" />
    );
    const overlay = screen.getByTestId("overlay");

    expect(overlay).toMatchSnapshot();
  });
});
