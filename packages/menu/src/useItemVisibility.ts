import { HTMLAttributes, useCallback } from "react";
import { useRefCache } from "@react-md/utils";

import { FocusType, useVisibility, VisibilityOptions } from "./useVisibility";

export interface ItemVisibilityOptions extends VisibilityOptions {
  horizontal?: boolean;
  onClick?: React.MouseEventHandler<HTMLLIElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLLIElement>;
}

interface ReturnValue
  extends Pick<HTMLAttributes<HTMLLIElement>, "onClick" | "onKeyDown"> {
  visible: boolean;
  defaultFocus: FocusType;
  hide: () => void;
}

export function useItemVisibility({
  horizontal = false,
  onClick: propOnClick,
  onKeyDown: propOnKeyDown,
  defaultVisible,
  defaultFocus: propDefaultFocus,
  onVisibilityChange,
}: ItemVisibilityOptions = {}): ReturnValue {
  const cache = useRefCache({
    horizontal,
    onClick: propOnClick,
    onKeyDown: propOnKeyDown,
  });
  const { visible, defaultFocus, hide, showWithFocus, toggle } = useVisibility({
    defaultVisible,
    defaultFocus: propDefaultFocus,
    onVisibilityChange,
  });

  const onClick = useCallback(
    (event: React.MouseEvent<HTMLLIElement>) => {
      const { onClick } = cache.current;
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
    (event: React.KeyboardEvent<HTMLLIElement>) => {
      const { onKeyDown, horizontal } = cache.current;
      if (onKeyDown) {
        onKeyDown(event);
      }

      const firstKey = horizontal ? "ArrowDown" : "ArrowRight";
      const lastKey = horizontal ? "ArrowUp" : "ArrowLeft";
      if (event.key !== firstKey && event.key !== lastKey) {
        return;
      }

      // don't want to trigger default behavior of screen scrolling
      event.preventDefault();

      // don't want parent menus to be effected by this as well.
      event.stopPropagation();
      showWithFocus(event.key === firstKey ? "first" : "last");
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
