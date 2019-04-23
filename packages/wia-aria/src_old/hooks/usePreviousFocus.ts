import { useMemo } from "react";

/**
 * An extremely simple hook that is used to store the previous focused
 * element in the page when the save flag is togged to true.
 *
 * This is extremely useful when you need to create temporary elements like:
 * - menus
 * - dialogs
 * - alertdialogs
 *
 * so that once they are closed, keyboard focus isn't lost and the previous
 * element can be focused instead.
 *
 * @param save Boolean if the previous focus should be set
 * @return null when disabled or the previous active HTML element
 */
export default function usePreviousFocus(save: boolean) {
  return useMemo(() => {
    if (!save) {
      return null;
    }

    return document.activeElement as HTMLElement;
  }, [save]);
}
