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
