import type { ReactElement } from "react";
import { useState } from "react";
import { act, fireEvent, render } from "@testing-library/react";

import type { CollapseTransitionHookOptions } from "../useCollapseTransition";
import { useCollapseTransition } from "../useCollapseTransition";

interface TestProps
  extends Omit<CollapseTransitionHookOptions<HTMLElement>, "transitionIn"> {
  defaultTransitionIn?: boolean;
}

function Test({
  defaultTransitionIn = false,
  ...options
}: TestProps): ReactElement {
  const [transitionIn, setTransitionIn] = useState(defaultTransitionIn);
  const { elementProps, rendered } = useCollapseTransition({
    ...options,
    transitionIn,
  });

  return (
    <>
      <button type="button" onClick={() => setTransitionIn((p) => !p)}>
        Toggle
      </button>
      {rendered && (
        <div {...elementProps} data-testid="element">
          This is some content.
        </div>
      )}
    </>
  );
}

describe("useCollapseTransition", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it("should default to not rendering the element when transitionIn is false", () => {
    const { container, getByRole, getByTestId } = render(<Test />);
    const getElement = (): HTMLElement => getByTestId("element");
    const toggle = getByRole("button");

    expect(getElement).toThrow();

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

  it("should apply the hidden attribute if the temporary behavior is disabled", () => {
    const { container, getByRole, getByTestId } = render(
      <Test temporary={false} />
    );
    const toggle = getByRole("button");
    const element = getByTestId("element");

    expect(element).toHaveAttribute("hidden");
    expect(container).toMatchSnapshot();

    fireEvent.click(toggle);
    expect(element).not.toHaveAttribute("hidden");
    expect(container).toMatchSnapshot();

    act(() => {
      jest.runAllTimers();
    });
    expect(element).not.toHaveAttribute("hidden");
    expect(container).toMatchSnapshot();

    fireEvent.click(toggle);
    expect(element).not.toHaveAttribute("hidden");
    expect(container).toMatchSnapshot();

    act(() => {
      jest.runAllTimers();
    });
    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute("hidden");
    expect(container).toMatchSnapshot();
  });

  it("should default to not being temporary if the minHeight, minPaddingTop, or minPaddingBottom are not 0", () => {
    const { container, getByTestId, rerender } = render(
      <Test key="first-test" minHeight={120} />
    );
    const getElement = (): HTMLElement => getByTestId("element");

    expect(getElement).not.toThrow();
    expect(container).toMatchSnapshot();

    rerender(<Test key="second-test" minPaddingBottom={16} />);
    expect(getElement).not.toThrow();
    expect(container).toMatchSnapshot();

    rerender(<Test key="third-test" minPaddingTop={8} />);
    expect(getElement).not.toThrow();
    expect(container).toMatchSnapshot();

    rerender(
      <Test
        key="final-test"
        minHeight={120}
        minPaddingBottom={16}
        minPaddingTop={8}
        temporary
      />
    );
    expect(getElement).toThrow();
    expect(container).toMatchSnapshot();
  });

  it("should not apply any style if it mounts while transitionIn is true", () => {
    const { container, getByTestId } = render(<Test defaultTransitionIn />);
    const element = getByTestId("element");
    expect(element.style.minHeight).toBe("");
    expect(element.style.paddingBottom).toBe("");
    expect(element.style.paddingTop).toBe("");
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

  it("should apply the correct appear transitionDuration", () => {
    const { container, getByRole, getByTestId } = render(
      <Test
        appear
        defaultTransitionIn
        timeout={{ appear: 100, enter: 250, exit: 200 }}
      />
    );
    let element = getByTestId("element");
    const toggle = getByRole("button");

    expect(element.style.transitionDuration).toBe("100ms");
    expect(container).toMatchSnapshot();

    act(() => {
      jest.runAllTimers();
    });
    expect(element.style.transitionDuration).toBe("");
    expect(container).toMatchSnapshot();

    fireEvent.click(toggle);
    expect(element.style.transitionDuration).toBe("200ms");
    expect(container).toMatchSnapshot();

    act(() => {
      jest.runAllTimers();
    });
    expect(element).not.toBeInTheDocument();
    expect(container).toMatchSnapshot();

    fireEvent.click(toggle);
    element = getByTestId("element");
    expect(element.style.transitionDuration).toBe("250ms");
    expect(container).toMatchSnapshot();

    act(() => {
      jest.runAllTimers();
    });
    expect(element.style.transitionDuration).toBe("");
    expect(container).toMatchSnapshot();
  });

  it("should not apply any class names if the timeout is disabled", () => {
    const { container, getByRole, getByTestId } = render(<Test timeout={0} />);
    const getElement = (): HTMLElement => getByTestId("element");
    const toggle = getByRole("button");

    expect(getElement).toThrow();
    expect(container).toMatchSnapshot();

    fireEvent.click(toggle);
    expect(getElement).not.toThrow();
    expect(getElement().className).toBe("");
    expect(container).toMatchSnapshot();

    act(() => {
      jest.runAllTimers();
    });
    expect(getElement).not.toThrow();
    expect(getElement().className).toBe("");
    expect(container).toMatchSnapshot();
  });
});
