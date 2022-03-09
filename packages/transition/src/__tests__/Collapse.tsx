import type { ReactElement } from "react";
import { useState } from "react";
import { act, fireEvent, render } from "@testing-library/react";

import type { CollapseProps } from "../Collapse";
import { Collapse } from "../Collapse";

interface TestProps
  extends Omit<CollapseProps<HTMLElement>, "collapsed" | "children"> {
  defaultCollapsed?: boolean;
}

function Test({ defaultCollapsed = true, ...props }: TestProps): ReactElement {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  return (
    <>
      <button type="button" onClick={() => setCollapsed((p) => !p)}>
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

  it("should not apply any style if it mounts while collapsed is false", () => {
    const { container, getByTestId } = render(
      <Test defaultCollapsed={false} />
    );
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
});
