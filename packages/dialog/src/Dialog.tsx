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
import { Overlay } from "@react-md/overlay";
import type { HTMLAttributes } from "react";
import { forwardRef } from "react";

import { DialogContainer } from "./DialogContainer";
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
  /**
   * @defaultValue `useEnsuredId('dialog')`
   */
  id?: string;

  /**
   * @defaultValue `"dialog"`
   */
  role?: "dialog" | "alertdialog" | "menu" | "none";

  /**
   * This value controls the visibility of the dialog.
   */
  visible: boolean;

  /**
   * This function should set the {@link visible} prop to false to hide the
   * modal when:
   * - the {@link modal} and {@link disableEscapeClose} props are `false` and
   *   the user presses the `"Escape"` key.
   * - The overlay element is clicked
   */
  onRequestClose(): void;

  /** @defaultValue `false` */
  disableTransition?: boolean;

  /** @defaultValue `-1` */
  tabIndex?: number;

  /**
   * Set this value to `true` if the dialog should behave as a modal which
   * prevents the modal from being closed by pressing the `"Escape"` key or
   * clicking the overlay. The user **must** click one of the actions within the
   * dialog instead.
   *
   * @defaultValue `false`
   */
  modal?: boolean;

  /**
   * Set this to `true` if the dialog should no longer use the `Portal`
   * behavior.
   *
   * @defaultValue `false`
   */
  disablePortal?: boolean;

  /**
   * Set this to `true` if you want the page to still be scrollable while the
   * dialog is visible. This should normally be `true` for popovers/fixed
   * dialogs.
   *
   * @defaultValue `type === "custom"`
   */
  disableScrollLock?: boolean;

  /**
   * Set this to `true` to prevent the dialog from being closed when the
   * `"Escape"` key is pressed. This is `true` by default when the {@link modal}
   * prop is `true`
   *
   * @defaultValue `modal`
   */
  disableEscapeClose?: boolean;

  /**
   * Set this to `true` if an overlay should not appear behind the dialog.
   *
   * @see {@link overlayHidden}
   * @defaultValue `type === "full-page"`
   */
  disableOverlay?: boolean;

  /**
   * Set this to `true` if an overlay should be appear behind the dialog but
   * have an `opacity: 0`. This is useful if you want to prevent other elements
   * on the page from being clicked while the dialog is visible, but don't want
   * a dark background. i.e. popovers/fixed dialogs.
   *
   * @defaultValue `false`
   */
  overlayHidden?: boolean;

  /**
   * Any additional props that should be passed to the overlay element if it is
   * rendered.
   */
  overlayProps?: HTMLAttributes<HTMLSpanElement>;

  /**
   * Any additional props that should be passed to the container element when
   * the `type === "centered"`.
   */
  containerProps?: HTMLAttributes<HTMLDivElement>;

  /**
   * @see {@link DEFAULT_DIALOG_TIMEOUT}
   * @defaultValue `DEFAULT_DIALOG_TIMEOUT`
   */
  timeout?: CSSTransitionComponentProps["timeout"];

  /**
   * @see {@link DEFAULT_DIALOG_CLASSNAMES}
   * @defaultValue `DEFAULT_DIALOG_CLASSNAMES`
   */
  classNames?: CSSTransitionComponentProps["classNames"];
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
    disableEscapeClose = modal,
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
      if (
        event.isPropagationStopped() ||
        modal ||
        disableEscapeClose ||
        event.key !== "Escape"
      ) {
        return;
      }

      // prevent parent dialogs from closing as well
      event.stopPropagation();
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
          onClick={modal ? noop : onRequestClose}
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
