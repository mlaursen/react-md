import { useCallback } from "react";
import { useRefCache } from "@react-md/utils";
import useVisibility, { VisibilityOptions } from "./useVisibility";

export interface ButtonVisibilityOptions extends VisibilityOptions {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>;
}

/**
 * This hook is used to provide the menu visibility based on interacting with
 * the `MenuButton` component. It'll merge and return the required `onClick`
 * and `onKeyDown` event handlers that should be passed down to the `MenuButton`
 * as well as the current visibility state and a `hide` function to pass to the
 * `Menu`.
 *
 * @private
 */
export default function useButtonVisibility({
  onClick,
  onKeyDown,
  defaultVisible,
  defaultFocus: propDefaultFocus,
  onVisibilityChange,
}: ButtonVisibilityOptions = {}) {
  const handlers = useRefCache({ onClick, onKeyDown });
  const { visible, defaultFocus, hide, showWithFocus, toggle } = useVisibility({
    defaultVisible,
    defaultFocus: propDefaultFocus,
    onVisibilityChange,
  });

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const { onClick } = handlers.current;
      if (onClick) {
        onClick(event);
      }

      toggle();
    },
    []
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      const { onKeyDown } = handlers.current;
      if (onKeyDown) {
        onKeyDown(event);
      }

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          showWithFocus("first");
          break;
        case "ArrowUp":
          event.preventDefault();
          showWithFocus("last");
          break;
      }
    },
    []
  );

  return {
    visible,
    defaultFocus,
    hide,
    onClick: handleClick,
    onKeyDown: handleKeyDown,
  };
}
