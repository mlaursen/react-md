import { IntersectionObserverMock } from "../mocks/IntersectionObserver.js";

if (
  typeof window !== "undefined" &&
  typeof IntersectionObserver === "undefined"
) {
  window.IntersectionObserver = IntersectionObserverMock;
}
