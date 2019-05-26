import { useState, useCallback, useRef, HTMLAttributes } from "react";

type FocusType = "first" | "last";

interface State {
  visible: boolean;
  defaultFocus: FocusType;
}

interface Options
  extends Pick<HTMLAttributes<HTMLElement>, "onClick" | "onKeyDown"> {
  onVisibilityChange?: (visible: boolean) => void;
}

/**
 * This hook is used to add the base functionality for showing and hiding a menu.
 *
 * @param onKeyDown An optional keydown event handler to merge into the control's
 * keydown event handler.
 */
export default function useMenuState({
  onClick,
  onKeyDown,
  onVisibilityChange,
}: Options) {
  const [{ visible, defaultFocus }, setState] = useState<State>({
    visible: false,
    defaultFocus: "first",
  });
  const prevVisible = useRef(visible);
  if (prevVisible.current !== visible) {
    if (onVisibilityChange) {
      onVisibilityChange(visible);
    }

    prevVisible.current = visible;
  }

  /**
   * A callback to use that allows you to provide a string for if the focus
   * target should be the "first" or "last" focusable element in the menu.
   * This should be "first" for all cases except when the control opens
   * the menu with an arrow up key event.
   */
  const showDefaultFocus = useCallback((defaultFocus: FocusType) => {
    setState({ visible: true, defaultFocus });
  }, []);

  /**
   * The default implementation of showing the menu that will focus the first
   * menu item once visible.
   */
  const show = useCallback(() => {
    showDefaultFocus("first");
  }, []);

  /**
   * Hides the menu.
   */
  const hide = useCallback(() => {
    setState({ visible: false, defaultFocus: "first" });
  }, []);

  /**
   * Toggles the visibility of the menu.
   */
  const toggle = useCallback(() => {
    setState(({ visible, defaultFocus }) => ({
      visible: !visible,
      defaultFocus,
    }));
  }, []);

  /**
   * A keydown event handler that should be provided to the control element.
   * This will ensure that the up and down arrow keys can open the menu as
   * well as focusing the first and last menu item as needed.
   */
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      if (onKeyDown) {
        onKeyDown(event);
      }

      const { key } = event;
      switch (key) {
        case "ArrowUp":
          event.preventDefault();
          showDefaultFocus("last");
          break;
        case "ArrowDown":
          event.preventDefault();
          showDefaultFocus("first");
          break;
      }
    },
    [onKeyDown]
  );

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (onClick) {
        onClick(event);
      }

      toggle();
    },
    [onClick]
  );

  return {
    show,
    hide,
    toggle,
    showDefaultFocus,
    visible,
    defaultFocus,
    onClick: handleClick,
    onKeyDown: handleKeyDown,
  };
}
