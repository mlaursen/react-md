import React, { createRef, HTMLAttributes, ReactElement } from "react";
import { fireEvent, render } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";

import { MergableRippleHandlerNames } from "../ripples/types";
import { usePressedStates } from "../usePressedStates";

interface Props
  extends Pick<HTMLAttributes<HTMLButtonElement>, MergableRippleHandlerNames> {
  pressedRef?: { current: boolean | null };
  disableSpacebarClick?: boolean;
}
function Test({
  onClick,
  onKeyDown,
  onKeyUp,
  onMouseDown,
  onMouseUp,
  onMouseLeave,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  pressedRef,
  disableSpacebarClick,
}: Props): ReactElement {
  const { pressed, handlers } = usePressedStates({
    handlers: {
      onClick,
      onKeyDown,
      onKeyUp,
      onMouseDown,
      onMouseUp,
      onMouseLeave,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
    },
    disableSpacebarClick,
  });

  if (pressedRef) {
    pressedRef.current = pressed;
  }

  return (
    <button type="button" {...handlers}>
      Button
    </button>
  );
}

describe("usePressedStates", () => {
  it("should return an object containing the pressed state and all the event handlers", () => {
    const { result } = renderHook(() => usePressedStates());
    expect(result.current).toEqual({
      pressed: false,
      handlers: {
        onTouchStart: expect.any(Function),
        onTouchMove: expect.any(Function),
        onTouchEnd: expect.any(Function),
        onMouseDown: expect.any(Function),
        onMouseUp: expect.any(Function),
        onMouseLeave: expect.any(Function),
        onKeyDown: expect.any(Function),
        onKeyUp: expect.any(Function),
      },
    });
  });

  it("should include the `onClick` in the handlers result if it was passed as an option even though the functionality is not updated", () => {
    const onClick = jest.fn();
    const { result } = renderHook(() =>
      usePressedStates({ handlers: { onClick } })
    );
    expect(result.current).toEqual({
      pressed: false,
      handlers: {
        onClick,
        onTouchStart: expect.any(Function),
        onTouchMove: expect.any(Function),
        onTouchEnd: expect.any(Function),
        onMouseDown: expect.any(Function),
        onMouseUp: expect.any(Function),
        onMouseLeave: expect.any(Function),
        onKeyDown: expect.any(Function),
        onKeyUp: expect.any(Function),
      },
    });
  });

  it("should trigger the provided event handlers as normal", () => {
    const onClick = jest.fn();
    const onKeyDown = jest.fn();
    const onKeyUp = jest.fn();
    const onMouseDown = jest.fn();
    const onMouseUp = jest.fn();
    const onMouseLeave = jest.fn();
    const onTouchStart = jest.fn();
    const onTouchMove = jest.fn();
    const onTouchEnd = jest.fn();

    const { getByText } = render(
      <Test
        onClick={onClick}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      />
    );

    const button = getByText("Button");
    fireEvent.keyDown(button);
    fireEvent.keyUp(button);
    fireEvent.mouseDown(button);
    fireEvent.mouseUp(button);
    fireEvent.click(button);
    fireEvent.mouseLeave(button);
    fireEvent.touchStart(button);
    fireEvent.touchMove(button);
    fireEvent.touchEnd(button);

    expect(onKeyDown).toBeCalledTimes(1);
    expect(onKeyUp).toBeCalledTimes(1);
    expect(onMouseDown).toBeCalledTimes(1);
    expect(onMouseUp).toBeCalledTimes(1);
    expect(onClick).toBeCalledTimes(1);
    expect(onMouseLeave).toBeCalledTimes(1);
    expect(onTouchStart).toBeCalledTimes(1);
    expect(onTouchMove).toBeCalledTimes(1);
    expect(onTouchEnd).toBeCalledTimes(1);
  });

  it("should correctly update the pressed state for keyboard events", () => {
    const pressedRef = createRef<boolean>();
    const { getByText } = render(<Test pressedRef={pressedRef} />);
    expect(pressedRef.current).toBe(false);
    const button = getByText("Button");

    fireEvent.keyDown(button, { key: " " });
    expect(pressedRef.current).toBe(true);
    fireEvent.keyUp(button, { key: " " });
    expect(pressedRef.current).toBe(false);

    fireEvent.keyDown(button, { key: "A" });
    expect(pressedRef.current).toBe(false);
    fireEvent.keyUp(button, { key: "A" });
    expect(pressedRef.current).toBe(false);

    fireEvent.keyDown(button, { key: "Enter" });
    expect(pressedRef.current).toBe(true);
    fireEvent.keyUp(button, { key: "Enter" });
    expect(pressedRef.current).toBe(false);
  });

  it("should not trigger the pressed change for spacebar when the disableSpacebarClick prop is enabled", () => {
    const pressedRef = createRef<boolean>();
    const { getByText } = render(
      <Test pressedRef={pressedRef} disableSpacebarClick />
    );
    expect(pressedRef.current).toBe(false);
    const button = getByText("Button");

    fireEvent.keyDown(button, { key: " " });
    expect(pressedRef.current).toBe(false);
    fireEvent.keyUp(button, { key: " " });
    expect(pressedRef.current).toBe(false);
  });

  it("should correctly trigger the pressed state changes for mouse events", () => {
    const pressedRef = createRef<boolean>();
    const { getByText } = render(<Test pressedRef={pressedRef} />);
    expect(pressedRef.current).toBe(false);
    const button = getByText("Button");

    fireEvent.mouseDown(button, { button: 0 });
    expect(pressedRef.current).toBe(true);
    fireEvent.mouseUp(button, { button: 0 });
    expect(pressedRef.current).toBe(false);
  });

  it("should not trigger the pressed state change for any mouse button other than left", () => {
    const pressedRef = createRef<boolean>();
    const { getByText } = render(<Test pressedRef={pressedRef} />);
    expect(pressedRef.current).toBe(false);
    const button = getByText("Button");

    fireEvent.mouseDown(button, { button: 1 });
    expect(pressedRef.current).toBe(false);
    fireEvent.mouseUp(button, { button: 1 });
    expect(pressedRef.current).toBe(false);

    fireEvent.mouseDown(button, { button: 2 });
    expect(pressedRef.current).toBe(false);
    fireEvent.mouseUp(button, { button: 2 });
    expect(pressedRef.current).toBe(false);
  });

  it("should set the pressed state to false if the user mouses away while in a mousedown event", () => {
    const pressedRef = createRef<boolean>();
    const { getByText } = render(<Test pressedRef={pressedRef} />);
    expect(pressedRef.current).toBe(false);
    const button = getByText("Button");

    // this is so the pressed state doesn't "hang" in a pressed state. if the user mouses away,
    // the onMouseUp event won't be triggered on the element this was attached to, instead it'll
    // be on whichever element is the current hover
    fireEvent.mouseDown(button, { button: 0 });
    expect(pressedRef.current).toBe(true);
    fireEvent.mouseLeave(button);
    expect(pressedRef.current).toBe(false);
  });

  it("should correctly trigger the pressed state changes for touch events", () => {
    const pressedRef = createRef<boolean>();
    const { getByText } = render(<Test pressedRef={pressedRef} />);
    expect(pressedRef.current).toBe(false);
    const button = getByText("Button");

    fireEvent.touchStart(button);
    expect(pressedRef.current).toBe(true);
    fireEvent.touchEnd(button);
    expect(pressedRef.current).toBe(false);
  });

  it("should set the pressed state to false if the user touch moves away while in a touchstart event", () => {
    const pressedRef = createRef<boolean>();
    const { getByText } = render(<Test pressedRef={pressedRef} />);
    expect(pressedRef.current).toBe(false);
    const button = getByText("Button");

    // this is so the pressed state doesn't "hang" in a pressed state. if the user moves away,
    // the touchend event won't be triggered on the element this was attached to, instead it'll
    // be on whichever element is the current touch target. This also would be for a page scroll
    // event
    fireEvent.touchStart(button);
    expect(pressedRef.current).toBe(true);
    fireEvent.touchMove(button);
    expect(pressedRef.current).toBe(false);
  });
});
