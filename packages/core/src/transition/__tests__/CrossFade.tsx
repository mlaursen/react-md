import {
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import type { ReactElement } from "react";
import { useState } from "react";
import { act, fireEvent, render } from "../../test-utils/index.js";

import type { CrossFadeProps } from "../CrossFade.js";
import { CrossFade } from "../CrossFade.js";

interface TestProps
  extends Omit<CrossFadeProps<HTMLElement>, "transitionIn" | "children"> {
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
      <CrossFade {...props} appear={false} transitionIn={transitionIn}>
        <div data-testid="element">This is some content.</div>
      </CrossFade>
    </>
  );
}

describe("CrossFade", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it("should default to using appear transitions", () => {
    const { container, getByTestId, rerender } = render(
      <CrossFade>
        <div data-testid="element">This is some content.</div>
      </CrossFade>
    );
    const getElement = (): HTMLElement => getByTestId("element");

    expect(getElement).not.toThrow();
    expect(container).toMatchSnapshot();

    act(() => {
      jest.runAllTimers();
    });
    expect(getElement).not.toThrow();
    expect(container).toMatchSnapshot();

    rerender(
      <CrossFade key="new-transition">
        <div data-testid="element">This is some new content.</div>
      </CrossFade>
    );
    expect(getElement).not.toThrow();
    expect(container).toMatchSnapshot();

    act(() => {
      jest.runAllTimers();
    });
    expect(getElement).not.toThrow();
    expect(container).toMatchSnapshot();
  });

  it("should transition correctly when not appearing", () => {
    const { container, getByRole, getByTestId } = render(<Test />);
    const getElement = (): HTMLElement => getByTestId("element");
    const toggle = getByRole("button");

    expect(getElement).not.toThrow();
    expect(getElement().className).toBe("");
    expect(container).toMatchSnapshot();

    fireEvent.click(toggle);
    expect(getElement).not.toThrow();
    expect(container).toMatchSnapshot();

    act(() => {
      jest.runAllTimers();
    });
    expect(getElement).not.toThrow();
    expect(container).toMatchSnapshot();

    // no transition for exit
    fireEvent.click(toggle);
    expect(getElement).not.toThrow();
    expect(getElement().className).toBe("");
    expect(container).toMatchSnapshot();

    // shouldn't really be any timers
    act(() => {
      jest.runAllTimers();
    });
    expect(getElement).not.toThrow();
    expect(getElement().className).toBe("");
    expect(container).toMatchSnapshot();
  });

  it("should allow for temporary CSS Transition behavior", () => {
    const { container, getByRole, getByTestId } = render(<Test temporary />);
    const getElement = (): HTMLElement => getByTestId("element");
    const toggle = getByRole("button");

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

    // no transition for exit
    fireEvent.click(toggle);
    expect(getElement).toThrow();
  });

  it("should correctly merge the className prop", () => {
    const { container, getByRole, getByTestId } = render(
      <Test className="custom-class" />
    );
    const getElement = (): HTMLElement => getByTestId("element");
    const toggle = getByRole("button");

    expect(getElement).not.toThrow();
    expect(getElement().className).toBe("custom-class");
    expect(container).toMatchSnapshot();

    fireEvent.click(toggle);
    expect(getElement).not.toThrow();
    expect(getElement()).toHaveClass("custom-class");
    expect(container).toMatchSnapshot();

    act(() => {
      jest.runAllTimers();
    });
    expect(getElement).not.toThrow();
    expect(getElement().className).toBe("custom-class");
    expect(container).toMatchSnapshot();

    // no transition for exit
    fireEvent.click(toggle);
    expect(getElement).not.toThrow();
    expect(getElement().className).toBe("custom-class");
    expect(container).toMatchSnapshot();

    // shouldn't really be any timers
    act(() => {
      jest.runAllTimers();
    });
    expect(getElement).not.toThrow();
    expect(getElement().className).toBe("custom-class");
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
    expect(onExit).not.toHaveBeenCalled();
    expect(onExiting).not.toHaveBeenCalled();
    expect(onExited).toHaveBeenCalledTimes(1);
  });
});