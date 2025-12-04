import { type ReactElement, useRef, useState } from "react";
import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { act, fireEvent, render, screen } from "../../test-utils/index.js";
import { TRANSITION_CONFIG } from "../../transition/config.js";
import { useScaleTransition } from "../../transition/useScaleTransition.js";
import { TOP_INNER_RIGHT_ANCHOR } from "../constants.js";
import {
  type FixedPositioningOptions,
  type FixedPositioningTransitionCallbacks,
  useFixedPositioning,
} from "../useFixedPositioning.js";

interface TestProps extends Omit<
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
        onClick={() => {
          setVisible((p) => !p);
        }}
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
    vi.useFakeTimers();
  });

  beforeEach(() => {
    TRANSITION_CONFIG.disabled = false;
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it("should default to fixing itself with the BELOW_CENTER_ANCHOR", () => {
    const { container } = render(<Test />);
    const getElement = (): HTMLElement => screen.getByTestId("element");
    const button = screen.getByRole("button");

    expect(getElement).toThrow();
    expect(container).toMatchSnapshot();

    fireEvent.click(button);
    expect(getElement).not.toThrow();
    expect(container).toMatchSnapshot();

    act(() => {
      vi.runAllTimers();
    });
    expect(container).toMatchSnapshot();

    fireEvent.click(button);
    expect(getElement).not.toThrow();
    expect(container).toMatchSnapshot();

    act(() => {
      vi.runAllTimers();
    });
    expect(getElement).toThrow();
    expect(container).toMatchSnapshot();
  });

  it("should detect if the fixed element is still visible in the viewport on scroll events", () => {
    const onScroll = vi.fn();
    render(<Test onScroll={onScroll} />);
    const toggle = screen.getByRole("button");

    fireEvent.click(toggle);
    act(() => {
      vi.runAllTimers();
    });
    expect(onScroll).not.toHaveBeenCalled();

    const scrollEvent = new UIEvent("scroll");
    act(() => {
      window.dispatchEvent(scrollEvent);
      vi.runAllTimers();
    });

    // this logic is really handled in the utils tests.
    expect(onScroll).toHaveBeenCalledWith(scrollEvent, {
      visible: expect.any(Boolean),
      fixedElement: expect.any(HTMLElement),
      fixedToElement: expect.any(HTMLElement),
    });
  });

  it("should automatically update the style when the page is resized", () => {
    const onResize = vi.fn();
    render(<Test onResize={onResize} />);
    const toggle = screen.getByRole("button");

    fireEvent.click(toggle);
    act(() => {
      vi.runAllTimers();
    });
    expect(onResize).not.toHaveBeenCalled();

    act(() => {
      window.dispatchEvent(new UIEvent("resize"));
      vi.runAllTimers();
    });
    expect(onResize).toHaveBeenCalled();
  });

  it("should correctly call the transition callbacks", () => {
    const onEnter = vi.fn();
    const onEntering = vi.fn();
    const onEntered = vi.fn();
    const onExited = vi.fn();
    const props: Required<FixedPositioningTransitionCallbacks> = {
      onEnter,
      onEntering,
      onEntered,
      onExited,
    };

    render(<Test {...props} />);
    const toggle = screen.getByRole("button");

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
      vi.runAllTimers();
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
      vi.runAllTimers();
    });
    expect(onEnter).toHaveBeenCalledTimes(1);
    expect(onEntering).toHaveBeenCalledTimes(1);
    expect(onEntered).toHaveBeenCalledTimes(1);
    expect(onExited).toHaveBeenCalledTimes(1);
  });

  it("should allow for configuring the fixed position", () => {
    const { container } = render(
      <Test transformOrigin anchor={TOP_INNER_RIGHT_ANCHOR} />
    );
    const toggle = screen.getByRole("button");

    fireEvent.click(toggle);
    act(() => {
      vi.runAllTimers();
    });
    expect(container).toMatchSnapshot();
  });
});
