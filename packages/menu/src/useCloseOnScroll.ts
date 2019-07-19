import { MutableRefObject, useCallback } from "react";
import { useRefCache } from "@react-md/utils";

interface CloseOnScrollOptions {
  menu: MutableRefObject<HTMLDivElement | null>;
  disabled: boolean;
  onRequestClose: () => void;
}

/**
 * This hook will automatically close the menu when an element
 * on the page is scrolled that is not within the menu.
 */
export default function useCloseOnScroll({
  menu,
  disabled,
  onRequestClose,
}: CloseOnScrollOptions): ((event: Event) => void) | undefined {
  const cache = useRefCache({ menu, onRequestClose });
  const handleScroll = useCallback((event: Event) => {
    const { menu, onRequestClose } = cache.current;
    if (
      !menu.current ||
      !event.target ||
      !menu.current.contains(event.target as HTMLElement)
    ) {
      onRequestClose();
    }
  }, []);

  return disabled ? undefined : handleScroll;
}
