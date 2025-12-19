import { ResizeObserverMock } from "../mocks/ResizeObserver.js";

if (globalThis.window !== undefined && typeof ResizeObserver === "undefined") {
  globalThis.ResizeObserver = ResizeObserverMock;
}
