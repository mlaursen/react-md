import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import { useState, type ReactElement } from "react";
import { act, fireEvent, render, screen } from "test-utils";

import { TRANSITION_CONFIG } from "../config.js";
import {
  type CSSTransitionClassNames,
  type CSSTransitionHookOptions,
  type TransitionTimeout,
} from "../types.js";
import { useCSSTransition } from "../useCSSTransition.js";

interface TestProps
  extends Omit<
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
    jest.useFakeTimers();
  });

  beforeEach(() => {
    TRANSITION_CONFIG.disabled = false;
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it("should apply the correct classNames at the different stages", () => {
    render(<Test appear defaultTransitionIn />);
    const toggle = screen.getByRole("button", { name: "Toggle" });
    const node = screen.getByTestId("node");

    expect(node).toHaveTextContent('The current stage is: "entering"');
    expect(() => screen.getByText("Appearing: true")).not.toThrow();
    expect(node).toHaveClass("appear appear-active", { exact: true });

    act(() => {
      jest.runAllTimers();
    });
    expect(node).toHaveTextContent('The current stage is: "entered"');
    expect(() => screen.getByText("Appearing: true")).not.toThrow();
    expect(node).toHaveClass("appear-done", { exact: true });

    fireEvent.click(toggle);
    expect(node).toHaveTextContent('The current stage is: "exiting"');
    expect(() => screen.getByText("Appearing: false")).not.toThrow();
    expect(node).toHaveClass("exit exit-active", { exact: true });

    act(() => {
      jest.runAllTimers();
    });
    expect(node).toHaveTextContent('The current stage is: "exited"');
    expect(() => screen.getByText("Appearing: false")).not.toThrow();
    expect(node).toHaveClass("exit-done", { exact: true });

    fireEvent.click(toggle);
    expect(node).toHaveTextContent('The current stage is: "entering"');
    expect(() => screen.getByText("Appearing: false")).not.toThrow();
    expect(node).toHaveClass("enter enter-active", { exact: true });

    act(() => {
      jest.runAllTimers();
    });
    expect(node).toHaveTextContent('The current stage is: "entered"');
    expect(() => screen.getByText("Appearing: false")).not.toThrow();
    expect(node).toHaveClass("enter-done", { exact: true });
  });

  it("should correctly call the transition callbacks", () => {
    const onEnter = jest.fn();
    const onEntering = jest.fn();
    const onEntered = jest.fn();
    const onExit = jest.fn();
    const onExiting = jest.fn();
    const onExited = jest.fn();
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
      jest.runAllTimers();
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
      jest.runAllTimers();
    });
    expect(onEnter).toHaveBeenCalledTimes(1);
    expect(onEntering).toHaveBeenCalledTimes(1);
    expect(onEntered).toHaveBeenCalledTimes(1);
    expect(onExit).toHaveBeenCalledTimes(1);
    expect(onExiting).toHaveBeenCalledTimes(1);
    expect(onExited).toHaveBeenCalledTimes(1);
  });
});
