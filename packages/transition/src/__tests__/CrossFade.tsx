import React, { ReactElement } from "react";
import { render, act } from "@testing-library/react";

import { CrossFade } from "../CrossFade";

describe("CrossFade", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it("should be a simple wrapper for the useCrossFade hook that just sets the appear value to `true`", () => {
    const { getByTestId } = render(
      <CrossFade>
        <div data-testid="div">Amazing content!</div>
      </CrossFade>
    );
    const div = getByTestId("div");
    expect(div).toMatchSnapshot();

    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(div).toMatchSnapshot();
  });

  it("should allow for wrapping in a div to apply the transition instead of cloning into the child", () => {
    function Child(): ReactElement {
      return <div>My Amazing Content!</div>;
    }

    const { container } = render(
      <CrossFade wrap>
        <Child />
      </CrossFade>
    );
    expect(container).toMatchSnapshot();
  });

  it("should automatically wrap if the children is not a valid element even if the wrap prop is false", () => {
    const { container } = render(<CrossFade>My Amazing Content</CrossFade>);
    expect(container).toMatchSnapshot();
  });
});
