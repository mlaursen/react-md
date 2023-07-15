import { IntersectionObserverMock } from "../IntersectionObserver";

if (
  typeof window !== "undefined" &&
  typeof IntersectionObserver === "undefined"
) {
  window.IntersectionObserver = IntersectionObserverMock;
}
