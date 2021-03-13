import React, { ReactElement } from "react";
import { fireEvent, render } from "@testing-library/react";

import { useTabFocusWrap } from "../useTabFocusWrap";

interface Props {
  disabled?: boolean;
  disableFocusCache?: boolean;
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  count: 1 | 2 | 3;
  tabIndex?: number;
}

function Test({
  onKeyDown,
  disableFocusCache,
  disabled,
  count,
  tabIndex,
}: Props): ReactElement {
  const handleKeyDown = useTabFocusWrap({
    onKeyDown,
    disabled,
    disableFocusCache,
  });

  return (
    <div onKeyDown={handleKeyDown} data-testid="div" tabIndex={tabIndex}>
      {count >= 1 && <input data-testid="input-1" type="text" />}
      {count >= 2 && <input data-testid="input-2" type="text" />}
      {count >= 3 && <input data-testid="input-3" type="text" />}
    </div>
  );
}

describe("useTabFocusWrap", () => {
  it("should not focus a different element if there is only one focusable child", () => {
    const { getByTestId } = render(<Test count={1} tabIndex={-1} />);

    const input = getByTestId("input-1");
    input.focus();
    expect(document.activeElement).toBe(input);

    fireEvent.keyDown(input, { key: "Tab" });
    expect(document.activeElement).toBe(input);

    const container = getByTestId("div");
    fireEvent.keyDown(container, { key: "Tab" });
    expect(document.activeElement).toBe(input);
  });

  it("should not override default browser behavior until the first or last element is focused", () => {
    const { getByTestId } = render(<Test count={3} />);

    const input1 = getByTestId("input-1");
    const input2 = getByTestId("input-2");
    const input3 = getByTestId("input-3");

    // set up intial focus...
    input1.focus();
    expect(document.activeElement).toBe(input1);

    // start tracking focus changes
    const focus1 = jest.spyOn(input1, "focus");
    const focus2 = jest.spyOn(input2, "focus");
    const focus3 = jest.spyOn(input3, "focus");

    fireEvent.keyDown(input1, { key: "Tab" });

    // can't test document.activeElement focus here since JSDom doesn't implement tab focusing
    expect(focus1).not.toBeCalled();
    expect(focus2).not.toBeCalled();
    expect(focus3).not.toBeCalled();

    fireEvent.keyDown(input2, { key: "Tab" });
    expect(focus1).not.toBeCalled();
    expect(focus2).not.toBeCalled();
    expect(focus3).not.toBeCalled();

    fireEvent.keyDown(input3, { key: "Tab", shiftKey: true });
    expect(focus1).not.toBeCalled();
    expect(focus2).not.toBeCalled();
    expect(focus3).not.toBeCalled();

    fireEvent.keyDown(input2, { key: "Tab", shiftKey: true });
    expect(focus1).not.toBeCalled();
    expect(focus2).not.toBeCalled();
    expect(focus3).not.toBeCalled();
  });

  it("should contain focus by wrapping around", () => {
    const { getByTestId } = render(<Test count={2} />);

    const input1 = getByTestId("input-1");
    const input2 = getByTestId("input-2");

    // set up intial focus...
    input1.focus();
    expect(document.activeElement).toBe(input1);

    // start tracking focus changes
    const focus1 = jest.spyOn(input1, "focus");
    const focus2 = jest.spyOn(input2, "focus");

    fireEvent.keyDown(input1, { key: "Tab", shiftKey: true });
    expect(document.activeElement).toBe(input2);
    expect(focus2).toBeCalledTimes(1);

    fireEvent.keyDown(input2, { key: "Tab" });
    expect(document.activeElement).toBe(input1);
    expect(focus1).toBeCalledTimes(1);
  });

  it("should call the optional onKeyDown function as well", () => {
    const onKeyDown = jest.fn();
    const { getByTestId } = render(<Test count={2} onKeyDown={onKeyDown} />);
    const input1 = getByTestId("input-1");
    const input2 = getByTestId("input-2");

    // set up intial focus...
    input1.focus();
    expect(document.activeElement).toBe(input1);

    // start tracking focus changes
    const focus1 = jest.spyOn(input1, "focus");
    const focus2 = jest.spyOn(input2, "focus");

    fireEvent.keyDown(input1, { key: "Tab", shiftKey: true });
    expect(document.activeElement).toBe(input2);
    expect(focus2).toBeCalledTimes(1);
    expect(onKeyDown).toBeCalledTimes(1);

    // it should still be called if it's not a tab key press
    fireEvent.keyDown(input2, { key: "Enter" });
    expect(onKeyDown).toBeCalledTimes(2);
    expect(focus1).not.toBeCalled();
    expect(focus2).toBeCalledTimes(1);

    fireEvent.keyDown(input2, { key: "Tab" });
    expect(document.activeElement).toBe(input1);
    expect(focus1).toBeCalledTimes(1);
    expect(onKeyDown).toBeCalledTimes(3);
  });
});
