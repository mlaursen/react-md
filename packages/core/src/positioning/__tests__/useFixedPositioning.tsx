import {
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import type { ReactElement } from "react";
import { useRef, useState } from "react";
import { act, fireEvent, render } from "../../test-utils/index.js";

import { useScaleTransition } from "../../transition/useScaleTransition.js";
import { TOP_INNER_RIGHT_ANCHOR } from "../constants.js";
import type {
  FixedPositioningOptions,
  FixedPositioningTransitionCallbacks,
} from "../useFixedPositioning.js";
import { useFixedPositioning } from "../useFixedPositioning.js";

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
    expect(onScroll).not.toHaveBeenCalled();

    const scrollEvent = new UIEvent("scroll");
    act(() => {
      window.dispatchEvent(scrollEvent);
      jest.runAllTimers();
    });

    // this logic is really handled in the utils tests.
    expect(onScroll).toHaveBeenCalledWith(scrollEvent, {
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
    expect(onResize).not.toHaveBeenCalled();

    act(() => {
      window.dispatchEvent(new UIEvent("resize"));
      jest.runAllTimers();
    });
    expect(onResize).toHaveBeenCalled();
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

    expect(onEnter).not.toHaveBeenCalled();
    expect(onEntering).not.toHaveBeenCalled();
    expect(onEntered).not.toHaveBeenCalled();
    expect(onExited).not.toHaveBeenCalled();

    fireEvent.click(toggle);
    expect(onEnter).toHaveBeenCalledTimes(1);
    expect(onEntering).toHaveBeenCalledTimes(1);
    expect(onEntered).not.toHaveBeenCalled();
    expect(onExited).not.toHaveBeenCalled();

    act(() => {
      jest.runAllTimers();
    });
    expect(onEnter).toHaveBeenCalledTimes(1);
    expect(onEntering).toHaveBeenCalledTimes(1);
    expect(onEntered).toHaveBeenCalledTimes(1);
    expect(onExited).not.toHaveBeenCalled();

    fireEvent.click(toggle);
    expect(onEnter).toHaveBeenCalledTimes(1);
    expect(onEntering).toHaveBeenCalledTimes(1);
    expect(onEntered).toHaveBeenCalledTimes(1);
    expect(onExited).not.toHaveBeenCalled();

    act(() => {
      jest.runAllTimers();
    });
    expect(onEnter).toHaveBeenCalledTimes(1);
    expect(onEntering).toHaveBeenCalledTimes(1);
    expect(onEntered).toHaveBeenCalledTimes(1);
    expect(onExited).toHaveBeenCalledTimes(1);
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