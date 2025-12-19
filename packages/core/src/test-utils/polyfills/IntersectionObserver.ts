import { IntersectionObserverMock } from "../mocks/IntersectionObserver.js";

if (
  globalThis.window !== undefined &&
  typeof IntersectionObserver === "undefined"
) {
  globalThis.IntersectionObserver = IntersectionObserverMock;
}
