import React, { ReactNode } from "react";
import { render, fireEvent, act } from "@testing-library/react";
import { SimplePosition, UserInteractionModeListener } from "@react-md/utils";

import { Tooltipped } from "../Tooltipped";

jest.useFakeTimers();

interface TestProps {
  position?: SimplePosition;
  defaultPosition?: SimplePosition;
}

function Test(props: TestProps) {
  return (
    <UserInteractionModeListener>
      <Tooltipped {...props} id="test-id" tooltip="Tooltip">
        <button type="button">Button</button>
      </Tooltipped>
    </UserInteractionModeListener>
  );
}

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

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllTimers();
});

describe("Tooltipped", () => {
  it("should correctly add a tooltip when needed to a cloneable child", () => {
    const { getByText, queryByRole } = render(<Test />);

    const button = getByText("Button");
    expect(button).not.toHaveAttribute("aria-describedby");
    expect(queryByRole("tooltip")).toBe(null);

    fireEvent.mouseEnter(button);
    act(() => {
      jest.runAllTimers();
    });
    expect(queryByRole("tooltip")).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-describedby", "test-id-tooltip");

    fireEvent.mouseLeave(button);
    expect(queryByRole("tooltip")).toBeInTheDocument();

    act(() => {
      jest.runAllTimers();
    });
    expect(queryByRole("tooltip")).not.toBeInTheDocument();
    expect(button).not.toHaveAttribute("aria-describedby");
  });

  it("should clone the id and 'aria-describedby' props into the child if there is no tooltip", () => {
    const { getByRole } = render(
      <Tooltipped id="test-id" aria-describedby="some-id">
        <button type="button">Button</button>
      </Tooltipped>
    );

    const button = getByRole("button");
    expect(button).toHaveAttribute("id", "test-id");
    expect(button).toHaveAttribute("aria-describedby", "some-id");
  });

  it("should allow for the children to be a callback function", () => {
    function Test({ tooltip }: { tooltip?: ReactNode }) {
      return (
        <Tooltipped id="test-id" tooltip={tooltip}>
          {({ tooltip, ...props }) => (
            <>
              <button type="button" {...props}>
                button
              </button>
              {tooltip}
            </>
          )}
        </Tooltipped>
      );
    }

    const { getByRole, rerender } = render(<Test />);

    const button = getByRole("button");
    expect(button).toHaveAttribute("id", "test-id");

    rerender(<Test tooltip="Tooltip" />);
    fireEvent.mouseEnter(button);
    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(() => getByRole("tooltip")).not.toThrow();

    fireEvent.mouseLeave(button);
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(() => getByRole("tooltip")).toThrow();
  });

  it("should correctly merge event handlers", () => {
    const onBlur = jest.fn();
    const onFocus = jest.fn();
    const onKeyDown = jest.fn();
    const onTouchStart = jest.fn();
    const onContextMenu = jest.fn();
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();

    const { getByRole } = render(
      <Tooltipped
        id="button"
        tooltip="Look at me!"
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onTouchStart={onTouchStart}
        onContextMenu={onContextMenu}
      >
        <button type="button">Button</button>
      </Tooltipped>
    );

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

    fireEvent.contextMenu(button);
    expect(onContextMenu).toBeCalledTimes(1);
  });

  it("should work correctly for a keyboard flow", () => {
    const { getByRole } = render(<Test />);

    const button = getByRole("button");

    fireEvent.keyDown(button);
    fireEvent.focus(button);
    expect(() => getByRole("tooltip")).toThrow();

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(() => getByRole("tooltip")).not.toThrow();

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

    // the browser will fire a focus event once it regains visibility and focu
    // son the last activeElement
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

  it("should work for touch flows", () => {
    const { getByRole } = render(<Test />);
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

  it("should attempt to render within the viewport correctly for vertical positions", () => {
    const { getByRole, rerender } = render(<Test />);
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
    rerender(<Test defaultPosition="above" />);
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
    const { getByRole, rerender } = render(<Test defaultPosition="left" />);
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
    rerender(<Test defaultPosition="right" />);
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
    const { getByRole } = render(<Test position="above" />);

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
});
