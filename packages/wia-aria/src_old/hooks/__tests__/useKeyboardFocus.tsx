import React, { FunctionComponent } from "react";
import { renderHook } from "react-hooks-testing-library";
import { render, fireEvent, cleanup } from "react-testing-library";

import { useKeyboardFocusEventHandler } from "../useKeyboardFocus";

describe("useKeyboardFocusEventHandler", () => {
  const onKeyboardFocus = jest.fn();
  const Test: FunctionComponent<any> = ({
    onKeyDown,
    onKeyboardFocus,
    ...config
  }) => {
    const {
      handlers: { onKeyboardFocus: _, ...handlers },
    } = useKeyboardFocusEventHandler({
      ...config,
      onKeyboardFocus,
      handlers: {
        onKeyDown,
      },
    });

    return (
      <ul id="menu-1" role="menu" {...handlers}>
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
  Test.defaultProps = {
    onKeyboardFocus,
  };

  afterEach(() => {
    cleanup();
    onKeyboardFocus.mockClear();
  });

  it("should return the correct object", () => {
    let value;
    renderHook(
      () =>
        (value = useKeyboardFocusEventHandler({
          onKeyboardFocus,
          handlers: {},
        }))
    );

    expect(value).toEqual({
      handlers: expect.objectContaining({
        onKeyDown: expect.any(Function),
      }),
    });
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
