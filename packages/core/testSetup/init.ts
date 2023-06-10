import {
  DEFAULT_DESKTOP_LARGE_MIN_WIDTH,
  DEFAULT_DESKTOP_MIN_WIDTH,
} from "../src/AppSizeProvider";
import "@testing-library/jest-dom/extend-expect";

// window will be undefined for the one test I force to be run in node instead
// of jsdom
if (typeof window !== "undefined") {
  if (typeof window.matchMedia !== "function") {
    const noop = (): void => {
      // do nothing
    };
    window.matchMedia = (query) => ({
      media: query,
      matches:
        query.includes(`${DEFAULT_DESKTOP_MIN_WIDTH}`) ||
        query.includes(`${DEFAULT_DESKTOP_LARGE_MIN_WIDTH}`),
      onchange: noop,
      addListener: noop,
      removeListener: noop,
      addEventListener: noop,
      removeEventListener: noop,
      dispatchEvent: () => false,
    });
  }

  // this is required for keyboard movement behavior
  if (typeof HTMLElement.prototype.scrollIntoView !== "function") {
    HTMLElement.prototype.scrollIntoView = () => {
      // do nothing
    };
  }
}

if (typeof ResizeObserver === "undefined") {
  // eslint-disable-next-line no-global-assign
  ResizeObserver = class ResizeObserver implements globalThis.ResizeObserver {
    elements: Set<Element>;

    constructor(public callback: ResizeObserverCallback) {
      this.elements = new Set();
    }

    observe(target: Element): void {
      this.elements.add(target);

      const entries = [...this.elements].map<ResizeObserverEntry>((target) => ({
        target,
        contentRect: target.getBoundingClientRect(),
        borderBoxSize: [],
        contentBoxSize: [],
        devicePixelContentBoxSize: [],
      }));
      this.callback(entries, this);
    }

    unobserve(target: Element): void {
      this.elements.delete(target);
    }

    disconnect(): void {
      this.elements.clear();
    }
  };
}

if (typeof IntersectionObserver === "undefined") {
  // eslint-disable-next-line no-global-assign
  IntersectionObserver = class IntersectionObserver
    implements globalThis.IntersectionObserver
  {
    root: Document | Element | null;
    rootMargin: string;
    thresholds: readonly number[];

    elements: Set<Element>;

    constructor(
      public callback: IntersectionObserverCallback,
      options: IntersectionObserverInit = {}
    ) {
      this.root = options.root || null;
      this.rootMargin = options.rootMargin || "";
      this.thresholds =
        typeof options.threshold === "number"
          ? [options.threshold]
          : options.threshold ?? [];

      this.elements = new Set();
    }

    observe(target: Element): void {
      this.elements.add(target);

      this.callback(this.takeRecords(), this);
    }

    unobserve(target: Element): void {
      this.elements.delete(target);
    }

    takeRecords(): IntersectionObserverEntry[] {
      return [...this.elements].map<IntersectionObserverEntry>((target) => ({
        time: Date.now(),
        target,
        boundingClientRect: target.getBoundingClientRect(),
        intersectionRatio: 0,
        intersectionRect: target.getBoundingClientRect(),
        isIntersecting: false,
        rootBounds:
          this.root && "getBoundingClientRect" in this.root
            ? this.root.getBoundingClientRect()
            : null,
      }));
    }

    disconnect(): void {
      this.elements.clear();
    }
  };
}
