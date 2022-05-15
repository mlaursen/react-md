import type { ReactElement } from "react";
import { useState } from "react";
import { act, fireEvent, render } from "@testing-library/react";

import { useCSSTransition } from "../useCSSTransition";
import type {
  CSSTransitionClassNames,
  CSSTransitionHookOptions,
  TransitionTimeout,
} from "../types";

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
      <button type="button" onClick={() => setTransitionIn((p) => !p)}>
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

  afterEach(() => {
    jest.clearAllTimers();
  });

  it("should apply the correct classNames at the different stages", () => {
    const { getByRole, getByText, getByTestId } = render(
      <Test appear defaultTransitionIn />
    );
    const toggle = getByRole("button", { name: "Toggle" });
    const node = getByTestId("node");

    expect(node).toHaveTextContent('The current stage is: "entering"');
    expect(() => getByText("Appearing: true")).not.toThrow();
    expect(node.className).toBe("appear appear-active");

    act(() => {
      jest.runAllTimers();
    });
    expect(node).toHaveTextContent('The current stage is: "entered"');
    expect(() => getByText("Appearing: true")).not.toThrow();
    expect(node.className).toBe("appear-done");

    fireEvent.click(toggle);
    expect(node).toHaveTextContent('The current stage is: "exiting"');
    expect(() => getByText("Appearing: false")).not.toThrow();
    expect(node.className).toBe("exit exit-active");

    act(() => {
      jest.runAllTimers();
    });
    expect(node).toHaveTextContent('The current stage is: "exited"');
    expect(() => getByText("Appearing: false")).not.toThrow();
    expect(node.className).toBe("exit-done");

    fireEvent.click(toggle);
    expect(node).toHaveTextContent('The current stage is: "entering"');
    expect(() => getByText("Appearing: false")).not.toThrow();
    expect(node.className).toBe("enter enter-active");

    act(() => {
      jest.runAllTimers();
    });
    expect(node).toHaveTextContent('The current stage is: "entered"');
    expect(() => getByText("Appearing: false")).not.toThrow();
    expect(node.className).toBe("enter-done");
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

    const { getByRole } = render(<Test {...props} />);
    const toggle = getByRole("button");

    expect(onEnter).not.toBeCalled();
    expect(onEntering).not.toBeCalled();
    expect(onEntered).not.toBeCalled();
    expect(onExit).not.toBeCalled();
    expect(onExiting).not.toBeCalled();
    expect(onExited).not.toBeCalled();

    fireEvent.click(toggle);
    expect(onEnter).toBeCalledTimes(1);
    expect(onEntering).toBeCalledTimes(1);
    expect(onEntered).not.toBeCalled();
    expect(onExit).not.toBeCalled();
    expect(onExiting).not.toBeCalled();
    expect(onExited).not.toBeCalled();

    act(() => {
      jest.runAllTimers();
    });
    expect(onEnter).toBeCalledTimes(1);
    expect(onEntering).toBeCalledTimes(1);
    expect(onEntered).toBeCalledTimes(1);
    expect(onExit).not.toBeCalled();
    expect(onExiting).not.toBeCalled();
    expect(onExited).not.toBeCalled();

    fireEvent.click(toggle);
    expect(onEnter).toBeCalledTimes(1);
    expect(onEntering).toBeCalledTimes(1);
    expect(onEntered).toBeCalledTimes(1);
    expect(onExit).toBeCalledTimes(1);
    expect(onExiting).toBeCalledTimes(1);
    expect(onExited).not.toBeCalled();

    act(() => {
      jest.runAllTimers();
    });
    expect(onEnter).toBeCalledTimes(1);
    expect(onEntering).toBeCalledTimes(1);
    expect(onEntered).toBeCalledTimes(1);
    expect(onExit).toBeCalledTimes(1);
    expect(onExiting).toBeCalledTimes(1);
    expect(onExited).toBeCalledTimes(1);
  });
});
