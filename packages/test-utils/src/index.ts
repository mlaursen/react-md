export class MockedIntersectionObserver implements IntersectionObserver {
  root: Document | Element | null;
  rootMargin: string;
  thresholds: readonly number[];

  elements: Set<Element>;

  constructor(
    public callback: IntersectionObserverCallback,
    options: IntersectionObserverInit = {},
    public getMockEntry: (
      mockEntry: IntersectionObserverEntry
    ) => IntersectionObserverEntry
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

    this.trigger();
  }

  unobserve(target: Element): void {
    this.elements.delete(target);
  }

  takeRecords = (): IntersectionObserverEntry[] => {
    const rect = document.body.getBoundingClientRect();
    return [...this.elements].map<IntersectionObserverEntry>((target) =>
      this.getMockEntry({
        time: Date.now(),
        target,
        boundingClientRect: rect,
        intersectionRatio: 0,
        intersectionRect: rect,
        isIntersecting: false,
        rootBounds: null,
      })
    );
  };

  disconnect(): void {
    this.elements.clear();
  }

  trigger = (): void => {
    this.callback(this.takeRecords(), this);
  };
}
