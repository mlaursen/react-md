if (
  typeof window !== "undefined" &&
  typeof window.IntersectionObserver === "undefined"
) {
  window.ResizeObserver = class ResizeObserver
    implements globalThis.ResizeObserver
  {
    frame: number;
    elements: Set<Element>;

    constructor(public callback: ResizeObserverCallback) {
      this.frame = 0;
      this.elements = new Set();
    }

    observe(target: Element): void {
      this.elements.add(target);

      window.cancelAnimationFrame(this.frame);
      this.frame = window.requestAnimationFrame(() => {
        const entries = [...this.elements].map<ResizeObserverEntry>(
          (target) => ({
            target,
            contentRect: target.getBoundingClientRect(),
            borderBoxSize: [],
            contentBoxSize: [],
            devicePixelContentBoxSize: [],
          })
        );
        this.callback(entries, this);
      });
    }

    unobserve(target: Element): void {
      this.elements.delete(target);
    }

    disconnect(): void {
      this.elements.clear();
    }
  };
}
