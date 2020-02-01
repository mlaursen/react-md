import { useEffect } from "react";

import focusElementWithin, { Focus } from "./focusElementWithin";
import getInstance, { RefOrInstance } from "./getInstance";

/**
 * This hook is used to focus an element once a component has mounted. To help
 * with keyboard click events, it will actually wait for an animation frame
 * before attempting to focus as an enter key might click both elements at the
 * same time.
 *
 * This hook will first focus the HTMLElement (if it is focusable) and then
 * focus an element based on the defaultFocus prop.
 *
 * @param refOrInstance This is either a ref object containing the element to
 * focus or the element itself.
 * @param defaultFoucs The element to focus within the containing element once
 * it has been mounted. This can either be "first" or "last" to focus the first
 * or last focusable elements or a query selector string to find an element to
 * focus.
 * @param programatic Boolean if programatically focusable elements should be
 * included instead of only tab focusable.
 * @param disabled Boolean if the focus behavior should be disabled.
 */
export default function useFocusOnMount(
  refOrInstance: RefOrInstance,
  defaultFocus: Focus,
  programatic: boolean = false,
  disabled: boolean = false
): void {
  useEffect(() => {
    if (disabled) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      const instance = getInstance(refOrInstance);
      if (!instance) {
        return;
      }

      instance.focus();
      focusElementWithin(instance, defaultFocus, programatic);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
    // disabled since useRefCache and only want a mount effect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
