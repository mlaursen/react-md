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
import { CrossFade, type CrossFadeProps } from "../CrossFade.js";
import { TRANSITION_CONFIG } from "../config.js";

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
      <button
        type="button"
        onClick={() => {
          setTransitionIn((p) => !p);
        }}
      >
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

  beforeEach(() => {
    TRANSITION_CONFIG.disabled = false;
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it("should default to using appear transitions", () => {
    const { container, rerender } = render(
      <CrossFade>
        <div data-testid="element">This is some content.</div>
      </CrossFade>
    );
    const getElement = (): HTMLElement => screen.getByTestId("element");

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
    const { container } = render(<Test />);
    const getElement = (): HTMLElement => screen.getByTestId("element");
    const toggle = screen.getByRole("button");

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
    const { container } = render(<Test temporary />);
    const getElement = (): HTMLElement => screen.getByTestId("element");
    const toggle = screen.getByRole("button");

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
    const { container } = render(<Test className="custom-class" />);
    const getElement = (): HTMLElement => screen.getByTestId("element");
    const toggle = screen.getByRole("button");

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
    expect(onExit).not.toHaveBeenCalled();
    expect(onExiting).not.toHaveBeenCalled();
    expect(onExited).toHaveBeenCalledTimes(1);
  });
});
