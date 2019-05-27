import { useCallback } from "react";
import { useRefCache } from "@react-md/utils";

interface MenuClickOptions {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onRequestClose: () => void;
}

/**
 * This hook is used to create a click handler on the menu that will
 * close the menu when any `MenuItem` is clicked.
 */
export default function useMenuClick({
  onClick,
  onRequestClose,
}: MenuClickOptions) {
  const cache = useRefCache({ onClick, onRequestClose });

  return useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const { onClick, onRequestClose } = cache.current;
    if (onClick) {
      onClick(event);
    }

    if (event.currentTarget !== event.target) {
      onRequestClose();
    }
  }, []);
}
