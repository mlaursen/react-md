import { fireEvent, render as baseRender } from "@testing-library/react";
import { cnb } from "cnbuilder";
import type { ReactElement, Ref } from "react";
import { createRef, useState } from "react";

import { Button } from "../../button";
import { ElementInteractionProvider } from "../../interaction";
import { WritingDirection } from "../../typography";
import { getPercentage } from "../../utils";
import type { UncontrolledDraggableOptions } from "../useDraggable";
import { useDraggable } from "../useDraggable";

const render = (ui: ReactElement): ReturnType<typeof baseRender> =>
  baseRender(ui, {
    wrapper: ({ children }) => (
      <ElementInteractionProvider mode="none">
        {children}
      </ElementInteractionProvider>
    ),
  });

type TestProps = Partial<UncontrolledDraggableOptions<HTMLButtonElement>> & {
  nodeRef?: Ref<HTMLButtonElement>;
};

function Test(props: TestProps): ReactElement {
  const { nodeRef, ...options } = props;
  const {
    value,
    dragging,
    draggableRef,
    dragPercentage,
    mouseEventHandlers,
    touchEventHandlers,
    keyboardEventHandlers,
  } = useDraggable({
    min: 0,
    max: 100,
    ref: nodeRef,
    ...options,
  });

  const percentage =
    dragging && props.withinOffsetParent
      ? dragPercentage
      : getPercentage({ min: 0, max: 100, value });

  return (
    <>
      <Button
        aria-valuenow={Math.ceil(percentage * 100)}
        ref={draggableRef}
        {...mouseEventHandlers}
        {...touchEventHandlers}
        {...keyboardEventHandlers}
        className={cnb(dragging && "dragging")}
      >
        Button
      </Button>
    </>
  );
}

// this should be the same size as the window
jest.spyOn(document.body, "getBoundingClientRect").mockReturnValue({
  height: 768,
  width: 1024,
  left: 0,
  top: 0,
  bottom: 768,
  right: 1024,
  x: 0,
  y: 0,
  toJSON() {},
});

