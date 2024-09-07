"use client";
import { cnb } from "cnbuilder";
import { forwardRef, useState, type HTMLAttributes } from "react";
import { useSsr } from "../SsrProvider.js";
import {
  useFocusContainer,
  type FocusContainerComponentProps,
} from "../focus/useFocusContainer.js";
import { Overlay } from "../overlay/Overlay.js";
import { Portal } from "../portal/Portal.js";
import { useScrollLock } from "../scroll/useScrollLock.js";
import {
  type CSSTransitionComponentProps,
  type TransitionActions,
} from "../transition/types.js";
import { useCSSTransition } from "../transition/useCSSTransition.js";
import { type LabelRequiredForA11y } from "../types.js";
import { useEnsuredId } from "../useEnsuredId.js";
import { DISPLAY_NONE_CLASS } from "../utils/isElementVisible.js";
import { DialogContainer } from "./DialogContainer.js";
import {
  NestedDialogProvider,
  useNestedDialogContext,
} from "./NestedDialogProvider.js";
import {
  DEFAULT_DIALOG_CLASSNAMES,
  DEFAULT_DIALOG_TIMEOUT,
  dialog,
  type DialogType,
} from "./styles.js";

const noop = (): void => {
  // do nothing
};

const noopBool = (): boolean => false;

export interface BaseDialogProps
  extends HTMLAttributes<HTMLDivElement>,
    CSSTransitionComponentProps,
    TransitionActions,
    FocusContainerComponentProps {
  /**
   * @defaultValue `"dialog-" + useId()`
   */
  id?: string;

  /**
   * @defaultValue `"centered"`
   */
  type?: DialogType;

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
   * @internal
   * @defaultValue `false`
   */
  fixed?: boolean;

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
   * Note: this was changed from `type === "full-page"` to `false` so that you
   * can change between full-page and centered based on media queries. If the
   * type changes the overlay would end up rendering above the dialog instead of
   * behind.
   *
   * @see {@link overlayHidden}
   * @defaultValue `false`
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

  /**
   * Set this to `true` if the `Dialog` should not gain the normal focus box
   * shadow while it is focused. The `Dialog` should normally only gain focus
   * when it becomes visible and no child elements have `autoFocus` enabled.
   *
   * @since 6.0.0
   * @defaultValue `type === "full-page"`
   */
  disableFocusOutline?: boolean;
}

export type DialogProps = LabelRequiredForA11y<BaseDialogProps>;

/**
 * **Client Component**
 *
 * @example Simple Example
 * ```tsx
 * import {
 *   Button,
 *   Dialog,
 *   DialogHeader,
 *   DialogTitle,
 *   DialogContent,
 *   DialogFooter,
 *   Typography,
 *   useToggle,
 * } from "@react-md/core";
 * import type { ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   const {
 *     toggle,
 *     disable: onRequestClose,
 *     toggled: visible,
 *   } = useToggle(false);
 *
 *   return (
 *     <>
 *       <Button onClick={toggle}>Toggle</Button>
 *       <Dialog
 *         aria-labelledby="dialog-title"
 *         visible={visible}
 *         onRequestClose={onRequestClose}
 *       >
 *         <DialogHeader>
 *           <DialogTitle id="dialog-title">Simple Dialog</DialogTitle>
 *         </DialogHeader>
 *         <DialogContent>
 *           <Typography margin="none">This is some text in a dialog.</Typography>
 *         </DialogContent>
 *         <DialogFooter>
 *           <Button onClick={onRequestClose}>
 *             Close
 *           </Button>
 *         </DialogFooter>
 *       </Dialog>
 *     </>
 *   );
 * }
 * ```
 *
 * @since 6.0.0 The `Dialog` no longer supports focusing elements
 * within once it becomes visible. You must manually add `autoFocus` to a
 * element instead.
 */
export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  function Dialog(props, ref) {
    const {
      id: propId,
      fixed = false,
      modal = false,
      role = modal ? "alertdialog" : "dialog",
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
      appear,
      enter,
      exit,
      onEnter = noop,
      onEntering = noop,
      onEntered,
      onExit = noop,
      onExiting = noop,
      onExited,
      exitedHidden = true,
      disableOverlay = false,
      overlayProps,
      overlayHidden,
      onKeyDown = noop,
      isFocusTypeDisabled = noopBool,
      disablePortal: propDisablePortal,
      disableScrollLock = false,
      disableEscapeClose = modal,
      disableFocusOutline = type === "full-page",
      children,
      ...remaining
    } = props;
    const id = useEnsuredId(propId, "dialog");

    const ssr = useSsr();
    const setChildVisible = useNestedDialogContext();
    const { eventHandlers, transitionOptions } = useFocusContainer({
      nodeRef: ref,
      activate: visible,
      onEntered,
      onEntering,
      onExiting,
      onExited,
      disableTransition,
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
      isFocusTypeDisabled,
    });
    const { elementProps, stage, rendered, disablePortal } = useCSSTransition({
      transitionIn: visible,
      timeout,
      classNames,
      className: dialog({
        type,
        fixed,
        outline: !disableFocusOutline,
        className,
      }),
      appear: appear && !disableTransition && !ssr,
      enter: enter && !disableTransition,
      exit: exit && !disableTransition,
      onEnter(appearing) {
        onEnter(appearing);
        setChildVisible(type !== "full-page");
      },
      onExit() {
        onExit();
        setChildVisible(false);
      },
      temporary,
      exitedHidden,
      disablePortal: propDisablePortal,
      ...transitionOptions,
    });
    useScrollLock(!disableScrollLock && visible);

    // this makes it so that as more non-full page dialogs become visible, the
    // overlay does not become darker as more and more overlays are stacked upon
    // each other. only the top-most overlay will have and active background
    // color.
    const [isChildVisible, setIsChildVisible] = useState(false);

    return (
      <NestedDialogProvider value={setIsChildVisible}>
        {!disableOverlay && (
          <Overlay
            visible={visible}
            disableTransition={disableTransition}
            temporary={temporary}
            disablePortal={disablePortal}
            {...overlayProps}
            onClick={modal ? noop : onRequestClose}
            clickable={!modal}
            noOpacity={overlayHidden || isChildVisible}
          />
        )}
        <Portal disabled={disablePortal}>
          {rendered && (
            <DialogContainer
              {...containerProps}
              className={cnb(
                containerProps?.className,
                !temporary &&
                  exitedHidden &&
                  stage === "exited" &&
                  DISPLAY_NONE_CLASS
              )}
              enabled={type === "centered"}
            >
              <div
                aria-modal={modal || undefined}
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
      </NestedDialogProvider>
    );
  }
);
