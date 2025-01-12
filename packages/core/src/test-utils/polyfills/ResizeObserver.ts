import { ResizeObserverMock } from "../mocks/ResizeObserver.js";

if (typeof window !== "undefined" && typeof ResizeObserver === "undefined") {
  window.ResizeObserver = ResizeObserverMock;
}
