import { afterEach, vi } from "vitest";
import { resizeObserverManager } from "../../useResizeObserver.js";
import {
  type SetupResizeObserverMockOptions,
  ResizeObserverMock,
} from "../mocks/ResizeObserver.js";

/**
 * Initializes the `ResizeObserverMock` to be used for tests.
 *
 * @example Main Usage
 * ```tsx
 * import { render, screen } from "@react-md/core/test-utils";
 * import {
 *   cleanupResizeObserverAfterEach,
 *   setupResizeObserverMock,
 * } from "test-utils/jest-globals";
 * import { useResizeObserver } from "@react-md/core/useResizeObserver";
 * import { useCallback, useState } from "react";
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
 * cleanupResizeObserverAfterEach();
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
export function cleanupResizeObserverAfterEach(restoreAllMocks = true): void {
  afterEach(() => {
    resizeObserverManager.frame = 0;
    resizeObserverManager.subscriptions = new Map();
    resizeObserverManager.sharedObserver = undefined;

    if (restoreAllMocks) {
      vi.restoreAllMocks();
    }
  });
}
