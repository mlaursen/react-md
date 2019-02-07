import { useEffect } from "react";
import { Maybe } from "@react-md/utils";

type ScrollElement = Maybe<HTMLElement>;

function reset(el: ScrollElement) {
  if (!el) {
    return;
  }

  if (el.style.position !== "fixed") {
    return;
  }

  const scrollTop = Math.abs(parseInt(el.style.top || "", 10));
  el.style.left = "";
  el.style.right = "";
  el.style.top = "";
  el.style.overflow = "";
  el.style.position = "";

  if (el === document.body) {
    window.scrollTo(0, scrollTop);
  } else {
    el.scrollTop = scrollTop;
  }
}

export default function useScrollLock(
  enabled: boolean,
  selector?: string | HTMLElement | null
) {
  useEffect(() => {
    let el: Maybe<HTMLElement> = null;
    if (typeof selector === "string") {
      el = document.querySelector(selector);
    } else if (selector) {
      el = selector;
    } else {
      el = document.body;
    }

    if (!el) {
      return;
    }

    if (enabled) {
      const offset = el === document.body ? window.pageYOffset : el.scrollTop;
      el.style.left = "0";
      el.style.right = "0";
      el.style.top = `-${offset}px`;
      el.style.overflow = "hidden";
      el.style.position = "fixed";
    }

    return () => {
      reset(el);
    };
  }, [enabled, selector]);
}
