import { afterEach, jest } from "@jest/globals";
import {
  resizeObserverManager,
  type ResizeObserverManager,
} from "../useResizeObserver.js";

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
 * This is the default ResizeObserver implementation if it does not already
 * exist in jsdom. You normally should not use this directly and instead use the
 * {@link setupResizeObserverMock} instead.
 *
 * @since 6.0.0
 */
export class ResizeObserverMock implements ResizeObserver {
  elements: Set<Element>;

  constructor(public callback: ResizeObserverCallback) {
    this.elements = new Set();
  }

  observe = (target: Element): void => {
    this.elements.add(target);
    this.resizeAllElements(createResizeObserverEntry);
  };

  unobserve = (target: Element): void => {
    this.elements.delete(target);
  };

  disconnect = (): void => {
    this.elements.clear();
  };

  /**
   * Triggers the resize event for a specific element. This must be wrapped in
   * `act`.
   *
   * @example Main Usage
   * ```tsx
   * import {
   *   cleanupResizeObserverAfterEach,
   *   setupResizeObserverMock,
   * } from "@react-md/core/test-utils";
   * import { useResizeObserver } from "@react-md/core";
   * import { ExampleComponent } from "../ExampleComponent.js";
   *
   * cleanupResizeObserverAfterEach();
   *
   * describe("ExampleComponent", () => {
   *   it("should do stuff", () => {
   *     const observer = setupResizeObserverMock();
   *     render(<ExampleComponent />)
   *
   *     const resizeTarget = screen.getByTestId("resize-target")
   *
   *     // you can trigger with a custom change
   *     act(() => {
   *       observer.resizeElement(resizeTarget, { height: 100, width: 100 });
   *     });
   *     // expect resize changes
   *   });
   * })
   * ```
   */
  resizeElement = (
    target: Element,
    changesOrGetEntry:
      | GetResizeObserverEntryMock
      | ResizeObserverEntrySize
      | ResizeObserverEntry = createResizeObserverEntry
  ): void => {
    if (!this.elements.has(target)) {
      throw new Error(
        "The `ResizeObserverMock` is not watching the target element and cannot be resized"
      );
    }

    let entry: ResizeObserverEntry;
    if (typeof changesOrGetEntry === "function") {
      entry = changesOrGetEntry(target);
    } else if (!("contentRect" in changesOrGetEntry)) {
      entry = createResizeObserverEntry(target, changesOrGetEntry);
    } else {
      entry = changesOrGetEntry;
    }

    this.callback([entry], this);
  };

  /**
   * You'll normally want to use {@link resizeElement} instead, but this can be
   * used to resize all the watched elements at once.
   *
   * @example
   * ```tsx
   * import {
   *   act,
   *   createResizeObserverEntry,
   *   render,
   *   screen,
   *   setupResizeObserverMock,
   * } from "@react-md/core/test-utils";
   *
   * const observer = setupResizeObserverMock();
   * const { container } = render(<Test />)
   * expect(container).toMatchSnapshot()
   *
   * const target1 = screen.getByTestId('target-1');
   * const target2 = screen.getByTestId('target-2');
   * const target3 = screen.getByTestId('target-3');
   *
   * act(() => {
   *   observer.resizeAllElements((element) => {
   *     let height: number | undefined;
   *     let width: number | undefined;
   *     switch (element) {
   *       case target1:
   *         height = 400;
   *         width = 250;
   *         break;
   *       case target2:
   *         height = 100;
   *         width = 380;
   *         break;
   *       case target3:
   *         height = 24;
   *         width = 24;
   *         break;
   *     }
   *
   *     return createResizeObserverEntry(element, { height, width });
   *   });
   * });
   * expect(container).toMatchSnapshot()
   * ```
   */
  resizeAllElements = (getEntry = createResizeObserverEntry): void => {
    const entries = [...this.elements].map((element) => getEntry(element));
    this.callback(entries, this);
  };
}

/**
 * @since 6.0.0
 */
export interface SetupResizeObserverMockOptions {
  /**
   * Set this to `true` to mimic the real `ResizeObserver` behavior where the
   * updates occur after an animation frame instead of invoking immediately.
   *
   * Keeping this as `false` is recommended since this option was only added to
   * make testing this function itself easier.
   *
   * @defaultValue `false`
   */
  raf?: boolean;

  /**
   * Keeping this as the `resizeObserverManager` is recommended since this
   * option was only added to make testing this function easier itself.
   *
   * @defaultValue `resizeObserverManager`
   */
  manager?: ResizeObserverManager;
}

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
      jest.restoreAllMocks();
    }
  });
}
