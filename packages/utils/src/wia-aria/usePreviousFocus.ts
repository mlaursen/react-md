import { useEffect, useRef } from "react";

/**
 * This can either be a query selector string, a specific HTMLElement, or a
 * function that finds a specific HTMLElement to focus.
 */
export type FocusFallback =
  | string
  | HTMLElement
  | (() => HTMLElement | null)
  | null
  | undefined;

/**
 * This hook is used to focus the previous element when a component unmounts.
 * The default behavior is to store the current activeElement within the
 * document when the component mounts and then try to focus it again when the
 * component unmounts.  You can also provide your own HTMLElement to focus when
 * unmounting.
 *
 * During the unmount phase, it will wait for an animation frame before checking
 * if the fallback element still exists within the page. If it doesn't, it will
 * use the fallback query/element/function to attempt to find another element to
 * focus. If the element exists within the page, it will then finally be
 * focused.
 *
 * The animation frame is unfortunately required for keyboard users as pressing
 * enter key will click the previous element immediately on focus as well.
 *
 * @param disabled - Boolean if the focus behavior should be disabled.
 * @param fallback - The fallback query, element, or function to use if the
 * previous element no longer exists in the DOM.
 * @param previousElement - An optional previous element to focus. If this is
 * omitted, the `document.activeElement` will be used instead.
 */
export function usePreviousFocus(
  disabled: boolean,
  fallback: FocusFallback = undefined,
  previousElement: HTMLElement | null = null
): void {
  const options = useRef({
    disabled,
    fallback,
  });

  useEffect(() => {
    options.current = {
      disabled,
      fallback,
    };
  });

  useEffect(() => {
    if (disabled) {
      return;
    }

    const element = previousElement || (document.activeElement as HTMLElement);

    // i'll need to think of a better way to handle this flow. There's just a
    // weird one where if going from a menu to a dialog, we get lost without
    // specifying a fallback. So if we are in a menu, try to find the
    // corresponding menu button for this flow to fallback to.
    const menu = element.closest('[role="menu"]');
    let menuButton: HTMLElement | null = null;
    if (menu) {
      // first try to get the button by using the menu's id minus the trailing
      // -menu since that's the normal pattern within react-md.
      menuButton = document.getElementById(menu.id.replace(/-menu$/, ""));
      if (!menuButton) {
        // if no menu button, try to see if the `aria-labelledby` points to the
        // button... but since the `aria-labelledby` is a space-deliminated
        // string of ids, have to check each one
        const labelledBy = menu.getAttribute("aria-labelledby") || "";
        const query = labelledBy
          .split(" ")
          .map((id) => `#${id}[tabindex]`)
          .join(",");

        menuButton = query ? document.querySelector<HTMLElement>(query) : null;
      }
    }

    return () => {
      const { fallback, disabled } = options.current;
      if (disabled) {
        // this has been added just for support for scrolling menus out of view.
        // It is not ideal since keyboard focus is lost at this point, but
        // _technically_ shouldn't be able to reach this flow with keyboard
        // movement
        return;
      }

      if (
        menu &&
        menuButton &&
        !previousElement &&
        !fallback &&
        !document.contains(element) &&
        document.contains(menuButton)
      ) {
        menuButton.focus();
        return;
      }

      let el: HTMLElement | null = element;
      if (!document.contains(el)) {
        el =
          previousElement && document.contains(previousElement)
            ? previousElement
            : null;
      }

      if (!el && fallback) {
        switch (typeof fallback) {
          case "string":
            el = document.querySelector<HTMLElement>(fallback);
            break;
          case "function":
            el = fallback();
            break;
          default:
            el = fallback;
        }
      }

      if (el && !document.contains(el)) {
        el = null;
      }

      if (el) {
        el.focus();
      }
    };
    // disabled since useRefCache and don't wnt to update on disabled change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
