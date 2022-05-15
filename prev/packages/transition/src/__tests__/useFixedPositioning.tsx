import type { ReactElement } from "react";
import { useRef, useState } from "react";
import { act, fireEvent, render } from "@testing-library/react";
import { TOP_INNER_RIGHT_ANCHOR } from "@react-md/utils";

import type { FixedPositioningOptions } from "../useFixedPositioning";
import { useFixedPositioning } from "../useFixedPositioning";
import { useScaleTransition } from "../useScaleTransition";
import type { FixedPositioningTransitionCallbacks } from "../types";

interface TestProps
  extends Omit<
    FixedPositioningOptions<HTMLButtonElement, HTMLDivElement>,
    "fixedTo"
  > {
  defaultVisible?: boolean;
}

function Test({ defaultVisible = false, ...options }: TestProps): ReactElement {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [visible, setVisible] = useState(defaultVisible);
  const { style, transitionOptions } = useFixedPositioning({
    ...options,
    fixedTo: buttonRef,
  });
  const { elementProps, rendered } = useScaleTransition({
    ...transitionOptions,
    transitionIn: visible,
  });

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setVisible((p) => !p)}
      >
        Toggle
      </button>
      {rendered && (
        <div {...elementProps} style={style} data-testid="element">
          Some content.
        </div>
      )}
    </>
  );
}

describe("useFixedPositioning", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it("should default to fixing itself with the BELOW_CENTER_ANCHOR", () => {
    const { container, getByRole, getByTestId } = render(<Test />);
    const getElement = (): HTMLElement => getByTestId("element");
    const button = getByRole("button");

    expect(getElement).toThrow();
    expect(container).toMatchSnapshot();

    fireEvent.click(button);
    expect(getElement).not.toThrow();
    expect(container).toMatchSnapshot();

    act(() => {
      jest.runAllTimers();
    });
    expect(container).toMatchSnapshot();

    fireEvent.click(button);
    expect(getElement).not.toThrow();
    expect(container).toMatchSnapshot();

    act(() => {
      jest.runAllTimers();
    });
    expect(getElement).toThrow();
    expect(container).toMatchSnapshot();
  });

  it("should detect if the fixed element is still visible in the viewport on scroll events", () => {
    const onScroll = jest.fn();
    const { getByRole } = render(<Test onScroll={onScroll} />);
    const toggle = getByRole("button");

    fireEvent.click(toggle);
    act(() => {
      jest.runAllTimers();
    });
    expect(onScroll).not.toBeCalled();

    const scrollEvent = new UIEvent("scroll");
    act(() => {
      window.dispatchEvent(scrollEvent);
      jest.runAllTimers();
    });

    // this logic is really handled in the utils tests.
    expect(onScroll).toBeCalledWith(scrollEvent, {
      visible: expect.any(Boolean),
      fixedElement: expect.any(HTMLElement),
      fixedToElement: expect.any(HTMLElement),
    });
  });

  it("should automatically update the style when the page is resized", () => {
    const onResize = jest.fn();
    const { getByRole } = render(<Test onResize={onResize} />);
    const toggle = getByRole("button");

    fireEvent.click(toggle);
    act(() => {
      jest.runAllTimers();
    });
    expect(onResize).not.toBeCalled();

    act(() => {
      window.dispatchEvent(new UIEvent("resize"));
      jest.runAllTimers();
    });
    expect(onResize).toBeCalled();
  });

  it("should update the style correctly based on the initialX and initialY so that it can be used for context menus", () => {
    const { container, getByRole, rerender } = render(<Test />);
    const toggle = getByRole("button");

    fireEvent.click(toggle);
    act(() => {
      jest.runAllTimers();
    });
    expect(container).toMatchSnapshot();

    rerender(<Test initialX={30} initialY={40} />);
    expect(container).toMatchSnapshot();
  });

  it("should correctly call the transition callbacks", () => {
    const onEnter = jest.fn();
    const onEntering = jest.fn();
    const onEntered = jest.fn();
    const onExited = jest.fn();
    const props: Required<FixedPositioningTransitionCallbacks> = {
      onEnter,
      onEntering,
      onEntered,
      onExited,
    };

    const { getByRole } = render(<Test {...props} />);
    const toggle = getByRole("button");

    expect(onEnter).not.toBeCalled();
    expect(onEntering).not.toBeCalled();
    expect(onEntered).not.toBeCalled();
    expect(onExited).not.toBeCalled();

    fireEvent.click(toggle);
    expect(onEnter).toBeCalledTimes(1);
    expect(onEntering).toBeCalledTimes(1);
    expect(onEntered).not.toBeCalled();
    expect(onExited).not.toBeCalled();

    act(() => {
      jest.runAllTimers();
    });
    expect(onEnter).toBeCalledTimes(1);
    expect(onEntering).toBeCalledTimes(1);
    expect(onEntered).toBeCalledTimes(1);
    expect(onExited).not.toBeCalled();

    fireEvent.click(toggle);
    expect(onEnter).toBeCalledTimes(1);
    expect(onEntering).toBeCalledTimes(1);
    expect(onEntered).toBeCalledTimes(1);
    expect(onExited).not.toBeCalled();

    act(() => {
      jest.runAllTimers();
    });
    expect(onEnter).toBeCalledTimes(1);
    expect(onEntering).toBeCalledTimes(1);
    expect(onEntered).toBeCalledTimes(1);
    expect(onExited).toBeCalledTimes(1);
  });

  it("should allow for configuring the fixed position", () => {
    const { container, getByRole } = render(
      <Test transformOrigin anchor={TOP_INNER_RIGHT_ANCHOR} />
    );
    const toggle = getByRole("button");

    fireEvent.click(toggle);
    act(() => {
      jest.runAllTimers();
    });
    expect(container).toMatchSnapshot();
  });
});
