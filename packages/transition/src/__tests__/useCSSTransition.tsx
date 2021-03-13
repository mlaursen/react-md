import React, { ReactElement } from "react";
import { render, act } from "@testing-library/react";

import { useCSSTransition } from "../useCSSTransition";
import { CSSTransitionOptions } from "../types";

type TestProps = Omit<
  CSSTransitionOptions<HTMLDivElement>,
  "timeout" | "classNames"
> &
  Partial<Pick<CSSTransitionOptions<HTMLDivElement>, "timeout" | "classNames">>;

function Test({
  timeout = 150,
  classNames = "transition",
  ...props
}: TestProps): ReactElement | null {
  const [rendered, transitionProps] = useCSSTransition({
    timeout,
    classNames,
    ...props,
  });

  if (!rendered) {
    return null;
  }

  return (
    <div data-testid="div" {...transitionProps}>
      Amazing content!
    </div>
  );
}

describe("useCSSTransition", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it("should work as expected for non-temporary flows", () => {
    const { getByTestId, rerender } = render(<Test transitionIn={false} />);
    const div = getByTestId("div");
    expect(div).toMatchSnapshot();

    rerender(<Test transitionIn />);
    expect(div).toMatchSnapshot();

    act(() => {
      jest.advanceTimersByTime(150);
    });
    expect(div).toMatchSnapshot();

    rerender(<Test transitionIn={false} />);
    expect(div).toMatchSnapshot();

    act(() => {
      jest.advanceTimersByTime(150);
    });
    expect(div).toMatchSnapshot();
  });

  it("should work as expected for temporary flows", () => {
    const { getByTestId, rerender } = render(
      <Test transitionIn={false} temporary />
    );
    expect(() => getByTestId("div")).toThrow();

    rerender(<Test transitionIn temporary />);
    const div = getByTestId("div");
    expect(div).toMatchSnapshot();

    act(() => {
      jest.advanceTimersByTime(150);
    });
    expect(div).toMatchSnapshot();

    rerender(<Test transitionIn={false} temporary />);
    expect(div).toMatchSnapshot();

    act(() => {
      jest.advanceTimersByTime(150);
    });
    expect(() => getByTestId("div")).toThrow();
  });
});
