import type { MutableRefObject, ReactElement } from "react";
import { useEffect, useState } from "react";
import { act, fireEvent, render } from "@testing-library/react";

import type {
  TransitionHookOptions,
  TransitionStage,
  TransitionTimeout,
} from "../types";
import { useTransition } from "../useTransition";

const createStageRef = (): MutableRefObject<TransitionStage[]> => ({
  current: [],
});

interface TestProps
  extends Omit<
    TransitionHookOptions<HTMLLIElement>,
    "transitionIn" | "timeout"
  > {
  timeout?: TransitionTimeout;
  stageRef?: MutableRefObject<TransitionStage[]>;
  defaultTransitionIn?: boolean;
}

function Test({
  stageRef,
  timeout = 1000,
  defaultTransitionIn = false,
  ...options
}: TestProps): ReactElement {
  const [transitionIn, setTransitionIn] = useState(defaultTransitionIn);
  const { ref, stage, appearing, rendered } = useTransition({
    ...options,
    timeout,
    transitionIn,
  });
  useEffect(() => {
    stageRef?.current.push(stage);
  }, [stage, stageRef]);

  return (
    <>
      <button type="button" onClick={() => setTransitionIn((p) => !p)}>
        Toggle
      </button>
      <ul role="log">
        {rendered && <li ref={ref}>{`The current stage is: "${stage}"`}</li>}
        <li>{`Appearing: ${appearing}`}</li>
      </ul>
    </>
  );
}

