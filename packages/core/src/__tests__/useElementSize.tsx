import { type MutableRefObject, type ReactElement, createRef } from "react";
import { describe, expect, it } from "vitest";

import {
  act,
  render,
  screen,
  setupResizeObserverMock,
} from "../test-utils/index.js";
import { cleanupResizeObserverAfterEach } from "../test-utils/vitest/index.js";
import { type ElementSize } from "../types.js";
import { type ElementSizeOptions, useElementSize } from "../useElementSize.js";

cleanupResizeObserverAfterEach();

const getValue = (element: HTMLElement): number =>
  parseFloat(element.textContent || "");

function MainTest(
  props: Omit<ElementSizeOptions<HTMLElement>, "ref">
): ReactElement {
  const { height, width, elementRef } = useElementSize(props);

  return (
    <div data-testid="target" ref={elementRef}>
      <div data-testid="height">{height}</div>
      <div data-testid="width">{width}</div>
    </div>
  );
}

const renderMain = (options: ElementSizeOptions<HTMLElement> = {}) => {
  const observer = setupResizeObserverMock();
  render(<MainTest {...options} />);
  const target = screen.getByTestId("target");
  const height = screen.getByTestId("height");
  const width = screen.getByTestId("width");

  return { target, height, width, observer };
};

describe("useElementSize", () => {
  it("should default to a height and width of 0", () => {
    const elementSize: MutableRefObject<ElementSize | null> = {
      current: null,
    };

    function Test(): ReactElement {
      const { height, width, elementRef } = useElementSize();
      if (!elementSize.current) {
        elementSize.current = {
          height,
          width,
        };
      }

      return <div ref={elementRef} />;
    }

    render(<Test />);
    expect(elementSize.current).toEqual({
      height: 0,
      width: 0,
    });
  });

  it("should merge a ref correctly", () => {
    const ref = createRef<HTMLDivElement>();
    function Test(): ReactElement {
      const { elementRef } = useElementSize({ ref });

      return <div data-testid="div" ref={elementRef} />;
    }

    render(<Test />);
    expect(ref.current).toBe(screen.getByTestId("div"));
  });

  it("should update the height and width correctly", () => {
    const { target, height, width, observer } = renderMain();

    expect(getValue(height)).toBe(0);
    expect(getValue(width)).toBe(0);

    act(() => {
      observer.resizeElement(target, {
        height: 300,
        width: 200,
      });
    });

    expect(getValue(height)).toBe(300);
    expect(getValue(width)).toBe(200);
  });

  it("support not updating when the height changes and the disableHeight is true", () => {
    const { target, height, width, observer } = renderMain({
      disableHeight: true,
    });

    expect(getValue(height)).toBe(0);
    expect(getValue(width)).toBe(0);

    act(() => {
      observer.resizeElement(target, {
        height: 300,
        width: 200,
      });
    });

    expect(getValue(height)).toBe(300);
    expect(getValue(width)).toBe(200);

    act(() => {
      observer.resizeElement(target, {
        height: 600,
        width: 200,
      });
    });

    expect(getValue(height)).toBe(300);
    expect(getValue(width)).toBe(200);
  });

  it("support not updating when the width changes and the disableWidth is true", () => {
    const { target, height, width, observer } = renderMain({
      disableWidth: true,
    });

    expect(getValue(height)).toBe(0);
    expect(getValue(width)).toBe(0);

    act(() => {
      observer.resizeElement(target, {
        height: 300,
        width: 200,
      });
    });

    expect(getValue(height)).toBe(300);
    expect(getValue(width)).toBe(200);

    act(() => {
      observer.resizeElement(target, {
        height: 300,
        width: 800,
      });
    });

    expect(getValue(height)).toBe(300);
    expect(getValue(width)).toBe(200);
  });

  it("should allow for a defaultValue", () => {
    const elementSize: MutableRefObject<ElementSize | null> = {
      current: null,
    };

    function Test(): ReactElement {
      const { height, width, elementRef } = useElementSize({
        defaultValue: () => ({
          height: 300,
          width: 200,
        }),
      });
      if (!elementSize.current) {
        elementSize.current = {
          height,
          width,
        };
      }

      return <div ref={elementRef} />;
    }
    render(<Test />);

    expect(elementSize.current).toEqual({
      height: 300,
      width: 200,
    });
  });
});
