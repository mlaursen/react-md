import { useNestedDialogContext } from "./NestedDialogContext";
import { useEffect, useMemo } from "react";

interface Options {
  id: string;
  visible: boolean;
  disabled: boolean;
  disableEscapeClose: boolean;
}

/**
 * This hook is used to fix the nested overlays and the escape keypress when multiple
 * dialogs are rendered at the same time on a page. All it really does is keep a stack
 * of the dialog ids that are current visible. If there is more than 1 dialog visible
 * and the dialog is not at the top of the stack, the overlay and escape keypress will
 * be disabled.
 */
export default function useNestedDialogFixes({
  id,
  visible,
  disabled,
  disableEscapeClose: propDisableEscapeClose,
}: Options) {
  const { add, remove, stack } = useNestedDialogContext();
  useEffect(() => {
    if (disabled || !visible) {
      return;
    }

    add(id);
    return () => {
      remove(id);
    };
  }, [visible, disabled, id, add, remove]);

  return useMemo(() => {
    let disableOverlay = false;
    let disableEscapeClose = propDisableEscapeClose;
    if (!disabled && visible && stack.length > 1) {
      const lastIndex = stack.length - 1;
      const i = stack.findIndex(dialogId => id === dialogId);
      disableOverlay = i < lastIndex;
      if (!propDisableEscapeClose) {
        disableEscapeClose = i < lastIndex;
      }
    }

    return {
      disableOverlay,
      disableEscapeClose,
    };
  }, [disabled, visible, stack]);
}
