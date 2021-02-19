import { HTMLAttributes, useCallback } from "react";
import { useRefCache } from "@react-md/utils";

import { FocusType, useVisibility, VisibilityOptions } from "./useVisibility";

export interface ButtonVisibilityOptions extends VisibilityOptions {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>;
}

interface ReturnValue
  extends Required<
    Pick<HTMLAttributes<HTMLButtonElement>, "onClick" | "onKeyDown">
  > {
  visible: boolean;
  defaultFocus: FocusType;
  hide: () => void;
}

/**
 * This hook is used to provide the menu visibility based on interacting with
 * the `MenuButton` component. It'll merge and return the required `onClick` and
 * `onKeyDown` event handlers that should be passed down to the `MenuButton` as
 * well as the current visibility state and a `hide` function to pass to the
 * `Menu`.
 *
 * @internal
 */
export function useButtonVisibility({
  onClick: propOnClick,
  onKeyDown: propOnKeyDown,
  defaultVisible,
  defaultFocus: propDefaultFocus,
  onVisibilityChange,
}: ButtonVisibilityOptions = {}): ReturnValue {
  const handlers = useRefCache({
    onClick: propOnClick,
    onKeyDown: propOnKeyDown,
  });
  const { visible, defaultFocus, hide, showWithFocus, toggle } = useVisibility({
    defaultVisible,
    defaultFocus: propDefaultFocus,
    onVisibilityChange,
  });

  const onClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const { onClick } = handlers.current;
      if (onClick) {
        onClick(event);
      }

      toggle();
    },
    // disabled since useRefCache
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [toggle]
  );

  const onKeyDown = useCallback(
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
        // no default
      }
    },
    // disabled since useRefCache
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [showWithFocus]
  );

  return {
    visible,
    defaultFocus,
    hide,
    onClick,
    onKeyDown,
  };
}
