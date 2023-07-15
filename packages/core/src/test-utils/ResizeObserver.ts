export type GetResizeObserverEntryMock = (
  target: Element
) => ResizeObserverEntry;

export const defaultGetResizeObserverEntryMock: GetResizeObserverEntryMock = (
  target
) => {
  const contentRect = target.getBoundingClientRect();
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

export class ResizeObserverMock implements ResizeObserver {
  frame: number;
  elements: Set<Element>;

  constructor(public callback: ResizeObserverCallback) {
    this.frame = 0;
    this.elements = new Set();
  }

  observe = (target: Element): void => {
    this.elements.add(target);

    window.cancelAnimationFrame(this.frame);
    window.requestAnimationFrame(() => {
      const entries = [...this.elements].map<ResizeObserverEntry>((target) =>
        defaultGetResizeObserverEntryMock(target)
      );
      this.callback(entries, this);
    });
  };

  unobserve = (target: Element): void => {
    this.elements.delete(target);
  };

  disconnect = (): void => {
    this.elements.clear();
  };

  resizeElement = (
    target: Element,
    getEntry = defaultGetResizeObserverEntryMock
  ): void => {
    if (!this.elements.has(target)) {
      throw new Error(
        "The `ResizeObserverMock` is not watching the target element and cannot be resized"
      );
    }

    this.callback([getEntry(target)], this);
  };
}