describe("useDraggable", () => {
  it("should work correctly with mouse events", () => {
    expect(window.innerHeight).toBe(768);
    expect(window.innerWidth).toBe(1024);

    const onMouseDown = jest.fn();
    const onMouseMove = jest.fn();
    const onMouseUp = jest.fn();

    const { getByRole } = render(
      <Test
        onMouseUp={onMouseUp}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
      />
    );

    const button = getByRole("button");
    expect(onMouseDown).not.toHaveBeenCalled();
    expect(onMouseMove).not.toHaveBeenCalled();
    expect(onMouseUp).not.toHaveBeenCalled();
    expect(button).toMatchSnapshot();
    expect(button).toHaveAttribute("aria-valuenow", "50");
    expect(button).not.toHaveClass("dragging");
    expect(document.documentElement).not.toHaveClass("rmd-dragging");
    expect(document.documentElement).not.toHaveClass("rmd-dragging--h");

    fireEvent.mouseDown(button, { button: 0 });
    expect(onMouseDown).toHaveBeenCalled();
    expect(onMouseMove).not.toHaveBeenCalled();
    expect(onMouseUp).not.toHaveBeenCalled();
    expect(button).toHaveAttribute("aria-valuenow", "50");
    expect(button).not.toHaveClass("dragging");
    expect(document.documentElement).not.toHaveClass("rmd-dragging");
    expect(document.documentElement).not.toHaveClass("rmd-dragging--h");

    fireEvent.mouseMove(button);
    expect(onMouseMove).toHaveBeenCalled();
    expect(onMouseUp).not.toHaveBeenCalled();

    // the mouse move event doesn't bubble for some reason without this next line
    fireEvent.mouseMove(window, { clientX: 60 });
    expect(button).toHaveAttribute("aria-valuenow", "60");
    expect(button).toHaveClass("dragging");
    expect(document.documentElement).toHaveClass("rmd-dragging");
    expect(document.documentElement).toHaveClass("rmd-dragging--h");

    fireEvent.mouseMove(window, { clientX: 90 });
    expect(button).toHaveAttribute("aria-valuenow", "90");
    expect(button).toHaveClass("dragging");
    expect(document.documentElement).toHaveClass("rmd-dragging");
    expect(document.documentElement).toHaveClass("rmd-dragging--h");

    fireEvent.mouseMove(window, { clientX: 99 });
    expect(button).toHaveAttribute("aria-valuenow", "99");
    expect(button).toHaveClass("dragging");
    expect(document.documentElement).toHaveClass("rmd-dragging");
    expect(document.documentElement).toHaveClass("rmd-dragging--h");

    fireEvent.mouseMove(window, { clientX: 100 });
    expect(button).toHaveAttribute("aria-valuenow", "100");
    expect(button).toHaveClass("dragging");
    expect(document.documentElement).toHaveClass("rmd-dragging");
    expect(document.documentElement).toHaveClass("rmd-dragging--h");

    fireEvent.mouseMove(window, { clientX: 113 });
    expect(button).toHaveAttribute("aria-valuenow", "100");
    expect(button).toHaveClass("dragging");
    expect(document.documentElement).toHaveClass("rmd-dragging");
    expect(document.documentElement).toHaveClass("rmd-dragging--h");

    fireEvent.mouseUp(window, { clientX: 113 });
    expect(button).toHaveAttribute("aria-valuenow", "100");
    expect(button).not.toHaveClass("dragging");
    expect(document.documentElement).not.toHaveClass("rmd-dragging");
    expect(document.documentElement).not.toHaveClass("rmd-dragging--h");

    fireEvent.mouseDown(button);
    fireEvent.mouseMove(button);
    fireEvent.mouseMove(window, { clientX: 0 });
    expect(button).toHaveAttribute("aria-valuenow", "0");

    fireEvent.mouseUp(window, { clientX: -1 });
    expect(button).toHaveAttribute("aria-valuenow", "0");
    expect(onMouseUp).not.toHaveBeenCalled();

    fireEvent.mouseDown(button, { clientX: 10 });
    expect(button).toHaveAttribute("aria-valuenow", "0");

    fireEvent.mouseUp(button, { clientX: 10 });
    expect(button).toHaveAttribute("aria-valuenow", "0");
    expect(onMouseUp).toHaveBeenCalled();
  });

  it("should not start dragging if any of meta keys are pressed", () => {
    const { getByRole } = render(<Test />);

    const button = getByRole("button");
    expect(button).toHaveAttribute("aria-valuenow", "50");

    fireEvent.mouseDown(button, { button: 1, clientX: 50 });
    fireEvent.mouseMove(button, { clientX: 60 });
    fireEvent.mouseUp(window);
    expect(button).toHaveAttribute("aria-valuenow", "50");

    fireEvent.mouseDown(button, { button: 0, altKey: true, clientX: 50 });
    fireEvent.mouseMove(button, { clientX: 60 });
    fireEvent.mouseUp(window);
    expect(button).toHaveAttribute("aria-valuenow", "50");

    fireEvent.mouseDown(button, { button: 0, metaKey: true, clientX: 50 });
    fireEvent.mouseMove(button, { clientX: 60 });
    fireEvent.mouseUp(window);
    expect(button).toHaveAttribute("aria-valuenow", "50");

    fireEvent.mouseDown(button, { button: 0, ctrlKey: true, clientX: 50 });
    fireEvent.mouseMove(button, { clientX: 60 });
    fireEvent.mouseUp(window);
    expect(button).toHaveAttribute("aria-valuenow", "50");

    fireEvent.mouseDown(button, { button: 0, shiftKey: true, clientX: 50 });
    fireEvent.mouseMove(button, { clientX: 60 });
    fireEvent.mouseUp(window);
    expect(button).toHaveAttribute("aria-valuenow", "50");
  });

  it("should work correctly for keyboard events", () => {
    expect(window.innerHeight).toBe(768);
    expect(window.innerWidth).toBe(1024);

    const onKeyDown = jest.fn();

    const { getByRole } = render(<Test onKeyDown={onKeyDown} />);

    const button = getByRole("button");
    expect(onKeyDown).not.toHaveBeenCalled();
    expect(button).toMatchSnapshot();
    expect(button).toHaveAttribute("aria-valuenow", "50");
    expect(button).not.toHaveClass("dragging");
    expect(document.documentElement).not.toHaveClass("rmd-dragging");
    expect(document.documentElement).not.toHaveClass("rmd-dragging--h");

    fireEvent.keyDown(button, { key: "ArrowRight" });
    expect(onKeyDown).toHaveBeenCalled();
    expect(button).toHaveAttribute("aria-valuenow", "51");
    expect(button).not.toHaveClass("dragging");
    expect(document.documentElement).not.toHaveClass("rmd-dragging");
    expect(document.documentElement).not.toHaveClass("rmd-dragging--h");

    fireEvent.keyDown(button, { key: "ArrowRight" });
    expect(button).toHaveAttribute("aria-valuenow", "52");
    expect(button).not.toHaveClass("dragging");
    expect(document.documentElement).not.toHaveClass("rmd-dragging");
    expect(document.documentElement).not.toHaveClass("rmd-dragging--h");

    fireEvent.keyDown(button, { key: "ArrowLeft" });
    expect(button).toHaveAttribute("aria-valuenow", "51");
    expect(button).not.toHaveClass("dragging");
    expect(document.documentElement).not.toHaveClass("rmd-dragging");
    expect(document.documentElement).not.toHaveClass("rmd-dragging--h");

    fireEvent.keyDown(button, { key: "Home" });
    expect(button).toHaveAttribute("aria-valuenow", "0");
    expect(button).not.toHaveClass("dragging");
    expect(document.documentElement).not.toHaveClass("rmd-dragging");
    expect(document.documentElement).not.toHaveClass("rmd-dragging--h");

    fireEvent.keyDown(button, { key: "End" });
    expect(button).toHaveAttribute("aria-valuenow", "100");
    expect(button).not.toHaveClass("dragging");
    expect(document.documentElement).not.toHaveClass("rmd-dragging");
    expect(document.documentElement).not.toHaveClass("rmd-dragging--h");
  });

  it("should work correctly with touch event handlers", () => {
    expect(window.innerHeight).toBe(768);
    expect(window.innerWidth).toBe(1024);

    const onTouchStart = jest.fn();
    const onTouchMove = jest.fn();

    const { getByRole } = render(
      <Test onTouchStart={onTouchStart} onTouchMove={onTouchMove} />
    );

    const button = getByRole("button");
    expect(onTouchStart).not.toHaveBeenCalled();
    expect(onTouchMove).not.toHaveBeenCalled();
    expect(button).toMatchSnapshot();
    expect(button).toHaveAttribute("aria-valuenow", "50");
    expect(button).not.toHaveClass("dragging");
    expect(document.documentElement).not.toHaveClass("rmd-dragging");
    expect(document.documentElement).not.toHaveClass("rmd-dragging--h");

    // should do nothing since there are no changed touches
    fireEvent.touchStart(button);
    expect(onTouchStart).toHaveBeenCalled();
    expect(onTouchMove).not.toHaveBeenCalled();
    expect(button).toHaveAttribute("aria-valuenow", "50");
    fireEvent.touchEnd(button);
    expect(button).toHaveAttribute("aria-valuenow", "50");

    fireEvent.touchStart(button, { changedTouches: [{ clientX: 60 }] });
    expect(button).toHaveAttribute("aria-valuenow", "60");

    fireEvent.touchMove(button, { changedTouches: [{ clientX: 68 }] });
    expect(button).toHaveAttribute("aria-valuenow", "68");

    fireEvent.touchMove(button, {
      cancelable: false,
      changedTouches: [{ clientX: 80 }],
    });
    expect(button).toHaveAttribute("aria-valuenow", "68");
  });

  it("should allow a ref to be merged", () => {
    const ref = createRef<HTMLButtonElement>();
    const { getByRole } = render(<Test nodeRef={ref} />);
    const button = getByRole("button");
    expect(ref.current).toBe(button);
  });

  it("should never trigger the event handlers when disabled", () => {
    const { getByRole } = render(<Test disabled />);
    const button = getByRole("button");
    expect(button).toHaveAttribute("aria-valuenow", "50");
    fireEvent.mouseDown(button, { button: 0 });
    fireEvent.mouseMove(button);
    fireEvent.mouseMove(window, { clientX: 100 });
    fireEvent.mouseUp(window);
    expect(button).toHaveAttribute("aria-valuenow", "50");

    fireEvent.keyDown(button, { key: "ArrowRight" });
    expect(button).toHaveAttribute("aria-valuenow", "50");

    const touch = { changedTouches: [{ clientX: 100 }] };
    fireEvent.touchStart(button, touch);
    fireEvent.touchMove(button, touch);
    fireEvent.touchEnd(window);
    expect(button).toHaveAttribute("aria-valuenow", "50");
  });

  it("should allow for the value to be controlled", () => {
    function Test(): ReactElement {
      const [value, setValue] = useState(20);

      const {
        dragging,
        draggableRef,
        keyboardEventHandlers,
        minimum,
        maximum,
        increment,
        decrement,
      } = useDraggable({
        min: 0,
        max: 100,
        value,
        setValue,
      });

      const percentage = getPercentage({ min: 0, max: 100, value });

      return (
        <>
          <Button
            aria-valuenow={Math.ceil(percentage * 100)}
            ref={draggableRef}
            {...keyboardEventHandlers}
            className={cnb(dragging && "dragging")}
          >
            Button
          </Button>
          <Button onClick={minimum}>Minimum</Button>
          <Button onClick={maximum}>Maximum</Button>
          <Button onClick={increment}>Increment</Button>
          <Button onClick={decrement}>Decrement</Button>
        </>
      );
    }

    const { getByRole } = render(<Test />);

    const button = getByRole("button", { name: "Button" });
    const minimum = getByRole("button", { name: "Minimum" });
    const maximum = getByRole("button", { name: "Maximum" });
    const increment = getByRole("button", { name: "Increment" });
    const decrement = getByRole("button", { name: "Decrement" });
    expect(button).toMatchSnapshot();
    expect(button).toHaveAttribute("aria-valuenow", "20");

    fireEvent.click(increment);
    expect(button).toHaveAttribute("aria-valuenow", "21");

    fireEvent.click(decrement);
    expect(button).toHaveAttribute("aria-valuenow", "20");

    fireEvent.click(minimum);
    expect(button).toHaveAttribute("aria-valuenow", "0");
    fireEvent.click(maximum);
    expect(button).toHaveAttribute("aria-valuenow", "100");
  });

  it("should persist the value to local storage when a key is provided and the user is not dragging", () => {
    const { getByRole } = render(<Test localStorageKey="test" />);

    const button = getByRole("button");
    expect(localStorage.getItem("test")).toBe("50");

    fireEvent.mouseDown(button, { button: 0 });
    fireEvent.mouseMove(button);
    fireEvent.mouseMove(window, { clientX: 60 });
    expect(button).toHaveAttribute("aria-valuenow", "60");
    expect(localStorage.getItem("test")).toBe("50");

    fireEvent.mouseUp(window, { clientX: 60 });
    expect(button).toHaveAttribute("aria-valuenow", "60");
    expect(localStorage.getItem("test")).toBe("60");
  });

  it("should support dragging when RTL is enabled", () => {
    const { getByRole } = render(
      <WritingDirection defaultDir="rtl">
        <Test />
      </WritingDirection>
    );

    const button = getByRole("button");
    expect(button).toHaveAttribute("aria-valuenow", "50");
    fireEvent.mouseDown(button, { button: 0 });
    fireEvent.mouseMove(button);
    fireEvent.mouseMove(window, { clientX: window.innerWidth - 60 });
    expect(button).toHaveAttribute("aria-valuenow", "60");
  });

  it("should support vertical dragging", () => {
    const { getByRole } = render(<Test vertical />);

    const button = getByRole("button");
    expect(button).toHaveAttribute("aria-valuenow", "50");
    fireEvent.mouseDown(button, { button: 0 });
    fireEvent.mouseMove(button);
    fireEvent.mouseMove(window, { clientX: 60, clientY: 50 });
    expect(button).toHaveAttribute("aria-valuenow", "50");

    fireEvent.mouseMove(window, { clientY: 60 });
    expect(button).toHaveAttribute("aria-valuenow", "60");
  });

  it("should allow the dragging class names to be disabled", () => {
    const { rerender, getByRole } = render(<Test disableDraggingClassName />);

    const button = getByRole("button");
    fireEvent.mouseDown(button, { button: 0 });
    fireEvent.mouseMove(button);
    fireEvent.mouseMove(window, { clientX: 60 });

    expect(document.documentElement).not.toHaveClass("rmd-dragging");
    expect(document.documentElement).not.toHaveClass("rmd-dragging--h");

    rerender(<Test disableDraggingCursorClassName />);
    expect(document.documentElement).toHaveClass("rmd-dragging");
    expect(document.documentElement).not.toHaveClass("rmd-dragging--h");
  });

  it("should allow the default value to be a function", () => {
    const { getByRole } = render(<Test defaultValue={() => 0} />);
    const button = getByRole("button");
    expect(button).toHaveAttribute("aria-valuenow", "0");
  });

  it("should allow the default value to be a number", () => {
    const { getByRole } = render(<Test defaultValue={12} />);
    const button = getByRole("button");
    expect(button).toHaveAttribute("aria-valuenow", "12");
  });

  it("should allow for a custom increment step", () => {
    const { getByRole } = render(<Test step={10} />);

    const button = getByRole("button");
    expect(button).toHaveAttribute("aria-valuenow", "50");

    fireEvent.keyDown(button, { key: "ArrowRight" });
    expect(button).toHaveAttribute("aria-valuenow", "60");

    fireEvent.keyDown(button, { key: "ArrowLeft" });
    expect(button).toHaveAttribute("aria-valuenow", "50");
  });

  it("should automatically update the value if the min, max, or step options change", () => {
    const { getByRole, rerender } = render(<Test step={10} />);

    const button = getByRole("button");
    expect(button).toHaveAttribute("aria-valuenow", "50");

    rerender(<Test step={10} min={10} max={30} />);
    expect(button).toHaveAttribute("aria-valuenow", "30");

    rerender(<Test step={1} min={50} max={100} />);
    expect(button).toHaveAttribute("aria-valuenow", "50");
  });

  it.todo(
    "should allow for dragging relative to the offsetParent instead of the entire viewport"
  );
});
