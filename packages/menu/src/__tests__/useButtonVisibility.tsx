import React, { MutableRefObject, ReactElement } from "react";
import { fireEvent, render } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";

import { MenuButton, MenuButtonProps } from "../MenuButton";
import {
  ButtonVisibilityOptions,
  useButtonVisibility,
} from "../useButtonVisibility";
import { VisibilityState } from "../useVisibility";

interface TestProps
  extends Omit<MenuButtonProps, "id" | "visible">,
    ButtonVisibilityOptions {
  result: MutableRefObject<VisibilityState | undefined>;
}

function Test({
  onClick: propOnClick,
  onKeyDown: propOnKeyDown,
  onVisibilityChange,
  children = "Button",
  result,
  ...props
}: TestProps): ReactElement {
  const { onClick, onKeyDown, visible, defaultFocus } = useButtonVisibility({
    onClick: propOnClick,
    onKeyDown: propOnKeyDown,
    onVisibilityChange,
  });
  result.current = { visible, defaultFocus };

  return (
    <MenuButton
      id="test-button"
      {...props}
      onClick={onClick}
      onKeyDown={onKeyDown}
      visible={visible}
    >
      {children}
    </MenuButton>
  );
}

describe("useButtonVisibility", () => {
  it("should return the correct default state", () => {
    let { result } = renderHook(() => useButtonVisibility());
    let { visible, defaultFocus } = result.current;

    expect(visible).toBe(false);
    expect(defaultFocus).toBe("first");

    ({ result } = renderHook(() =>
      useButtonVisibility({ defaultVisible: true, defaultFocus: "last" })
    ));
    ({ visible, defaultFocus } = result.current);

    expect(visible).toBe(true);
    expect(defaultFocus).toBe("last");
  });

  it("should toggle the visibility for the onClick handler", () => {
    const result: MutableRefObject<VisibilityState | undefined> = {
      current: undefined,
    };
    render(<Test result={result} />);
    const button = document.getElementById("test-button") as HTMLButtonElement;
    fireEvent.click(button);
    expect(result.current).toEqual({ visible: true, defaultFocus: "first" });

    fireEvent.click(button);
    expect(result.current).toEqual({ visible: false, defaultFocus: "first" });
  });

  it("should call the provided onClick handler as expected", () => {
    const onClick1 = jest.fn();
    const onClick2 = jest.fn();

    const result: MutableRefObject<VisibilityState | undefined> = {
      current: undefined,
    };
    const { rerender } = render(<Test result={result} onClick={onClick1} />);
    const button = document.getElementById("test-button") as HTMLButtonElement;
    fireEvent.click(button);
    expect(onClick1).toBeCalledTimes(1);

    // simulating an arrow function onClick definition
    rerender(<Test result={result} onClick={onClick2} />);
    fireEvent.click(button);
    expect(onClick1).toBeCalledTimes(1);
    expect(onClick2).toBeCalledTimes(1);
  });

  it("should toggle the visibility for the onKeyDown handler with the ArrowUp and ArrowDown keys", () => {
    const result: MutableRefObject<VisibilityState | undefined> = {
      current: undefined,
    };
    render(<Test result={result} />);
    const button = document.getElementById("test-button") as HTMLButtonElement;
    fireEvent.keyDown(button, { key: "ArrowDown" });
    expect(result.current).toEqual({ visible: true, defaultFocus: "first" });

    fireEvent.click(button);
    expect(result.current).toEqual({ visible: false, defaultFocus: "first" });

    fireEvent.keyDown(button, { key: "ArrowUp" });
    expect(result.current).toEqual({ visible: true, defaultFocus: "last" });

    fireEvent.click(button);
    expect(result.current).toEqual({ visible: false, defaultFocus: "last" });
  });

  it("should call the provided onKeyDown handler as expected", () => {
    const onKeyDown1 = jest.fn();
    const onKeyDown2 = jest.fn();

    const result: MutableRefObject<VisibilityState | undefined> = {
      current: undefined,
    };
    const { rerender } = render(
      <Test result={result} onKeyDown={onKeyDown1} />
    );
    const button = document.getElementById("test-button") as HTMLButtonElement;
    fireEvent.keyDown(button);
    expect(onKeyDown1).toBeCalledTimes(1);

    // simulating an arrow function onKeyDown definition
    rerender(<Test result={result} onKeyDown={onKeyDown2} />);
    fireEvent.keyDown(button);
    expect(onKeyDown1).toBeCalledTimes(1);
    expect(onKeyDown2).toBeCalledTimes(1);
  });
});