describe("useTransition", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it("should default to enabling enter and exit transitions and non-temporary", () => {
    const stageRef = createStageRef();
    const stages = stageRef.current;
    const { getByRole, getByText } = render(<Test stageRef={stageRef} />);
    const toggle = getByRole("button", { name: "Toggle" });

    expect(() => getByText(`The current stage is: "exited"`)).not.toThrow();
    expect(() => getByText("Appearing: false")).not.toThrow();
    expect(stages).toEqual(["exited"]);

    act(() => {
      jest.runAllTimers();
    });
    expect(() => getByText(`The current stage is: "exited"`)).not.toThrow();
    expect(() => getByText("Appearing: false")).not.toThrow();

    fireEvent.click(toggle);
    expect(stages).toEqual(["exited", "enter", "entering"]);
    expect(() => getByText(`The current stage is: "entering"`)).not.toThrow();
    expect(() => getByText("Appearing: false")).not.toThrow();

    act(() => {
      jest.runAllTimers();
    });

    expect(stages).toEqual(["exited", "enter", "entering", "entered"]);
    expect(() => getByText(`The current stage is: "entered"`)).not.toThrow();
    expect(() => getByText("Appearing: false")).not.toThrow();

    // Exit flow
    fireEvent.click(toggle);
    expect(stages).toEqual([
      "exited",
      "enter",
      "entering",
      "entered",
      "exit",
      "exiting",
    ]);
    expect(() => getByText(`The current stage is: "exiting"`)).not.toThrow();
    expect(() => getByText("Appearing: false")).not.toThrow();

    act(() => {
      jest.runAllTimers();
    });
    expect(stages).toEqual([
      "exited",
      "enter",
      "entering",
      "entered",
      "exit",
      "exiting",
      "exited",
    ]);
    expect(() => getByText(`The current stage is: "exited"`)).not.toThrow();
    expect(() => getByText("Appearing: false")).not.toThrow();
  });

  it("should mount and unmount the component if the temporary option is enabled", () => {
    const { getByRole, getByText } = render(<Test temporary />);

    const toggle = getByRole("button");
    expect(() => getByText(/^The current stage/)).toThrow();

    fireEvent.click(toggle);
    expect(() => getByText(/^The current stage/)).not.toThrow();

    act(() => {
      jest.runAllTimers();
    });
    expect(() => getByText(/^The current stage/)).not.toThrow();

    fireEvent.click(toggle);
    expect(() => getByText(/^The current stage/)).not.toThrow();

    act(() => {
      jest.runAllTimers();
    });
    expect(() => getByText(/^The current stage/)).toThrow();
  });

  it("should trigger the callbacks at each stage", () => {
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

  it("should handle non-temporary appear transitions correctly", () => {
    const { getByText, getByRole, rerender } = render(<Test appear />);
    expect(() => getByText('The current stage is: "exited"')).not.toThrow();
    expect(() => getByText("Appearing: false")).not.toThrow();
    act(() => {
      jest.runAllTimers();
    });
    expect(() => getByText('The current stage is: "exited"')).not.toThrow();
    expect(() => getByText("Appearing: false")).not.toThrow();

    rerender(<Test appear defaultTransitionIn key="new-key" />);
    expect(() => getByText('The current stage is: "entering"')).not.toThrow();
    expect(() => getByText("Appearing: true")).not.toThrow();

    act(() => {
      jest.runAllTimers();
    });
    expect(() => getByText('The current stage is: "entered"')).not.toThrow();
    expect(() => getByText("Appearing: true")).not.toThrow();

    fireEvent.click(getByRole("button"));
    expect(() => getByText('The current stage is: "exiting"')).not.toThrow();
    expect(() => getByText("Appearing: false")).not.toThrow();

    act(() => {
      jest.runAllTimers();
    });
    expect(() => getByText('The current stage is: "exited"')).not.toThrow();
    expect(() => getByText("Appearing: false")).not.toThrow();
  });

  it("should handle temporary appear transitions correctly", () => {
    const { getByRole, getByText, rerender } = render(
      <Test appear temporary />
    );
    expect(() => getByText(/^The current stage is/)).toThrow();
    expect(() => getByText("Appearing: false")).not.toThrow();
    act(() => {
      jest.runAllTimers();
    });
    expect(() => getByText(/^The current stage is/)).toThrow();
    expect(() => getByText("Appearing: false")).not.toThrow();

    rerender(<Test appear temporary defaultTransitionIn key="new-key" />);
    expect(() => getByText('The current stage is: "entering"')).not.toThrow();
    expect(() => getByText("Appearing: true")).not.toThrow();

    act(() => {
      jest.runAllTimers();
    });
    expect(() => getByText('The current stage is: "entered"')).not.toThrow();
    expect(() => getByText("Appearing: true")).not.toThrow();

    fireEvent.click(getByRole("button"));
    expect(() => getByText('The current stage is: "exiting"')).not.toThrow();
    expect(() => getByText("Appearing: false")).not.toThrow();

    act(() => {
      jest.runAllTimers();
    });
    expect(() => getByText(/^The current stage is/)).toThrow();
    expect(() => getByText("Appearing: false")).not.toThrow();
  });

  it("should access the element's scrollTop attribute to trigger a reflow when the reflow option is enabled and the stage is not entered or exited", () => {
    const scrollTop = jest.spyOn(Element.prototype, "scrollTop", "get");
    const { getByRole } = render(<Test reflow />);
    const toggle = getByRole("button", { name: "Toggle" });

    expect(scrollTop).not.toBeCalled();

    fireEvent.click(toggle);
    expect(scrollTop).toBeCalledTimes(2);
    act(() => {
      jest.runAllTimers();
    });
    expect(scrollTop).toBeCalledTimes(2);

    fireEvent.click(toggle);
    expect(scrollTop).toBeCalledTimes(4);
    act(() => {
      jest.runAllTimers();
    });
    expect(scrollTop).toBeCalledTimes(4);
  });

  it("should cancel the timeouts and immediately switch to the new transition if a new transition starts before the previous has been completed", () => {
    const stageRef = createStageRef();
    const stages = stageRef.current;
    const { getByRole, getByText } = render(<Test stageRef={stageRef} />);
    const toggle = getByRole("button", { name: "Toggle" });

    expect(() => getByText(`The current stage is: "exited"`)).not.toThrow();
    expect(stages).toEqual(["exited"]);

    fireEvent.click(toggle);
    expect(stages).toEqual(["exited", "enter", "entering"]);
    expect(() => getByText(`The current stage is: "entering"`)).not.toThrow();

    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(stages).toEqual(["exited", "enter", "entering"]);
    expect(() => getByText(`The current stage is: "entering"`)).not.toThrow();

    fireEvent.click(toggle);
    expect(stages).toEqual(["exited", "enter", "entering", "exit", "exiting"]);
    expect(() => getByText(`The current stage is: "exiting"`)).not.toThrow();

    act(() => {
      jest.runAllTimers();
    });
    expect(stages).toEqual([
      "exited",
      "enter",
      "entering",
      "exit",
      "exiting",
      "exited",
    ]);
    expect(() => getByText(`The current stage is: "exited"`)).not.toThrow();

    fireEvent.click(toggle);
    act(() => {
      jest.advanceTimersByTime(300);
    });
    fireEvent.click(toggle);
    act(() => {
      jest.advanceTimersByTime(300);
    });
    fireEvent.click(toggle);
    act(() => {
      jest.runAllTimers();
    });
    expect(stages).toEqual([
      "exited",
      "enter",
      "entering",
      "exit",
      "exiting",
      "exited",
      "enter",
      "entering",
      "exit",
      "exiting",
      "enter",
      "entering",
      "entered",
    ]);
    expect(() => getByText(`The current stage is: "entered"`)).not.toThrow();
  });

  it("should skip the enter, entering, exit, and exiting stages if the transition in disabled", () => {
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
      timeout: 0,
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
    expect(onEnter).not.toBeCalled();
    expect(onEntering).not.toBeCalled();
    expect(onEntered).toBeCalledTimes(1);
    expect(onExit).not.toBeCalled();
    expect(onExiting).not.toBeCalled();
    expect(onExited).not.toBeCalled();

    fireEvent.click(toggle);
    expect(onEnter).not.toBeCalled();
    expect(onEntering).not.toBeCalled();
    expect(onEntered).toBeCalledTimes(1);
    expect(onExit).not.toBeCalled();
    expect(onExiting).not.toBeCalled();
    expect(onExited).toBeCalledTimes(1);
  });
});
