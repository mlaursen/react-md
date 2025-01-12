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
import { act, fireEvent, render, screen } from "test-utils";

import { DISPLAY_NONE_CLASS } from "../../utils/isElementVisible.js";
import { Collapse, type CollapseProps } from "../Collapse.js";
import { TRANSITION_CONFIG } from "../config.js";

interface TestProps
  extends Omit<CollapseProps<HTMLElement>, "collapsed" | "children"> {
  defaultCollapsed?: boolean;
}

function Test({ defaultCollapsed = true, ...props }: TestProps): ReactElement {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setCollapsed((p) => !p);
        }}
      >
        Toggle
      </button>
      <Collapse {...props} collapsed={collapsed}>
        <div data-testid="element">This is some content.</div>
      </Collapse>
    </>
  );
}

describe("useCollapseTransition", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    TRANSITION_CONFIG.disabled = false;
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it("should default to not rendering the element when transitionIn is false", () => {
    const { container } = render(<Test />);
    const getElement = (): HTMLElement => screen.getByTestId("element");
    const toggle = screen.getByRole("button");

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

  it(`should apply the ${DISPLAY_NONE_CLASS} if the temporary behavior is disabled`, () => {
    const { container } = render(<Test temporary={false} />);
    const toggle = screen.getByRole("button");
    const element = screen.getByTestId("element");

    expect(element).toHaveClass(DISPLAY_NONE_CLASS);
    expect(container).toMatchSnapshot();

    fireEvent.click(toggle);
    expect(element).not.toHaveClass(DISPLAY_NONE_CLASS);
    expect(container).toMatchSnapshot();

    act(() => {
      jest.runAllTimers();
    });
    expect(element).not.toHaveClass(DISPLAY_NONE_CLASS);
    expect(container).toMatchSnapshot();

    fireEvent.click(toggle);
    expect(element).not.toHaveClass(DISPLAY_NONE_CLASS);
    expect(container).toMatchSnapshot();

    act(() => {
      jest.runAllTimers();
    });
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass(DISPLAY_NONE_CLASS);
    expect(container).toMatchSnapshot();
  });

  it("should default to not being temporary if the minHeight, minPaddingTop, or minPaddingBottom are not 0", () => {
    const { container, rerender } = render(
      <Test key="first-test" minHeight={120} />
    );
    const getElement = (): HTMLElement => screen.getByTestId("element");

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

  it("should not apply any style if it mounts while collapsed is false", () => {
    const { container } = render(<Test defaultCollapsed={false} />);
    const element = screen.getByTestId("element");
    expect(element).toHaveStyle({ minHeight: "" });
    expect(element).toHaveStyle({ paddingBottom: "" });
    expect(element).toHaveStyle({ paddingTop: "" });
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
