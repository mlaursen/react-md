import { ResizeObserverMock } from "../ResizeObserver";

if (typeof window !== "undefined" && typeof ResizeObserver === "undefined") {
  window.ResizeObserver = ResizeObserverMock;
}
