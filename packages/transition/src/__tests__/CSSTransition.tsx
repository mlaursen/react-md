import type { ReactElement } from "react";
import { useState } from "react";
import { act, fireEvent, render } from "@testing-library/react";

import type { CSSTransitionProps } from "../CSSTransition";
import { CSSTransition } from "../CSSTransition";
import type { CSSTransitionClassNames, TransitionTimeout } from "../types";

interface TestProps
  extends Omit<
    CSSTransitionProps<HTMLDivElement>,
    "transitionIn" | "timeout" | "classNames" | "children"
  > {
  defaultTransitionIn?: boolean;
  timeout?: TransitionTimeout;
  classNames?: CSSTransitionClassNames;
}

function Test({
  defaultTransitionIn = false,
  timeout = 150,
  classNames = "some-transition",
  ...props
}: TestProps): ReactElement {
  const [transitionIn, setTransitionIn] = useState(defaultTransitionIn);
  return (
    <>
      <button type="button" onClick={() => setTransitionIn((p) => !p)}>
        Toggle
      </button>
      <CSSTransition
        {...props}
        transitionIn={transitionIn}
        timeout={timeout}
        classNames={classNames}
      >
        <div data-testid="element">This is some content.</div>
      </CSSTransition>
    </>
  );
}

describe("CSSTransition", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it("should render correctly", () => {
    const { container, getByRole, getByTestId, rerender } = render(<Test />);
    const getElement = (): HTMLElement => getByTestId("element");
    const toggle = getByRole("button");

    expect(getElement).not.toThrow();
    expect(container).toMatchSnapshot();

    fireEvent.click(toggle);
    expect(getElement).not.toThrow();
    expect(container).toMatchSnapshot();

    act(() => {
      jest.runAllTimers();
    });
    expect(getElement).not.toThrow();
    expect(container).toMatchSnapshot();

    fireEvent.click(toggle);
    expect(getElement).not.toThrow();
    expect(container).toMatchSnapshot();

    act(() => {
      jest.runAllTimers();
    });
    expect(getElement).not.toThrow();
    expect(container).toMatchSnapshot();

    rerender(<Test temporary />);
    expect(getElement).toThrow();
    expect(container).toMatchSnapshot();

    fireEvent.click(toggle);
    expect(getElement).not.toThrow();
    expect(container).toMatchSnapshot();

    act(() => {
      jest.runAllTimers();
    });
    expect(getElement).not.toThrow();
    expect(container).toMatchSnapshot();

    fireEvent.click(toggle);
    expect(getElement).not.toThrow();
    expect(container).toMatchSnapshot();

    act(() => {
      jest.runAllTimers();
    });
    expect(getElement).toThrow();
    expect(container).toMatchSnapshot();
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
