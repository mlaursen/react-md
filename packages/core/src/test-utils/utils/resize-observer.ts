import { resizeObserverManager } from "../../useResizeObserver.js";
import {
  ResizeObserverMock,
  type SetupResizeObserverMockOptions,
} from "../mocks/ResizeObserver.js";

/**
 * @since 6.0.0
 */
export interface ResizeObserverEntrySize {
  height?: number;
  width?: number;
}

/**
 * @since 6.0.0
 */
export type GetResizeObserverEntryMock = (
  target: Element,
  size?: ResizeObserverEntrySize
) => ResizeObserverEntry;

/**
 * This is mostly an internal function to be used with the {@link ResizeObserverMock}
 * and {@link setupResizeObserverMock}
 *
 * @since 6.0.0
 */
export const createResizeObserverEntry: GetResizeObserverEntryMock = (
  target,
  size
) => {
  const contentRect = target.getBoundingClientRect();
  if (typeof size?.height === "number") {
    contentRect.height = size.height;
  }
  if (typeof size?.width === "number") {
    contentRect.width = size.width;
  }

  const boxSize: ResizeObserverSize = {
    blockSize: contentRect.height,
    inlineSize: contentRect.width,
  };

  return {
    target,
    contentRect,
    borderBoxSize: [boxSize],
    contentBoxSize: [boxSize],
    devicePixelContentBoxSize: [],
  };
};

/**
 * Initializes the `ResizeObserverMock` to be used for tests.
 *
 * @example Main Usage
 * ```tsx
 * import {
 *   cleanupResizeObserverAfterEach,
 *   render,
 *   screen,
 *   setupResizeObserverMock,
 * } from "@react-md/core/test-utils";
 * import { useResizeObserver } from "@react-md/core/useResizeObserver";
 * import { useCallback, useState } from "react";
 *
 * // choose your test framework
 * import { afterEach, jest } from "@jest/globals";
 * cleanupResizeObserverAfterEach(afterEach, jest.restoreAllMocks);
 *
 * import { afterEach, vitest } from "vitest";
 * cleanupResizeObserverAfterEach(afterEach, vitest.restoreAllMocks);
 *
 * function ExampleComponent() {
 *   const [size, setSize] = useState({ height: 0, width: 0 });
 *   const ref = useResizeObserver({
 *     onUpdate: useCallback((entry) => {
 *       setSize({
 *         height: entry.contentRect.height,
 *         width: entry.contentRect.width,
 *       });
 *     }, []),
 *   });
 *
 *   return (
 *     <>
 *       <div data-testid="size">{JSON.stringify(size)}</div>
 *       <div data-testid="resize-target" ref={ref} />
 *     </>
 *   );
 * }
 *
 * describe("ExampleComponent", () => {
 *   it("should do stuff", () => {
 *     const observer = setupResizeObserverMock();
 *     render(<ExampleComponent />);
 *
 *     const size = screen.getByTestId("size");
 *     const resizeTarget = screen.getByTestId("resize-target");
 *
 *     // jsdom sets all element sizes to 0 by default
 *     expect(size).toHaveTextContent(JSON.stringify({ height: 0, width: 0 }));
 *
 *     // you can trigger with a custom change
 *     act(() => {
 *       observer.resizeElement(resizeTarget, { height: 100, width: 100 });
 *     });
 *     expect(size).toHaveTextContent(JSON.stringify({ height: 100, width: 100 }));
 *
 *     // or you can mock the `getBoundingClientRect` result
 *     jest.spyOn(resizeTarget, "getBoundingClientRect").mockReturnValue({
 *       ...document.body.getBoundingClientRect(),
 *       height: 200,
 *       width: 200,
 *     });
 *
 *     act(() => {
 *       observer.resizeElement(resizeTarget);
 *     });
 *     expect(size).toHaveTextContent(JSON.stringify({ height: 200, width: 200 }));
 *   });
 * });
 * ```
 *
 * @since 6.0.0
 */
export function setupResizeObserverMock(
  options: SetupResizeObserverMockOptions = {}
): ResizeObserverMock {
  const { raf, manager = resizeObserverManager } = options;

  const resizeObserver = new ResizeObserverMock((entries) => {
    if (raf) {
      window.cancelAnimationFrame(manager.frame);
      manager.frame = window.requestAnimationFrame(() => {
        manager.handleResizeEntries(entries);
      });
    } else {
      manager.handleResizeEntries(entries);
    }
  });
  manager.sharedObserver = resizeObserver;
  return resizeObserver;
}

/**
 * @see {@link setupResizeObserverMock}
 * @since 6.0.0
 */
export function cleanupResizeObserverAfterEach(
  afterEach: (callback: () => void) => void,
  restoreAllMocks: () => void = () => {}
): void {
  afterEach(() => {
    resizeObserverManager.frame = 0;
    resizeObserverManager.subscriptions = new Map();
    resizeObserverManager.sharedObserver = undefined;
    restoreAllMocks();
  });
}
