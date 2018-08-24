import { Middleware } from "redux";
import { LOCATION_CHANGE } from "connected-react-router";
import smoothScroll from "utils/smoothScroll";

function scroll() {
  const { hash } = window.location;
  if (!hash) {
    return window.scrollTo(0, 0);
  }

  const el = document.getElementById(hash.substring(1)) as HTMLElement;
  if (!el) {
    return;
  }

  let headerHeight = 0;
  const header = document.getElementById("main-header") as HTMLElement;
  if (header) {
    headerHeight = header.offsetHeight;
  }
  smoothScroll(el.offsetTop - headerHeight);
}

export const scrollingMiddleware: Middleware = (store) => (next) => (action) => {
  const { type, payload } = action;
  if (type === LOCATION_CHANGE) {
    window.requestAnimationFrame(scroll);
  }

  return next(action);
};
