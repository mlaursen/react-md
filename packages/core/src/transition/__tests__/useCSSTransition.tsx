import { type ReactElement, useState } from "react";
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
import { TRANSITION_CONFIG } from "../config.js";
import {
  type CSSTransitionClassNames,
  type CSSTransitionHookOptions,
  type TransitionTimeout,
} from "../types.js";
import { useCSSTransition } from "../useCSSTransition.js";

interface TestProps extends Omit<
  CSSTransitionHookOptions<HTMLElement>,
  "transitionIn" | "timeout" | "classNames"
> {
  timeout?: TransitionTimeout;
  classNames?: CSSTransitionClassNames;
  defaultTransitionIn?: boolean;
}

const TEST_CLASS_NAMES: CSSTransitionClassNames = {
  appear: "appear",
  appearActive: "appear-active",
  appearDone: "appear-done",
  enter: "enter",
  enterActive: "enter-active",
  enterDone: "enter-done",
  exit: "exit",
  exitActive: "exit-active",
  exitDone: "exit-done",
};

function Test({
  classNames = TEST_CLASS_NAMES,
  timeout = 1000,
  defaultTransitionIn = false,
  ...options
}: TestProps): ReactElement {
  const [transitionIn, setTransitionIn] = useState(defaultTransitionIn);
  const { elementProps, stage, rendered, appearing } = useCSSTransition({
    ...options,
    classNames,
    timeout,
    transitionIn,
  });

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setTransitionIn((p) => !p);
        }}
      >
        Toggle
      </button>
      <ul role="log">
        {rendered && (
          <li {...elementProps} data-testid="node">
            {`The current stage is: "${stage}"`}
          </li>
        )}
        <li>{`Appearing: ${appearing}`}</li>
      </ul>
    </>
  );
}

describe("useCSSTransition", () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  beforeEach(() => {
    TRANSITION_CONFIG.disabled = false;
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it("should apply the correct classNames at the different stages", () => {
    render(<Test appear defaultTransitionIn />);
    const toggle = screen.getByRole("button", { name: "Toggle" });
    const node = screen.getByTestId("node");

    expect(node).toHaveTextContent('The current stage is: "entering"');
    expect(() => screen.getByText("Appearing: true")).not.toThrowError();
    expect(node).toHaveClass("appear appear-active", { exact: true });

    act(() => {
      vi.runAllTimers();
    });
    expect(node).toHaveTextContent('The current stage is: "entered"');
    expect(() => screen.getByText("Appearing: true")).not.toThrowError();
    expect(node).toHaveClass("appear-done", { exact: true });

    fireEvent.click(toggle);
    expect(node).toHaveTextContent('The current stage is: "exiting"');
    expect(() => screen.getByText("Appearing: false")).not.toThrowError();
    expect(node).toHaveClass("exit exit-active", { exact: true });

    act(() => {
      vi.runAllTimers();
    });
    expect(node).toHaveTextContent('The current stage is: "exited"');
    expect(() => screen.getByText("Appearing: false")).not.toThrowError();
    expect(node).toHaveClass("exit-done", { exact: true });

    fireEvent.click(toggle);
    expect(node).toHaveTextContent('The current stage is: "entering"');
    expect(() => screen.getByText("Appearing: false")).not.toThrowError();
    expect(node).toHaveClass("enter enter-active", { exact: true });

    act(() => {
      vi.runAllTimers();
    });
    expect(node).toHaveTextContent('The current stage is: "entered"');
    expect(() => screen.getByText("Appearing: false")).not.toThrowError();
    expect(node).toHaveClass("enter-done", { exact: true });
  });

  it("should correctly call the transition callbacks", () => {
    const onEnter = vi.fn();
    const onEntering = vi.fn();
    const onEntered = vi.fn();
    const onExit = vi.fn();
    const onExiting = vi.fn();
    const onExited = vi.fn();
    const props: TestProps = {
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
    };

    render(<Test {...props} />);
    const toggle = screen.getByRole("button");

    expect(onEnter).not.toHaveBeenCalled();
    expect(onEntering).not.toHaveBeenCalled();
    expect(onEntered).not.toHaveBeenCalled();
    expect(onExit).not.toHaveBeenCalled();
    expect(onExiting).not.toHaveBeenCalled();
    expect(onExited).not.toHaveBeenCalled();

    fireEvent.click(toggle);
    expect(onEnter).toHaveBeenCalledTimes(1);
    expect(onEntering).toHaveBeenCalledTimes(1);
    expect(onEntered).not.toHaveBeenCalled();
    expect(onExit).not.toHaveBeenCalled();
    expect(onExiting).not.toHaveBeenCalled();
    expect(onExited).not.toHaveBeenCalled();

    act(() => {
      vi.runAllTimers();
    });
    expect(onEnter).toHaveBeenCalledTimes(1);
    expect(onEntering).toHaveBeenCalledTimes(1);
    expect(onEntered).toHaveBeenCalledTimes(1);
    expect(onExit).not.toHaveBeenCalled();
    expect(onExiting).not.toHaveBeenCalled();
    expect(onExited).not.toHaveBeenCalled();

    fireEvent.click(toggle);
    expect(onEnter).toHaveBeenCalledTimes(1);
    expect(onEntering).toHaveBeenCalledTimes(1);
    expect(onEntered).toHaveBeenCalledTimes(1);
    expect(onExit).toHaveBeenCalledTimes(1);
    expect(onExiting).toHaveBeenCalledTimes(1);
    expect(onExited).not.toHaveBeenCalled();

    act(() => {
      vi.runAllTimers();
    });
    expect(onEnter).toHaveBeenCalledTimes(1);
    expect(onEntering).toHaveBeenCalledTimes(1);
    expect(onEntered).toHaveBeenCalledTimes(1);
    expect(onExit).toHaveBeenCalledTimes(1);
    expect(onExiting).toHaveBeenCalledTimes(1);
    expect(onExited).toHaveBeenCalledTimes(1);
  });
});
