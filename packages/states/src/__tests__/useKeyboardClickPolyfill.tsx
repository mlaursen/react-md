import React, { ReactElement, Ref } from "react";
import { fireEvent, render } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";

import { useKeyboardClickPolyfill } from "../useKeyboardClickPolyfill";

interface Props {
  disabled?: boolean;
  onKeyDown?: React.KeyboardEventHandler;
  disableSpacebarClick?: boolean;
  liRef?: Ref<HTMLLIElement>;
}

function Test({
  disabled,
  onKeyDown,
  disableSpacebarClick,
  liRef,
}: Props): ReactElement {
  const handleKeyDown = useKeyboardClickPolyfill({
    onKeyDown,
    disabled,
    disableSpacebarClick,
  });

  return (
    <li ref={liRef} role="treeitem" tabIndex={-1} onKeyDown={handleKeyDown}>
      Item
    </li>
  );
}

describe("useKeyboardClickPolyfill", () => {
  it("should return a click handler", () => {
    const { result } = renderHook(() => useKeyboardClickPolyfill());
    expect(result.current).toBeInstanceOf(Function);
  });

  it("should return the provided onKeyDown handler if disabled", () => {
    let { result } = renderHook(() =>
      useKeyboardClickPolyfill({ disabled: true })
    );
    expect(result.current).toBeUndefined();

    const onKeyDown = jest.fn();
    ({ result } = renderHook(() =>
      useKeyboardClickPolyfill({ onKeyDown, disabled: true })
    ));
    expect(result.current).toBe(onKeyDown);
  });

  it("should trigger the provided onKeyDown handler when both enabled and disabled", () => {
    // the user should decide if the element is truely disabled or not

    const onKeyDown = jest.fn();
    const { getByText, rerender } = render(<Test onKeyDown={onKeyDown} />);

    fireEvent.keyDown(getByText("Item"), { key: "A" });
    expect(onKeyDown).toBeCalledTimes(1);

    rerender(<Test onKeyDown={onKeyDown} disabled />);
    fireEvent.keyDown(getByText("Item"), { key: "A" });
    expect(onKeyDown).toBeCalledTimes(2);
  });

  it("should click the element if the enter key is pressed", () => {
    const ref = React.createRef<HTMLLIElement>();
    const { getByText } = render(<Test liRef={ref} />);
    expect(ref.current).not.toBeNull();
    const clickSpy = jest.spyOn(ref.current as HTMLLIElement, "click");

    fireEvent.keyDown(getByText("Item"), { key: "Enter" });
    expect(clickSpy).toBeCalled();
  });

  it("should click the element if the space key is pressed as well as call preventDefault", () => {
    const ref = React.createRef<HTMLLIElement>();
    const { getByText } = render(<Test liRef={ref} />);
    expect(ref.current).not.toBeNull();
    const clickSpy = jest.spyOn(ref.current as HTMLLIElement, "click");

    fireEvent.keyDown(getByText("Item"), { key: " " });
    expect(clickSpy).toBeCalled();

    // don't know how to test preventDefault since mocks aren't being used for it
  });

  it("should not click with the space key if the disable spacebar click value is enabled", () => {
    const ref = React.createRef<HTMLLIElement>();
    const { getByText } = render(<Test liRef={ref} disableSpacebarClick />);
    expect(ref.current).not.toBeNull();
    const clickSpy = jest.spyOn(ref.current as HTMLLIElement, "click");

    fireEvent.keyDown(getByText("Item"), { key: " " });
    expect(clickSpy).not.toBeCalled();
  });

  it("should not click with the space key if the element is a link", () => {
    interface TestTwoProps {
      aRef?: Ref<HTMLAnchorElement>;
      disableSpacebarClick?: boolean;
    }
    function TestTwo({
      aRef,
      disableSpacebarClick,
    }: TestTwoProps): ReactElement {
      const handleKeyDown = useKeyboardClickPolyfill({
        disabled: false,
        disableSpacebarClick,
      });

      return (
        <a ref={aRef} href="#" onKeyDown={handleKeyDown}>
          Link
        </a>
      );
    }
    const ref = React.createRef<HTMLAnchorElement>();
    const { getByText, rerender } = render(<TestTwo aRef={ref} />);
    expect(ref.current).not.toBeNull();
    const clickSpy = jest.spyOn(ref.current as HTMLAnchorElement, "click");

    fireEvent.keyDown(getByText("Link"), { key: " " });
    expect(clickSpy).not.toBeCalled();

    rerender(<TestTwo aRef={ref} disableSpacebarClick />);
    fireEvent.keyDown(getByText("Link"), { key: " " });
    expect(clickSpy).not.toBeCalled();
  });
});
