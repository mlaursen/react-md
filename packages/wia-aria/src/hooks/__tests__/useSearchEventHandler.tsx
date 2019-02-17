import React, { FunctionComponent, HTMLAttributes, ReactNode } from "react";
import {
  act,
  cleanup,
  fireEvent,
  render,
  testHook,
} from "react-testing-library";

import useSearchEventHandler, {
  ISearchEffectOptions,
} from "../useSearchEventHandler";

jest.useFakeTimers();

const progress = () =>
  act(() => {
    jest.runAllTimers();
  });

describe("useSearchEventHandler", () => {
  const onKeyboardFocus = jest.fn();
  afterEach(() => {
    cleanup();
    progress();
    onKeyboardFocus.mockClear();
  });

  it("should return the correct object", () => {
    let value;
    testHook(
      () => (value = useSearchEventHandler({ onKeyboardFocus, handlers: {} }))
    );

    expect(value).toEqual({
      handlers: expect.objectContaining({
        onKeyDown: expect.any(Function),
      }),
    });
  });

  describe("event handler", () => {
    type TestType = FunctionComponent<
      {
        items?: ReactNode[];
        onKeyDown?: HTMLAttributes<HTMLElement>["onKeyDown"];
      } & Pick<
        ISearchEffectOptions,
        "searchResetTime" | "getValues" | "findMatchIndex"
      >
    >;

    const Test: TestType = ({
      items = ["Item 1", "Item 2", "Item 3", "Item 4"],
      onKeyDown: propOnKeyDown,
      ...others
    }) => {
      const { handlers } = useSearchEventHandler({
        ...others,
        onKeyboardFocus,
        handlers: { onKeyDown: propOnKeyDown },
      });

      return (
        <ul id="menu-1" role="menu" {...handlers}>
          {items.map((value, i) => (
            <li key={i} id={`item-${i + 1}`} role="menuitem" tabIndex={-1}>
              {value}
            </li>
          ))}
        </ul>
      );
    };

    it("should call the prop onKeyDown", () => {
      const onKeyDown = jest.fn();

      const { getByRole } = render(<Test onKeyDown={onKeyDown} />);
      fireEvent.keyDown(getByRole("menu"));
      jest.runAllTimers();
      expect(onKeyDown).toBeCalled();
    });

    it("should not call the onKeyboardFocus when the key has a length greater than 1", () => {
      const { getByRole } = render(<Test />);
      const menu = getByRole("menu");
      fireEvent.keyDown(menu, { key: "Unidentified" });
      progress();

      fireEvent.keyDown(menu, { key: "Tab" });
      progress();

      fireEvent.keyDown(menu, { key: "Home" });
      progress();

      fireEvent.keyDown(menu, { key: "Shift" });
      progress();

      fireEvent.keyDown(menu, { key: "Alt" });
      progress();

      fireEvent.keyDown(menu, { key: "Option" });
      progress();

      fireEvent.keyDown(menu, { key: "Enter" });
      progress();

      expect(onKeyboardFocus).not.toBeCalled();
    });

    it("should not call the onKeyboardFocus if the seach string can not be found in the items", () => {
      const { getByRole } = render(<Test />);
      const menu = getByRole("menu");
      fireEvent.keyDown(menu, { key: "A" });
      progress();

      fireEvent.keyDown(menu, { key: "a" });
      progress();

      fireEvent.keyDown(menu, { key: "t" });
      progress();

      expect(onKeyboardFocus).not.toBeCalled();
    });

    it("should call the onKeyboardFocus with the correct values when there is a match", () => {
      const { container } = render(<Test />);
      const items = container.querySelectorAll("[role='menuitem']");
      fireEvent.keyDown(items[0], { key: "I" });

      expect(onKeyboardFocus).toBeCalledWith(
        expect.objectContaining({
          element: items[1],
          elementIndex: 1,
          // using items causes a memeory leak for some reason
          focusableElements: expect.any(Array),
        }),
        expect.any(Object)
      );

      fireEvent.keyDown(items[1], { key: "t" });
      expect(onKeyboardFocus).toBeCalledWith(
        expect.objectContaining({
          element: items[2],
          elementIndex: 2,
          focusableElements: expect.any(Array),
        }),
        expect.any(Object)
      );
    });
  });
});
