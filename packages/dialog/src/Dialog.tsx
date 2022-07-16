import type {
  CSSTransitionClassNames,
  CSSTransitionComponentProps,
  LabelRequiredForA11y,
  TransitionTimeout,
} from "@react-md/core";
import {
  Portal,
  useCSSTransition,
  useEnsuredId,
  useScrollLock,
  useSsr,
  useFocusContainer,
} from "@react-md/core";
import type { HTMLAttributes } from "react";
import { forwardRef } from "react";

import { DialogContainer } from "./DialogContainer";
import { Overlay } from "./Overlay";
import type { DialogClassNameOptions } from "./styles";
import { dialog } from "./styles";

/** @remarks \@since 4.0.0 */
export const DEFAULT_DIALOG_CLASSNAMES: Readonly<CSSTransitionClassNames> = {
  appear: "rmd-dialog--enter",
  appearActive: "rmd-dialog--enter-active",
  enter: "rmd-dialog--enter",
  enterActive: "rmd-dialog--enter-active",
  exit: "rmd-dialog--exit",
  exitActive: "rmd-dialog--exit-active",
};

/** @remarks \@since 4.0.0 */
export const DEFAULT_DIALOG_TIMEOUT: Readonly<TransitionTimeout> = {
  enter: 200,
  exit: 150,
};

const noop = (): void => {
  // do nothing
};

export interface BaseDialogProps
  extends HTMLAttributes<HTMLDivElement>,
    CSSTransitionComponentProps,
    DialogClassNameOptions {
  id?: string;
  /**
   * @defaultValue `"dialog"`
   */
  role?: "dialog" | "alertdialog" | "menu" | "none";

  visible: boolean;
  onRequestClose(): void;

  /**
   * @defaultValue `false`
   */
  disableTransition?: boolean;

  /** @defaultValue `-1` */
  tabIndex?: number;

  containerProps?: HTMLAttributes<HTMLDivElement>;

  disablePortal?: boolean;
  disableOverlay?: boolean;
  disableScrollLock?: boolean;
  overlayProps?: HTMLAttributes<HTMLSpanElement>;
  overlayHidden?: boolean;

  modal?: boolean;
}

export type DialogProps = LabelRequiredForA11y<BaseDialogProps>;

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(function Dialog(
  props,
  ref
) {
  const {
    id: propId,
    role = "dialog",
    type = "centered",
    tabIndex = -1,
    visible,
    onRequestClose,
    containerProps,
    temporary = true,
    className,
    timeout = DEFAULT_DIALOG_TIMEOUT,
    classNames = DEFAULT_DIALOG_CLASSNAMES,
    disableTransition = false,
    onEnter = noop,
    onEntering = noop,
    onEntered,
    onExit,
    onExiting = noop,
    onExited,
    modal = false,
    disableOverlay = type === "full-page",
    overlayProps,
    overlayHidden,
    onKeyDown = noop,
    disablePortal: propDisablePortal,
    disableScrollLock = false,
    children,
    ...remaining
  } = props;
  const id = useEnsuredId(propId, "dialog");

  const ssr = useSsr();
  const { eventHandlers, transitionOptions } = useFocusContainer({
    ref,
    activate: visible,
    onEntering,
    onExiting,
    onKeyDown(event) {
      onKeyDown(event);
      if (event.isPropagationStopped() || event.key !== "Escape") {
        return;
      }

      onRequestClose();
    },
  });
  const { elementProps, rendered, disablePortal } = useCSSTransition({
    transitionIn: visible,
    timeout,
    classNames,
    className: dialog({ type, className }),
    appear: !disableTransition && !ssr,
    enter: !disableTransition,
    exit: !disableTransition,
    onEnter,
    onEntered,
    onExit,
    onExited,
    temporary,
    ...transitionOptions,
  });
  useScrollLock(!disableScrollLock && visible);

  return (
    <>
      {!disableOverlay && (
        <Overlay
          visible={visible}
          {...overlayProps}
          onClick={onRequestClose}
          clickable={!modal}
          hidden={overlayHidden}
        />
      )}
      <Portal disabled={propDisablePortal || disablePortal}>
        {rendered && (
          <DialogContainer {...containerProps} enabled={type === "centered"}>
            <div
              {...remaining}
              {...elementProps}
              {...eventHandlers}
              id={id}
              role={role}
              tabIndex={tabIndex}
            >
              {children}
            </div>
          </DialogContainer>
        )}
      </Portal>
    </>
  );
});
