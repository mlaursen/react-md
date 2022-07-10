import { useEffect } from "react";
import { getScrollbarWidth } from "./getScrollbarWidth";

export const SCROLLBAR_SIZE_VAR = "--rmd-scrollbar-size";

// this is really just so that nested dialogs will work correctly. Only the
// first created dialog should prevent scroll locking on the `document.body`
let isLocked = false;

/**
 *
 * @internal
 * @remarks
 * \@since 6.0.0 No longer support scroll locking elements other than
 * the `document.body` since it's more reliable to scroll lock with an overlay.
 * \@since 6.0.0 Now applies `paddingRight` equal to the current OS's
 * scrollbar width if there is a full page scrollbar to prevent layout shifting.
 *
 * @param locked - The `document.body` will not be scrollable when this is
 * `true`.
 */
export function useScrollLock(locked: boolean): void {
  useEffect(() => {
    if (isLocked || !locked) {
      return;
    }

    isLocked = true;

    const size = `${getScrollbarWidth()}px`;
    const el = document.body;
    const { paddingRight } = el.style;
    const isScrollbarVisible = el.scrollHeight > el.offsetHeight;

    el.style.overflow = "hidden";
    if (isScrollbarVisible) {
      el.style.setProperty(SCROLLBAR_SIZE_VAR, size);
      el.style.paddingRight = `var(${SCROLLBAR_SIZE_VAR})`;
    }

    return () => {
      isLocked = false;

      el.style.removeProperty(SCROLLBAR_SIZE_VAR);
      el.style.overflow = "";
      if (isScrollbarVisible) {
        el.style.paddingRight = paddingRight;
      }
    };
  }, [locked]);
}
