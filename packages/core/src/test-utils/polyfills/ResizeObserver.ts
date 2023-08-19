import { ResizeObserverMock } from "../ResizeObserver.js";

if (typeof window !== "undefined" && typeof ResizeObserver === "undefined") {
  window.ResizeObserver = ResizeObserverMock;
}
