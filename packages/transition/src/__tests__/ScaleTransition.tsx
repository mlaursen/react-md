import React from "react";
import { render, act } from "@testing-library/react";

import { ScaleTransition } from "../ScaleTransition";

describe("ScaleTransition", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it("should render correctly for horizontal transitions", () => {
    const props = {
      vertical: false,
      children: <div>Some amazing content</div>,
    };
    const { container, rerender } = render(
      <ScaleTransition {...props} visible={false} />
    );
    expect(container).toMatchSnapshot();

    rerender(<ScaleTransition {...props} visible />);
    expect(container).toMatchSnapshot();
    act(() => {
      jest.runAllTimers();
    });
    expect(container).toMatchSnapshot();

    rerender(<ScaleTransition {...props} visible={false} />);
    expect(container).toMatchSnapshot();
    act(() => {
      jest.runAllTimers();
    });
    expect(container).toMatchSnapshot();
  });

  it("should render correctly for vertical transitions", () => {
    const props = {
      vertical: true,
      children: <div>Some amazing content</div>,
    };
    const { container, rerender } = render(
      <ScaleTransition {...props} visible={false} />
    );
    expect(container).toMatchSnapshot();

    rerender(<ScaleTransition {...props} visible />);
    expect(container).toMatchSnapshot();
    act(() => {
      jest.runAllTimers();
    });
    expect(container).toMatchSnapshot();

    rerender(<ScaleTransition {...props} visible={false} />);
    expect(container).toMatchSnapshot();
    act(() => {
      jest.runAllTimers();
    });
    expect(container).toMatchSnapshot();
  });

  it("should allow for portalling", () => {
    const props = {
      children: <div data-testid="div">Some amazing content!</div>,
      portal: true,
    };
    const { container, getByTestId, rerender } = render(
      <ScaleTransition {...props} visible={false} />
    );

    const getDiv = () => getByTestId("div");
    expect(getDiv).toThrow();
    rerender(<ScaleTransition {...props} visible />);
    expect(getDiv).not.toThrow();
    expect(container.hasChildNodes()).toBe(false);
    expect(document.body).toMatchSnapshot();

    act(() => {
      jest.runAllTimers();
    });
    expect(container.hasChildNodes()).toBe(false);
    expect(document.body).toMatchSnapshot();
  });
});
