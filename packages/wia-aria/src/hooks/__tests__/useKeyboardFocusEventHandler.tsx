import React, { FunctionComponent } from "react";
import { cleanup, testHook, render, fireEvent } from "react-testing-library";

import useKeyboardFocusEventHandler from "../useKeyboardFocusEventHandler";

describe("useKeyboardFocusEventHandler", () => {
  const onKeyboardFocus = jest.fn();
  const Test: FunctionComponent<any> = props => {
    const onKeyDown = useKeyboardFocusEventHandler({
      onKeyboardFocus,
      ...props,
    });
    return (
      <ul id="menu-1" role="menu" onKeyDown={onKeyDown}>
        {Array.from(
          new Array(10).map((_, i) => (
            <li key={i} id={`item-${i + 1}`} role="menuitem" tabIndex={-1}>
              {`Item ${i + 1}`}
            </li>
          ))
        )}
      </ul>
    );
  };

  afterEach(() => {
    cleanup();
    onKeyboardFocus.mockClear();
  });

  it("should return a function", () => {
    let onKeyDown;
    testHook(
      () => (onKeyDown = useKeyboardFocusEventHandler({ onKeyboardFocus }))
    );

    expect(onKeyDown).toBeInstanceOf(Function);
  });

  it("should call the onKeyDown option correctly", () => {
    const onKeyDown = jest.fn();

    const { getByRole } = render(<Test onKeyDown={onKeyDown} />);
    const menu = getByRole("menu");
    expect(onKeyDown).not.toBeCalled();

    fireEvent.keyDown(menu);
    expect(onKeyDown).toBeCalled();
  });

  it("should not trigger the onKeyboardFocus when there is not a valid keyboard key mapping", () => {
    const { getByRole } = render(
      <Test
        incrementKeys={[]}
        decrementKeys={[]}
        jumpToFirstKeys={[]}
        jumpToLastKeys={[]}
      />
    );
    const menu = getByRole("menu");
    fireEvent.keyDown(menu);
    fireEvent.keyDown(menu, { key: "Tab" });
    fireEvent.keyDown(menu, { key: "Tab", shiftKey: true });
    expect(onKeyboardFocus).not.toBeCalled();
  });
});
