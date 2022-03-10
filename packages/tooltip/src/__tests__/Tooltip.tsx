import type { ReactElement, ReactNode } from "react";
import { act, fireEvent, render as baseRender } from "@testing-library/react";
import type { ButtonProps } from "@react-md/button";
import { Button } from "@react-md/button";
import { UserInteractionModeListener } from "@react-md/utils";

import { Tooltip } from "../Tooltip";
import type {
  TooltipHookOptions,
  TooltippedElementEventHandlers,
} from "../useTooltip";
import { useTooltip } from "../useTooltip";

const baseRect: DOMRect = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  height: 0,
  width: 0,
  x: 0,
  y: 0,
  toJSON: () => "",
};

const render = (ui: ReactElement) =>
  baseRender(ui, { wrapper: UserInteractionModeListener });

interface TooltippedButtonProps
  extends ButtonProps,
    Omit<TooltipHookOptions<HTMLButtonElement>, "baseId"> {
  id?: string;
  disableTooltip?: boolean;
  tooltip?: ReactNode;
}

function TooltippedButton({
  id = "button-id",
  tooltip = "Tooltip",
  onClick,
  onBlur,
  onFocus,
  onKeyDown,
  onMouseEnter,
  onMouseLeave,
  onTouchStart,
  onContextMenu,
  children = "Button",
  disableTooltip = false,
  dense,
  position,
  defaultPosition,
  focusTime,
  touchTime,
  ...props
}: TooltippedButtonProps): ReactElement {
  const { elementProps, tooltipProps } = useTooltip({
    baseId: id,
    dense,
    onClick,
    onBlur,
    onFocus,
    onKeyDown,
    onMouseEnter,
    onMouseLeave,
    onTouchStart,
    onContextMenu,
    position,
    focusTime,
    touchTime,
    disabled: disableTooltip,
    defaultPosition,
  });

  return (
    <>
      <Button {...props} {...elementProps} disableRipple>
        {children}
      </Button>
      <Tooltip {...tooltipProps}>{tooltip}</Tooltip>
    </>
  );
}

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllTimers();
});

