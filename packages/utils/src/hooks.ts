import { useEffect } from "react";

import { Maybe } from "./types.d";

/**
 * A hook that to attach a window event listener when a component mounts and
 * then remove it when the component unmounts.
 *
 * The default behavior is to ONLY run the effect phases on component mount and
 * unmount. You can provide a list of values that will trigger the effect phases
 * when their values change.
 */
export function useEventListener<K extends keyof WindowEventMap>(
  type: K,
  handler: (event: WindowEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
  update: any[] = [false]
) {
  return useEffect(() => {
    window.addEventListener(type, handler, options);

    return () => {
      window.removeEventListener(type, handler, options);
    };
  }, update);
}

/**
 * A hook to automatically trigger a hide function when an element outside of
 * the container element has been clicked. It is also possible to apply a list
 * of additional elements that should be ignored for this outside click
 * behavior if they implement their own click behavior that might conflict
 * with this hook.
 *
 * This hook will not be initialized until the provided container element
 */
export function useHideOnOutsideClick(
  container: Maybe<HTMLElement>,
  onRequestHide: () => void,
  ignore: Maybe<HTMLElement>[] = []
) {
  const hide = (event: MouseEvent) => {
    const target = event.target as HTMLElement | null;
    if (
      !target ||
      !container ||
      (!ignore.includes(target) && !container.contains(target))
    ) {
      onRequestHide();
    }
  };

  return useEventListener("click", hide, true, [container, ...ignore]);
}
