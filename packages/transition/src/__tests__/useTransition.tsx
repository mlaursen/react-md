import React, { createRef, MutableRefObject, ReactElement, Ref } from "react";
import { act, render } from "@testing-library/react";

import { ENTERED, ENTERING, EXITED, EXITING } from "../constants";
import { TransitionOptions } from "../types";
import { TransitionReturnValue, useTransition } from "../useTransition";

type TestResult = MutableRefObject<TransitionReturnValue<HTMLDivElement>>;

interface TestProps extends TransitionOptions<HTMLDivElement> {
  nodeRef?: Ref<HTMLDivElement>;
  result: TestResult;
}

const createResultRef = (): TestResult => ({} as unknown as TestResult);

function Test({ result, nodeRef, ...options }: TestProps): ReactElement {
  const hookResult = useTransition({ ...options, ref: nodeRef });
  result.current = hookResult;

  return <div ref={hookResult.ref} />;
}

describe("useTransition", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it("should return the correct initial stage, rendered, and appearing state for non-temporary transitions", () => {
    const result = createResultRef();
    render(
      <Test
        result={result}
        transitionIn={false}
        timeout={200}
        appear={false}
        temporary={false}
      />
    );

    expect(result.current.appearing).toBe(false);
    expect(result.current.rendered).toBe(true);
    expect(result.current.stage).toBe(EXITED);

    render(
      <Test
        result={result}
        transitionIn
        timeout={200}
        appear={false}
        temporary={false}
      />
    );

    expect(result.current.appearing).toBe(false);
    expect(result.current.rendered).toBe(true);
    expect(result.current.stage).toBe(ENTERED);
  });

  it("should default the appear and temporary options to false", () => {
    const result = createResultRef();
    render(<Test result={result} transitionIn={false} timeout={200} />);

    expect(result.current.appearing).toBe(false);
    expect(result.current.rendered).toBe(true);
    expect(result.current.stage).toBe(EXITED);

    render(<Test result={result} transitionIn timeout={200} />);

    expect(result.current.appearing).toBe(false);
    expect(result.current.rendered).toBe(true);
    expect(result.current.stage).toBe(ENTERED);
  });

  it("should correctly transition from EXITED -> ENTERED and ENTERED -> EXITED for non-temporary transitions", () => {
    const result = createResultRef();
    const props = { result, timeout: 200 };
    const { rerender } = render(<Test {...props} transitionIn={false} />);

    expect(result.current.appearing).toBe(false);
    expect(result.current.rendered).toBe(true);
    expect(result.current.stage).toBe(EXITED);

    rerender(<Test {...props} transitionIn />);
    expect(result.current.appearing).toBe(false);
    expect(result.current.rendered).toBe(true);
    expect(result.current.stage).toBe(ENTERING);

    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(result.current.appearing).toBe(false);
    expect(result.current.rendered).toBe(true);
    expect(result.current.stage).toBe(ENTERED);

    rerender(<Test {...props} transitionIn={false} />);
    expect(result.current.appearing).toBe(false);
    expect(result.current.rendered).toBe(true);
    expect(result.current.stage).toBe(EXITING);

    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(result.current.appearing).toBe(false);
    expect(result.current.rendered).toBe(true);
    expect(result.current.stage).toBe(EXITED);
  });

  it("should correctly transition from EXITED -> ENTERED and ENTERED -> EXITED for temporary transitions", () => {
    const result = createResultRef();
    const props = { result, timeout: 200, temporary: true };
    const { rerender } = render(<Test {...props} transitionIn={false} />);

    expect(result.current.appearing).toBe(false);
    expect(result.current.rendered).toBe(false);
    expect(result.current.stage).toBe(EXITED);

    rerender(<Test {...props} transitionIn />);
    expect(result.current.appearing).toBe(false);
    expect(result.current.rendered).toBe(true);
    expect(result.current.stage).toBe(ENTERING);

    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(result.current.appearing).toBe(false);
    expect(result.current.rendered).toBe(true);
    expect(result.current.stage).toBe(ENTERED);

    rerender(<Test {...props} transitionIn={false} />);
    expect(result.current.appearing).toBe(false);
    expect(result.current.rendered).toBe(true);
    expect(result.current.stage).toBe(EXITING);

    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(result.current.appearing).toBe(false);
    expect(result.current.rendered).toBe(false);
    expect(result.current.stage).toBe(EXITED);
  });

  it("should correctly call the transition handlers during the transitions (no appear)", () => {
    const onEnter = jest.fn();
    const onEntering = jest.fn();
    const onEntered = jest.fn();
    const onExit = jest.fn();
    const onExiting = jest.fn();
    const onExited = jest.fn();
    const result = createResultRef();
    const nodeRef = createRef<HTMLDivElement>();
    const props = {
      nodeRef,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
      timeout: 200,
      result,
    };

    const { rerender } = render(<Test {...props} transitionIn={false} />);
    expect(onEnter).not.toBeCalled();
    expect(onEntering).not.toBeCalled();
    expect(onEntered).not.toBeCalled();
    expect(onExit).not.toBeCalled();
    expect(onExiting).not.toBeCalled();
    expect(onExited).not.toBeCalled();

    rerender(<Test {...props} transitionIn />);
    expect(onEnter).toBeCalledWith(nodeRef.current, false);
    expect(onEntering).toBeCalledWith(nodeRef.current, false);
    expect(onEntered).not.toBeCalled();
    expect(onExit).not.toBeCalled();
    expect(onExiting).not.toBeCalled();
    expect(onExited).not.toBeCalled();

    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(onEnter).toBeCalledWith(nodeRef.current, false);
    expect(onEntering).toBeCalledWith(nodeRef.current, false);
    expect(onEntered).toBeCalledWith(nodeRef.current, false);
    expect(onExit).not.toBeCalled();
    expect(onExiting).not.toBeCalled();
    expect(onExited).not.toBeCalled();

    rerender(<Test {...props} transitionIn={false} />);
    expect(onEnter).toBeCalledTimes(1);
    expect(onEntering).toBeCalledTimes(1);
    expect(onEntered).toBeCalledTimes(1);
    expect(onExit).toBeCalledWith(nodeRef.current);
    expect(onExiting).toBeCalledWith(nodeRef.current);
    expect(onExited).not.toBeCalled();

    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(onEnter).toBeCalledTimes(1);
    expect(onEntering).toBeCalledTimes(1);
    expect(onEntered).toBeCalledTimes(1);
    expect(onExit).toBeCalledWith(nodeRef.current);
    expect(onExiting).toBeCalledWith(nodeRef.current);
    expect(onExited).toBeCalledWith(nodeRef.current);
  });

  it("should only access the `node.scrollTop` if the repaint option is enabled only on the ENTER, ENTERING, EXIT, EXITING phases", () => {
    // this test is probably a terrible test and shouldn't have been written
    const div = document.createElement("div");
    let accessCount = 0;
    Object.defineProperty(div, "scrollTop", {
      get(): number {
        accessCount += 1;
        return 0;
      },
    });

    interface ScrollTopTestProps {
      transitionIn: boolean;
      repaint: boolean;
    }

    function ScrollTopTest(props: ScrollTopTestProps): null {
      const { ref } = useTransition({ timeout: 200, ...props });

      ref(div);

      return null;
    }

    const { rerender } = render(
      <ScrollTopTest repaint={false} transitionIn={false} />
    );
    rerender(<ScrollTopTest repaint={false} transitionIn />);
    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(accessCount).toBe(0);

    rerender(<ScrollTopTest repaint={false} transitionIn={false} />);
    act(() => {
      jest.runAllTimers();
    });
    expect(accessCount).toBe(0);

    rerender(<ScrollTopTest repaint transitionIn />);
    expect(accessCount).toBe(2);
    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(accessCount).toBe(2);

    rerender(<ScrollTopTest repaint transitionIn={false} />);
    expect(accessCount).toBe(4);
    act(() => {
      jest.runAllTimers();
    });
    expect(accessCount).toBe(4);
  });

  it("should automatically trigger the ENTER transition on mount if the appear and transitionIn options are true", () => {
    const result = createResultRef();
    const props = { appear: true, result, timeout: 200 };
    const { unmount } = render(<Test transitionIn={false} {...props} />);

    expect(result.current.appearing).toBe(false);
    expect(result.current.stage).toBe(EXITED);
    unmount();

    const { rerender } = render(<Test transitionIn {...props} />);
    expect(result.current.appearing).toBe(true);
    expect(result.current.stage).toBe(ENTERING);

    act(() => {
      jest.runAllTimers();
    });
    expect(result.current.appearing).toBe(false);
    expect(result.current.stage).toBe(ENTERED);

    rerender(<Test transitionIn={false} {...props} />);
    expect(result.current.appearing).toBe(false);
    expect(result.current.stage).toBe(EXITING);

    act(() => {
      jest.runAllTimers();
    });
    expect(result.current.appearing).toBe(false);
    expect(result.current.stage).toBe(EXITED);

    // should keep appearing false for all remaining transitions
    rerender(<Test transitionIn {...props} />);
    expect(result.current.appearing).toBe(false);
    expect(result.current.stage).toBe(ENTERING);

    act(() => {
      jest.runAllTimers();
    });
    expect(result.current.appearing).toBe(false);
    expect(result.current.stage).toBe(ENTERED);
  });

  it("should trigger the correct transition for a temporary appearing transition", () => {
    const result = createResultRef();
    const props = { appear: true, temporary: true, timeout: 200, result };
    const { rerender } = render(<Test transitionIn {...props} />);

    expect(result.current.appearing).toBe(true);
    expect(result.current.rendered).toBe(true);
    expect(result.current.stage).toBe(ENTERING);

    act(() => {
      jest.runAllTimers();
    });
    expect(result.current.appearing).toBe(false);
    expect(result.current.rendered).toBe(true);
    expect(result.current.stage).toBe(ENTERED);

    rerender(<Test transitionIn={false} {...props} />);
    expect(result.current.appearing).toBe(false);
    expect(result.current.rendered).toBe(true);
    expect(result.current.stage).toBe(EXITING);

    act(() => {
      jest.runAllTimers();
    });
    expect(result.current.appearing).toBe(false);
    expect(result.current.rendered).toBe(false);
    expect(result.current.stage).toBe(EXITED);
  });

  it("should transition correctly if the timeout is an object", () => {
    const timeout = {
      enter: 200,
      exit: 150,
    };
    const result = createResultRef();
    const props = { timeout, result };
    const { rerender } = render(<Test {...props} transitionIn={false} />);
    expect(result.current.stage).toBe(EXITED);

    rerender(<Test {...props} transitionIn />);
    expect(result.current.stage).toBe(ENTERING);

    act(() => {
      jest.advanceTimersByTime(150);
    });
    // should not restart the timer
    rerender(<Test {...props} transitionIn />);
    expect(jest.getTimerCount()).toBe(1);
    expect(result.current.stage).toBe(ENTERING);

    act(() => {
      jest.advanceTimersToNextTimer();
    });
    expect(jest.getTimerCount()).toBe(0);
    expect(result.current.stage).toBe(ENTERED);

    rerender(<Test {...props} transitionIn={false} />);
    expect(jest.getTimerCount()).toBe(1);
    expect(result.current.stage).toBe(EXITING);

    act(() => {
      jest.advanceTimersByTime(50);
    });
    expect(jest.getTimerCount()).toBe(1);
    expect(result.current.stage).toBe(EXITING);

    act(() => {
      jest.runAllTimers();
    });
    expect(jest.getTimerCount()).toBe(0);
    expect(result.current.stage).toBe(EXITED);
  });
});
