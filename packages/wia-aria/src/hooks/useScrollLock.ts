import { useEffect } from "react";
import { Maybe } from "@react-md/utils";

type ScrollElement = Maybe<HTMLElement>;

function isRootHtml(el: ScrollElement) {
  return el !== null && el.tagName === "HTML";
}

function reset(el: ScrollElement) {
  if (!el) {
    return;
  }

  const scrollTop = Math.abs(parseInt(el.style.top || "", 10));
  el.style.top = "";
  el.style.overflow = "";
  el.style.position = "";

  if (isRootHtml) {
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
    if (!selector || typeof selector === "string") {
      el = document.querySelector((selector as string) || "html");
    } else {
      el = selector;
    }

    if (!el) {
      return;
    }

    if (enabled) {
      const offset = isRootHtml(el) ? window.pageYOffset : el.scrollTop;
      console.log("widow.pageYOffset:", window.pageYOffset);
      console.log("el.scrollTop:", el.scrollTop);
      console.log("offset:", offset);
      // el.style.top = `-${offset}px`;
      // el.style.overflow = "hidden";
      // el.style.position = "fixed";
    }

    console.log("DOOP");
    return () => {
      console.log("RESET?");
      reset(el);
    };
  }, [enabled, selector]);
}
