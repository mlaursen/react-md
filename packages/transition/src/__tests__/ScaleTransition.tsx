import type { ReactElement } from "react";
import { useState } from "react";
import { act, fireEvent, render } from "@testing-library/react";

import type { ScaleTransitionProps } from "../ScaleTransition";
import { ScaleTransition } from "../ScaleTransition";

interface TestProps
  extends Omit<ScaleTransitionProps<HTMLElement>, "transitionIn" | "children"> {
  defaultTransitionIn?: boolean;
}

function Test({
  defaultTransitionIn = false,
  ...props
}: TestProps): ReactElement {
  const [transitionIn, setTransitionIn] = useState(defaultTransitionIn);
  return (
    <>
      <button type="button" onClick={() => setTransitionIn((p) => !p)}>
        Toggle
      </button>
      <ScaleTransition {...props} transitionIn={transitionIn}>
        <div data-testid="element">This is some content.</div>
      </ScaleTransition>
    </>
  );
}

describe("ScaleTransition", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it("should default to not and using the horizontal transition", () => {
    const { getByRole, getByTestId, rerender } = render(<Test />);
    const getElement = (): HTMLElement => getByTestId("element");
    const toggle = getByRole("button");

    expect(getElement).toThrow();
    expect(document.body).toMatchSnapshot();

    fireEvent.click(toggle);
    expect(getElement).not.toThrow();
    expect(document.body).toMatchSnapshot();

    act(() => {
      jest.runAllTimers();
    });
    expect(getElement).not.toThrow();
    expect(document.body).toMatchSnapshot();

    fireEvent.click(toggle);
    expect(getElement).not.toThrow();
    expect(document.body).toMatchSnapshot();

    act(() => {
      jest.runAllTimers();
    });
    expect(getElement).toThrow();
    expect(document.body).toMatchSnapshot();

    rerender(<Test portal />);
    fireEvent.click(toggle);
    expect(getElement).not.toThrow();
    expect(document.body).toMatchSnapshot();

    act(() => {
      jest.runAllTimers();
    });
    expect(getElement).not.toThrow();
    expect(document.body).toMatchSnapshot();

    fireEvent.click(toggle);
    expect(getElement).not.toThrow();
    expect(document.body).toMatchSnapshot();

    act(() => {
      jest.runAllTimers();
    });
    expect(getElement).toThrow();
    expect(document.body).toMatchSnapshot();
  });

  it("should render correctly for a vertical transition", () => {
    const { getByRole, getByTestId } = render(<Test vertical />);
    const getElement = (): HTMLElement => getByTestId("element");
    const toggle = getByRole("button");

    expect(getElement).toThrow();
    expect(document.body).toMatchSnapshot();

    fireEvent.click(toggle);
    expect(getElement).not.toThrow();
    expect(document.body).toMatchSnapshot();

    act(() => {
      jest.runAllTimers();
    });
    expect(getElement).not.toThrow();
    expect(document.body).toMatchSnapshot();

    fireEvent.click(toggle);
    expect(getElement).not.toThrow();
    expect(document.body).toMatchSnapshot();

    act(() => {
      jest.runAllTimers();
    });
    expect(getElement).toThrow();
    expect(document.body).toMatchSnapshot();
  });

  it("should merge the className and allow to be rendered by default", () => {
    const { getByRole, getByTestId } = render(
      <Test className="custom-class" defaultTransitionIn />
    );

    const getElement = (): HTMLElement => getByTestId("element");
    const toggle = getByRole("button");

    expect(getElement()).toHaveClass("custom-class");
    expect(document.body).toMatchSnapshot();

    fireEvent.click(toggle);
    expect(getElement()).toHaveClass("custom-class");
    expect(document.body).toMatchSnapshot();

    act(() => {
      jest.runAllTimers();
    });
    expect(getElement).toThrow();
    expect(document.body).toMatchSnapshot();

    fireEvent.click(toggle);
    expect(getElement()).toHaveClass("custom-class");
    expect(document.body).toMatchSnapshot();

    act(() => {
      jest.runAllTimers();
    });
    expect(getElement()).toHaveClass("custom-class");
    expect(document.body).toMatchSnapshot();
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
