import { Maybe } from "../types.d";
import useEventListener from "./useEventListener";

/**
 * A hook to automatically trigger a hide function when an element outside of
 * the container element has been clicked. It is also possible to apply a list
 * of additional elements that should be ignored for this outside click
 * behavior if they implement their own click behavior that might conflict
 * with this hook.
 *
 * This hook will not be initialized until the provided container element
 */
export default function useHideOnOutsideClick(
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

  return useEventListener("click", hide, {
    capture: true,
    shouldUpdate: [container, ...ignore],
  });
}
