import { useCallback } from "react";
import { useRefCache } from "@react-md/utils";

interface MenuClickOptions {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onRequestClose: () => void;
}

/**
 * This hook is used to create a click handler on the menu that will close the
 * menu when any `MenuItem` is clicked.
 */
export function useMenuClick({
  onClick,
  onRequestClose,
}: MenuClickOptions): React.MouseEventHandler<HTMLDivElement> {
  const cache = useRefCache({ onClick, onRequestClose });

  return useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const { onClick, onRequestClose } = cache.current;
    if (onClick) {
      onClick(event);
    }

    const target = event.target as HTMLElement;
    if (
      !target ||
      (event.currentTarget !== target && !target.closest("[aria-haspopup]"))
    ) {
      onRequestClose();
    }
    // disabled since useRefCache
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
