export class IntersectionObserverMock implements IntersectionObserver {
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
}
