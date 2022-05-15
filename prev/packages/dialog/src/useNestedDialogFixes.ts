import { useEffect, useMemo } from "react";

import { useNestedDialogContext } from "./NestedDialogContext";

interface Options {
  id: string;
  visible: boolean;
  disabled: boolean;
  disableEscapeClose: boolean;
}

interface ReturnValue {
  disableOverlay: boolean;
  disableEscapeClose: boolean;
}

/**
 * This hook is used to fix the nested overlays and the escape keypress when
 * multiple dialogs are rendered at the same time on a page. All it really does
 * is keep a stack of the dialog ids that are current visible. If there is more
 * than 1 dialog visible and the dialog is not at the top of the stack, the
 * overlay and escape keypress will be disabled.
 *
 * NOTE: This will not work if you nest dialogs together and have them become
 * visible at the same time because the ids will get added from child to parent
 * instead of parent -&gt; child. This flow shouldn't really happen though so it
 * isn't planned on being fixed.
 */
export function useNestedDialogFixes({
  id,
  visible,
  disabled,
  disableEscapeClose: propDisableEscapeClose,
}: Options): ReturnValue {
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
      const i = stack.findIndex((dialogId) => id === dialogId);
      disableOverlay = i < lastIndex;
      if (!propDisableEscapeClose) {
        disableEscapeClose = i < lastIndex;
      }
    }

    return {
      disableOverlay,
      disableEscapeClose,
    };
  }, [id, propDisableEscapeClose, disabled, visible, stack]);
}
