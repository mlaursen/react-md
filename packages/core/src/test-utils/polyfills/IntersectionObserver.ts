import { IntersectionObserverMock } from "../IntersectionObserver.js";

if (
  typeof window !== "undefined" &&
  typeof IntersectionObserver === "undefined"
) {
  window.IntersectionObserver = IntersectionObserverMock;
}
