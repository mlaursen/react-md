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
import { act, fireEvent, render, screen } from "../../test-utils/index.js";

import {
  ScaleTransition,
  type ScaleTransitionProps,
} from "../ScaleTransition.js";
import { TRANSITION_CONFIG } from "../config.js";

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

  beforeEach(() => {
    TRANSITION_CONFIG.disabled = false;
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it("should default to using the horizontal transition", () => {
    render(<Test />);
    const getElement = (): HTMLElement => screen.getByTestId("element");
    const toggle = screen.getByRole("button");

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

  it("should render correctly for a vertical transition", () => {
    render(<Test vertical />);
    const getElement = (): HTMLElement => screen.getByTestId("element");
    const toggle = screen.getByRole("button");

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
    render(<Test className="custom-class" defaultTransitionIn />);

    const getElement = (): HTMLElement => screen.getByTestId("element");
    const toggle = screen.getByRole("button");

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