describe("Tooltip", () => {
  it("should work correctly in mouse mode", () => {
    const { getByRole } = render(<TooltippedButton />);
    const button = getByRole("button");

    expect(button).not.toHaveAttribute("aria-describedby");
    expect(() => getByRole("tooltip")).toThrow();

    fireEvent.mouseEnter(button);
    expect(() => getByRole("tooltip")).toThrow();
    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(() => getByRole("tooltip")).toThrow();

    act(() => {
      jest.advanceTimersByTime(700);
    });
    expect(() => getByRole("tooltip")).not.toThrow();
    expect(button).toHaveAttribute("aria-describedby", "button-id-tooltip");

    fireEvent.mouseLeave(button);
    expect(() => getByRole("tooltip")).not.toThrow();

    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(() => getByRole("tooltip")).toThrow();
    expect(button).not.toHaveAttribute("aria-describedby");
  });

  it("should work correctly in keyboard mode", () => {
    const { getByRole } = render(<TooltippedButton />);
    const button = getByRole("button");

    expect(button).not.toHaveAttribute("aria-describedby");
    expect(() => getByRole("tooltip")).toThrow();

    // Enter keyboard mode
    fireEvent.keyDown(document.body, { key: "Tab" });
    fireEvent.focus(button);
    expect(() => getByRole("tooltip")).toThrow();
    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(() => getByRole("tooltip")).toThrow();

    act(() => {
      jest.advanceTimersByTime(700);
    });
    expect(() => getByRole("tooltip")).not.toThrow();
    expect(button).toHaveAttribute("aria-describedby", "button-id-tooltip");

    fireEvent.mouseEnter(button);
    fireEvent.mouseLeave(button);
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(() => getByRole("tooltip")).not.toThrow();

    fireEvent.keyDown(button, { key: "Escape" });
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(() => getByRole("tooltip")).toThrow();

    act(() => {
      button.focus();
      jest.runOnlyPendingTimers();
    });
    expect(() => getByRole("tooltip")).not.toThrow();

    // this should eventually be written with a real browser test...
    act(() => {
      Object.defineProperty(document, "hidden", {
        value: true,
        writable: true,
      });
      const event = new Event("visibilitychange");
      window.dispatchEvent(event);
      jest.runAllTimers();
    });
    expect(document.activeElement).toBe(button);

    act(() => {
      Object.defineProperty(document, "hidden", {
        value: false,
        writable: false,
      });
      const event = new Event("visibilitychange");
      window.dispatchEvent(event);
    });

    // the browser will fire a focus event once it regains visibility and focus
    // on the last activeElement
    button.focus();
    fireEvent.focus(button);
    act(() => {
      jest.runAllTimers();
    });
    expect(document.activeElement).toBe(button);
    expect(() => getByRole("tooltip")).toThrow();

    fireEvent.blur(button);
    fireEvent.focus(button);

    act(() => {
      jest.runAllTimers();
    });
    expect(() => getByRole("tooltip")).not.toThrow();

    fireEvent.blur(button);
    act(() => {
      jest.runAllTimers();
    });
    expect(() => getByRole("tooltip")).toThrow();

    // cancels appearance if blurs before visible
    fireEvent.focus(button);
    act(() => {
      jest.advanceTimersByTime(10);
    });
    expect(() => getByRole("tooltip")).toThrow();
    fireEvent.blur(button);
    act(() => {
      jest.runAllTimers();
    });
    expect(() => getByRole("tooltip")).toThrow();
  });

  it("should work correctly in touch mode", () => {
    const { getByRole } = render(<TooltippedButton />);
    const button = getByRole("button");

    // force into "touch mode"
    fireEvent.touchStart(document);
    fireEvent.touchEnd(document);

    fireEvent.touchStart(button);
    expect(() => getByRole("tooltip")).toThrow();

    act(() => {
      jest.advanceTimersByTime(10);
    });
    fireEvent.mouseEnter(button);
    expect(() => getByRole("tooltip")).toThrow();

    act(() => {
      jest.advanceTimersByTime(400);
    });
    expect(() => getByRole("tooltip")).toThrow();

    fireEvent.contextMenu(button);
    expect(() => getByRole("tooltip")).not.toThrow();

    fireEvent.touchEnd(button);
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(() => getByRole("tooltip")).toThrow();

    // if context menu event never occurs...
    fireEvent.touchStart(button);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(() => getByRole("tooltip")).not.toThrow();
  });

  it("should not trigger the visibility if the disabled option is true", () => {
    const { getByRole } = render(<TooltippedButton disableTooltip />);
    const button = getByRole("button");
    expect(button).not.toHaveAttribute("aria-describedby");
    fireEvent.mouseEnter(button);
    expect(() => getByRole("tooltip")).toThrow();
    act(() => {
      jest.runAllTimers();
    });
    expect(() => getByRole("tooltip")).toThrow();

    fireEvent.keyDown(document.body, { key: "Tab" });
    fireEvent.focus(button);
    expect(() => getByRole("tooltip")).toThrow();
    act(() => {
      jest.runAllTimers();
    });
    expect(() => getByRole("tooltip")).toThrow();
  });

  it("should correctly merge event handlers", () => {
    const onBlur = jest.fn();
    const onFocus = jest.fn();
    const onKeyDown = jest.fn();
    const onClick = jest.fn();
    const onTouchStart = jest.fn();
    const onContextMenu = jest.fn();
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();
    const props: Required<TooltippedElementEventHandlers<HTMLButtonElement>> = {
      onBlur,
      onFocus,
      onClick,
      onKeyDown,
      onTouchStart,
      onContextMenu,
      onMouseEnter,
      onMouseLeave,
    };

    const { getByRole, rerender } = render(<TooltippedButton {...props} />);

    const button = getByRole("button");
    fireEvent.focus(button);
    expect(onFocus).toBeCalledTimes(1);

    fireEvent.keyDown(button, { key: "Tab" });
    expect(onKeyDown).toBeCalledTimes(1);

    fireEvent.blur(button);
    expect(onBlur).toBeCalledTimes(1);

    fireEvent.mouseEnter(button);
    expect(onMouseEnter).toBeCalledTimes(1);

    fireEvent.mouseLeave(button);
    expect(onMouseLeave).toBeCalledTimes(1);

    fireEvent.touchStart(button);
    expect(onTouchStart).toBeCalledTimes(1);

    fireEvent.click(button);
    expect(onClick).toBeCalledTimes(1);

    fireEvent.contextMenu(button);
    expect(onContextMenu).toBeCalledTimes(1);

    rerender(<TooltippedButton {...props} disableTooltip />);
    fireEvent.focus(button);
    expect(onFocus).toBeCalledTimes(2);

    fireEvent.keyDown(button, { key: "Tab" });
    expect(onKeyDown).toBeCalledTimes(2);

    fireEvent.blur(button);
    expect(onBlur).toBeCalledTimes(2);

    fireEvent.mouseEnter(button);
    expect(onMouseEnter).toBeCalledTimes(2);

    fireEvent.mouseLeave(button);
    expect(onMouseLeave).toBeCalledTimes(2);

    fireEvent.touchStart(button);
    expect(onTouchStart).toBeCalledTimes(2);

    fireEvent.click(button);
    expect(onClick).toBeCalledTimes(2);

    fireEvent.contextMenu(button);
    expect(onContextMenu).toBeCalledTimes(2);
  });

  it("should attempt to render within the viewport correctly for vertical positions", () => {
    const { getByRole, rerender } = render(<TooltippedButton />);
    const button = getByRole("button");
    const getRect = jest.spyOn(button, "getBoundingClientRect");
    getRect.mockReturnValue(baseRect);

    Object.defineProperty(window, "innerHeight", {
      value: 1000,
      writable: true,
    });

    fireEvent.mouseEnter(button);
    act(() => {
      jest.runAllTimers();
    });

    expect(getByRole("tooltip")).toHaveClass("rmd-tooltip--below");

    fireEvent.mouseLeave(button);
    act(() => {
      jest.runAllTimers();
    });
    expect(() => getByRole("tooltip")).toThrow();

    getRect.mockReturnValue({
      ...baseRect,
      top: 980,
    });
    fireEvent.mouseEnter(button);
    act(() => {
      jest.runAllTimers();
    });

    expect(getByRole("tooltip")).toHaveClass("rmd-tooltip--above");
    fireEvent.mouseLeave(button);
    act(() => {
      jest.runAllTimers();
    });
    expect(() => getByRole("tooltip")).toThrow();

    // re-test for above
    rerender(<TooltippedButton defaultPosition="above" />);
    getRect.mockReturnValue(baseRect);

    fireEvent.mouseEnter(button);
    act(() => {
      jest.runAllTimers();
    });

    expect(getByRole("tooltip")).toHaveClass("rmd-tooltip--below");

    fireEvent.mouseLeave(button);
    act(() => {
      jest.runAllTimers();
    });
    expect(() => getByRole("tooltip")).toThrow();

    getRect.mockReturnValue({
      ...baseRect,
      top: 980,
    });
    fireEvent.mouseEnter(button);
    act(() => {
      jest.runAllTimers();
    });

    expect(getByRole("tooltip")).toHaveClass("rmd-tooltip--above");
  });

  it("should attempt to render within the viewport correctly for horizontal positions", () => {
    const { getByRole, rerender } = render(
      <TooltippedButton defaultPosition="left" />
    );
    const button = getByRole("button");
    const getRect = jest.spyOn(button, "getBoundingClientRect");
    getRect.mockReturnValue(baseRect);

    Object.defineProperty(window, "innerHeight", {
      value: 1000,
      writable: true,
    });

    fireEvent.mouseEnter(button);
    act(() => {
      jest.runAllTimers();
    });

    expect(getByRole("tooltip")).toHaveClass("rmd-tooltip--right");

    fireEvent.mouseLeave(button);
    act(() => {
      jest.runAllTimers();
    });
    expect(() => getByRole("tooltip")).toThrow();

    getRect.mockReturnValue({
      ...baseRect,
      left: 980,
    });
    fireEvent.mouseEnter(button);
    act(() => {
      jest.runAllTimers();
    });

    expect(getByRole("tooltip")).toHaveClass("rmd-tooltip--left");
    fireEvent.mouseLeave(button);
    act(() => {
      jest.runAllTimers();
    });
    expect(() => getByRole("tooltip")).toThrow();

    // re-test for above
    rerender(<TooltippedButton defaultPosition="right" />);
    getRect.mockReturnValue(baseRect);

    fireEvent.mouseEnter(button);
    act(() => {
      jest.runAllTimers();
    });

    expect(getByRole("tooltip")).toHaveClass("rmd-tooltip--right");

    fireEvent.mouseLeave(button);
    act(() => {
      jest.runAllTimers();
    });
    expect(() => getByRole("tooltip")).toThrow();

    getRect.mockReturnValue({
      ...baseRect,
      left: 980,
    });
    fireEvent.mouseEnter(button);
    act(() => {
      jest.runAllTimers();
    });

    expect(getByRole("tooltip")).toHaveClass("rmd-tooltip--left");
  });

  it("should always use the provided position prop if it exists", () => {
    const { getByRole } = render(<TooltippedButton position="above" />);

    const button = getByRole("button");
    const getRect = jest.spyOn(button, "getBoundingClientRect");
    getRect.mockReturnValue(baseRect);

    Object.defineProperty(window, "innerHeight", {
      value: 1000,
      writable: true,
    });

    fireEvent.mouseEnter(button);
    act(() => {
      jest.runAllTimers();
    });

    expect(getByRole("tooltip")).toHaveClass("rmd-tooltip--above");

    fireEvent.mouseLeave(button);
    act(() => {
      jest.runAllTimers();
    });
    expect(() => getByRole("tooltip")).toThrow();
  });

  it("should throw an error if a javascript user provides an invalid position", () => {
    const error = jest.spyOn(console, "error").mockImplementation(() => {
      // do nothing
    });

    // @ts-expect-error
    expect(() => render(<TooltippedButton position="abvoe" />)).toThrow(
      "Invalid position: abvoe"
    );

    error.mockRestore();
  });

  it("should cancel the tooltip timer if the element is clicked", () => {
    const onClick = jest.fn().mockImplementationOnce((event: MouseEvent) => {
      event.stopPropagation();
    });
    const { getByRole } = render(<TooltippedButton onClick={onClick} />);

    const button = getByRole("button");
    fireEvent.mouseEnter(button);
    fireEvent.click(button);

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    // event.stopPropagation was called
    expect(() => getByRole("tooltip")).not.toThrow();

    fireEvent.mouseLeave(button);
    act(() => {
      jest.runAllTimers();
    });
    expect(() => getByRole("tooltip")).toThrow();

    fireEvent.mouseEnter(button);
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(() => getByRole("tooltip")).toThrow();

    fireEvent.click(button);
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(() => getByRole("tooltip")).toThrow();
    act(() => {
      jest.runAllTimers();
    });
    expect(() => getByRole("tooltip")).toThrow();
  });
});
