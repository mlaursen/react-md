import type { ReactElement } from "react";
import { useState } from "react";
import { act, fireEvent, render } from "@testing-library/react";

import type { CrossFadeProps } from "../CrossFade";
import { CrossFade } from "../CrossFade";

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
    expect(onExit).not.toBeCalled();
    expect(onExiting).not.toBeCalled();
    expect(onExited).toBeCalledTimes(1);
  });
});
