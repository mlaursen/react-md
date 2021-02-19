import { useCallback, useRef, useState } from "react";

export type FocusType = "first" | "last";

export interface VisibilityState {
  visible: boolean;
  defaultFocus: FocusType;
}

export interface VisibilityOptions {
  defaultVisible?: boolean;
  defaultFocus?: FocusType;
  onVisibilityChange?: (visible: boolean) => void;
}

interface ReturnValue {
  visible: boolean;
  defaultFocus: FocusType;
  show: () => void;
  showWithFocus: (defaultFocus: FocusType) => void;
  hide: () => void;
  toggle: () => void;
}

/**
 * This is the main visibility hook to be used for the `DropdownMenu` and
 * `DropdownMenuItem` components. It'll provide the current visibility as well
 * as the default focus type once the menu becomes visible.
 *
 * @internal
 */
export function useVisibility({
  defaultVisible = false,
  defaultFocus: defaultFocusValue = "first",
  onVisibilityChange,
}: VisibilityOptions = {}): ReturnValue {
  const [{ visible, defaultFocus }, setState] = useState<VisibilityState>({
    visible: defaultVisible,
    defaultFocus: defaultFocusValue,
  });
  const prevVisible = useRef(visible);
  if (prevVisible.current !== visible) {
    prevVisible.current = visible;
    if (onVisibilityChange) {
      onVisibilityChange(visible);
    }
  }

  /**
   * A callback to use that allows you to provide a string for if the focus
   * target should be the "first" or "last" focusable element in the menu.  This
   * should be "first" for all cases except when the control opens the menu with
   * an arrow up key event.
   */
  const showWithFocus = useCallback((defaultFocus: FocusType) => {
    setState({ visible: true, defaultFocus });
  }, []);

  /**
   * The default implementation of showing the menu that will focus the first
   * menu item once visible.
   */
  const show = useCallback(() => {
    showWithFocus("first");
  }, [showWithFocus]);

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

  return {
    visible,
    defaultFocus,
    show,
    showWithFocus,
    hide,
    toggle,
  };
}
