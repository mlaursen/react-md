import type { ReactElement, RefObject } from "react";
import {
  ConditionalPortal,
  RenderConditionalPortalProps,
} from "@react-md/portal";
import {
  TransitionCallbacks,
  useFixedPositioning,
  useScaleTransition,
} from "@react-md/transition";
import { TOP_INNER_RIGHT_ANCHOR } from "@react-md/utils";

import { KeyboardFocusProvider } from "./KeyboardFocusProvider";
import { MenuWidgetProps, MenuWidget } from "./MenuWidget";

/**
 * @remarks \@since 4.0.0
 */
export interface MenuProps
  extends MenuWidgetProps,
    RenderConditionalPortalProps,
    TransitionCallbacks {
  menuRef: RefObject<HTMLElement>;
  toggleRef: RefObject<HTMLElement>;
  visible: boolean;

  /**
   * Boolean if the `toggleRef` should not be focused once the menu is closed if
   * a MenuItem's action was to focus another element on the page. This should
   * generally be kept at `false` for keyboard accessibility.
   *
   * @defaultValue `false`
   */
  disableToggleFocus?: boolean;
}

export function Menu({
  portal = true,
  portalInto,
  portalIntoId,
  style: propStyle,
  className,
  menuRef,
  toggleRef,
  visible,
  onEnter,
  onEntering,
  onEntered,
  onExit,
  onExiting,
  onExited,
  horizontal,
  disableToggleFocus = false,
  ...props
}: MenuProps): ReactElement {
  const { style, transitionOptions } = useFixedPositioning({
    style: propStyle,
    nodeRef: menuRef,
    fixedTo: toggleRef,
    anchor: TOP_INNER_RIGHT_ANCHOR,
    onEnter,
    onEntered,
    onEntering(appearing) {
      onEntering?.(appearing);
      menuRef.current?.focus();
    },
    onExited,
    transformOrigin: true,
  });
  const { elementProps, rendered } = useScaleTransition({
    ...transitionOptions,
    className,
    transitionIn: visible,
    vertical: !horizontal,
    onExit,
    onExiting() {
      onExiting?.();
      if (!disableToggleFocus) {
        toggleRef.current?.focus();
      }
    },
  });
  return (
    <ConditionalPortal
      portal={portal}
      portalInto={portalInto}
      portalIntoId={portalIntoId}
    >
      {rendered && (
        <KeyboardFocusProvider>
          <MenuWidget {...props} {...elementProps} style={style} />
        </KeyboardFocusProvider>
      )}
    </ConditionalPortal>
  );
}
