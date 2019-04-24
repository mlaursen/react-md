import React, {
  FunctionComponent,
  CSSProperties,
  HTMLAttributes,
  Fragment,
  ReactNode,
  forwardRef,
  useRef,
} from "react";
import cn from "classnames";
import { Overlay } from "@react-md/overlay";
import {
  ConditionalPortal,
  RenderConditionalPortalProps,
  useStaggeredVisibility,
} from "@react-md/portal";
import { CSSTransitionProps } from "@react-md/transition";
import { bem } from "@react-md/theme";
import { WithForwardedRef, RequireAtLeastOne, applyRef } from "@react-md/utils";
import { useScrollLock } from "@react-md/wia-aria";
import { CSSTransition } from "react-transition-group";

export interface DialogProps
  extends CSSTransitionProps,
    RenderConditionalPortalProps,
    HTMLAttributes<HTMLDivElement> {
  /**
   * An id required for a11y for the dialog.
   */
  id: string;

  /**
   * The role for the dialog component. This should normally stay as the default of `"dialog"` **unless**
   * you want the screen reader to interupt the normal workflow for this message. It is good to set this
   * value to `"alertdialog"` error message confirmations or general confirmation prompts.
   */
  role?: "dialog" | "alertdialog";

  /**
   * A label to apply to the dialog. Either this or the `aria-labelledby` prop are required
   * for accessibility.
   */
  "aria-label"?: string;

  /**
   * An id pointing to an element that is a label for the dialog. Either this or the
   * `aria-label` prop are required * for accessibility.
   */
  "aria-labelledby"?: string;

  /**
   * Boolean if the dialog is currently visible.
   */
  visible: boolean;

  /**
   * A function used to close the dialog when the overlay is clicked or the escape key
   * is pressed when the `modal` prop is not enabled.
   */
  onRequestClose: () => void;

  /**
   * The tab index for the sheet. This should normally stay at `-1`.
   */
  tabIndex?: number;

  /**
   * Boolean if there should be an overlay displayed with the sheet. This is recommended/required
   * on mobile devices.
   */
  overlay?: boolean;

  /**
   * An optional style to apply to the overlay.
   */
  overlayStyle?: CSSProperties;

  /**
   * An optional className to apply to the overlay.
   */
  overlayClassName?: string;

  /**
   * An optional style to apply to the dialog container when the `type` is set to `"centered"` or
   * when the `forceContainer` prop is enabled. You probably don't want to use this prop in most
   * cases.
   */
  containerStyle?: CSSProperties;

  /**
   * An optional className to apply to the dialog container when the `type` is set to `"centered"`
   * or when the `forceContainer` prop is enabled. You probably don't want to use this prop in most
   * cases.
   */
  containerClassName?: string;

  /**
   * Boolean if the dialog should be "forcefully" wrapped in the `.md-dialog-container` element. You
   * probably don't want to use this in most cases, but the container element will be used when
   * the `type` prop is set to `"centered"`.
   */
  forceContainer?: boolean;

  /**
   * Boolean if the dialog should act as a modal. This means that the user will no longer be able
   * to close the dialog by pressing the escape key or by clicking on the overlay. You will
   * be required to update the dialog to have an action that closes the dialog instead.
   */
  modal?: boolean;

  /**
   * The display type for the modal. If you would like to position the modal in different locations
   * within the page, you should set this prop to `"none"` and add custom styles to position it
   * instead.
   */
  type?: "full-page" | "center" | "none";

  /**
   * Boolean if the ability to close the dialog via the escape key should be disabled. You should
   * really not be using this as it breaks accessibility in most cases.
   *
   * Note: When the `modal` prop is enabled, this flag will be considered `true` as well so that
   * the escape keypress no longer closes the dialog.
   */
  disableEscapeClose?: boolean;
}

type WithRef = WithForwardedRef<HTMLDivElement>;
type DefaultProps = Required<
  Pick<
    DialogProps,
    | "role"
    | "tabIndex"
    | "modal"
    | "type"
    | "classNames"
    | "timeout"
    | "mountOnEnter"
    | "unmountOnExit"
    | "forceContainer"
    | "disableEscapeClose"
  >
>;
type WithDefaultProps = DialogProps & DefaultProps & WithRef;
type StrictDialogProps = DialogProps &
  RequireAtLeastOne<DialogProps, "aria-label" | "aria-labelledby">;

const block = bem("rmd-dialog");

const Dialog: FunctionComponent<
  StrictDialogProps & WithRef
> = providedProps => {
  const {
    children,
    forwardedRef,
    className,
    forceContainer,
    containerStyle,
    containerClassName,
    overlay: propOverlay,
    overlayStyle,
    overlayClassName,
    visible,
    onRequestClose,
    portal,
    portalInto,
    portalIntoId,
    classNames,
    timeout,
    mountOnEnter,
    unmountOnExit,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited: propOnExited,
    modal,
    type,
    disableEscapeClose,
    ...props
  } = providedProps as WithDefaultProps;
  const isFullPage = type === "full-page";
  const isCentered = type === "center";
  const overlay = typeof propOverlay === "boolean" || !isFullPage;
  const { portalVisible, onExited } = useStaggeredVisibility({
    onExited: propOnExited,
    visible,
  });

  useScrollLock(visible);

  let overlayEl: ReactNode = null;
  if (overlay) {
    overlayEl = (
      <Overlay
        id={`${props.id}-overlay`}
        style={overlayStyle}
        className={overlayClassName}
        visible={visible}
        onRequestClose={onRequestClose}
      />
    );
  }

  const lastFocus = useRef<HTMLElement | null>(null);

  // TODO: Figure out why the CSSTransition adds undefined to the className here when entered
  const dialog = (
    <CSSTransition
      appear={mountOnEnter}
      in={visible}
      classNames={classNames}
      timeout={timeout}
      onEnter={onEnter}
      onEntering={onEntering}
      onEntered={onEntered}
      onExit={onExit}
      onExiting={onExiting}
      onExited={onExited}
      mountOnEnter={mountOnEnter}
      unmountOnExit={unmountOnExit}
    >
      <div
        {...props}
        ref={instance => {
          // this is pretty hacked together. should fix
          applyRef(instance, forwardedRef);
          if (!instance) {
            window.requestAnimationFrame(() => {
              if (lastFocus.current) {
                lastFocus.current.focus();
              }
              lastFocus.current = null;
            });
            return;
          } else if (!lastFocus.current) {
            console.log(document.activeElement);
            lastFocus.current = document.activeElement as HTMLElement;
          }

          // need to figure out how to do ripples here. If it is done via keyboard
          // enter or space, the instance will be focused before the keyup event so
          // the ripple won't disappear. great stuff. Either move click to keyup?
          // add a timeout?, or add additional event handlers to ripple for this?
          instance.focus();
        }}
        onKeyDown={event => {
          // this is pretty hacked together. should fix
          if (event.key === "Escape" && !modal && !disableEscapeClose) {
            onRequestClose();
          } else if (event.key === "Tab" && event.target) {
            const focusableElements = ["BUTTON", "TEXTAREA", "SELECT"];

            const baseFocusableElements =
              'a[href],area[href],input:not([disabled]):not([type="hidden"])';
            const baseFocusableQuery = focusableElements.reduce(
              (queryString, element) =>
                `${queryString},${element}:not([disabled])`,
              baseFocusableElements
            );

            const programaticallyFocusable = `${baseFocusableQuery},[tabindex]`;
            const tabFocusable = `${programaticallyFocusable}:not([tabindex="-1"])`;
            const elements = Array.from(
              event.currentTarget.querySelectorAll<HTMLElement>(tabFocusable)
            );
            if (!elements.length) {
              throw new Error("No focusable elements!");
            }

            if (elements.length <= 1) {
              event.preventDefault();
            } else if (event.shiftKey && elements[0] === event.target) {
              event.preventDefault();
              elements[elements.length - 1].focus();
            } else if (
              !event.shiftKey &&
              elements[elements.length - 1] === event.target
            ) {
              event.preventDefault();
              elements[0].focus();
            }
          }
        }}
        className={cn(
          block({
            centered: isCentered,
            "full-page": isFullPage,
          }),
          className
        )}
      >
        {children}
      </div>
    </CSSTransition>
  );

  // the additional container is only required when we don't have a full page dialog. it's just
  // used to apply flex center to the dialog and to ensure that the overlay transition isn't
  // applied to the dialog itself.
  let content: ReactNode = dialog;
  if (isCentered || forceContainer) {
    if (!portalVisible) {
      content = null;
    } else {
      content = (
        <span
          style={containerStyle}
          className={cn("rmd-dialog-container", containerClassName)}
        >
          {dialog}
        </span>
      );
    }
  }

  return (
    <ConditionalPortal
      visible={portalVisible}
      portal={portal}
      portalInto={portalInto}
      portalIntoId={portalIntoId}
    >
      <Fragment>
        {overlayEl}
        {content}
      </Fragment>
    </ConditionalPortal>
  );
};

const defaultProps: DefaultProps = {
  role: "dialog",
  type: "center",
  tabIndex: -1,
  modal: false,
  mountOnEnter: true,
  unmountOnExit: true,
  timeout: {
    enter: 200,
    exit: 150,
  },
  classNames: {
    appear: "rmd-dialog--enter",
    appearActive: "rmd-dialog--enter-active",
    enter: "rmd-dialog--enter",
    enterActive: "rmd-dialog--enter-active",
    exit: "rmd-dialog--exit",
    exitActive: "rmd-dialog--exit-active",
  },
  forceContainer: false,
  disableEscapeClose: false,
};

Dialog.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  Dialog.displayName = "Dialog";

  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    Dialog.propTypes = {
      id: PropTypes.string.isRequired,
      role: PropTypes.oneOf(["dialog", "alertdialog"]),
      className: PropTypes.string,
      type: PropTypes.oneOf(["none", "center", "full-page"]),
      tabIndex: PropTypes.number,
      modal: PropTypes.bool,
      visible: PropTypes.bool.isRequired,
      onRequestClose: PropTypes.func.isRequired,
      overlay: PropTypes.bool,
      overlayStyle: PropTypes.object,
      overlayClassName: PropTypes.string,
      containerStyle: PropTypes.object,
      containerClassName: PropTypes.string,
      forceContainer: PropTypes.bool,
      children: PropTypes.node,
      classNames: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          appear: PropTypes.string,
          appearActive: PropTypes.string,
          enter: PropTypes.string,
          enterActive: PropTypes.string,
          enterDone: PropTypes.string,
          exit: PropTypes.string,
          exitActive: PropTypes.string,
          exitDone: PropTypes.string,
        }),
      ]),
      timeout: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.shape({
          enter: PropTypes.number,
          exit: PropTypes.number,
        }),
      ]),
      onEnter: PropTypes.func,
      onEntering: PropTypes.func,
      onEntered: PropTypes.func,
      onExit: PropTypes.func,
      onExiting: PropTypes.func,
      onExited: PropTypes.func,
      portal: PropTypes.bool,
      portalInto: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string,
        PropTypes.object,
      ]),
      "aria-label": PropTypes.string,
      "aria-labelledby": PropTypes.string,
      disableEscapeClose: PropTypes.bool,
    };
  }
}

export default forwardRef<HTMLDivElement, StrictDialogProps>((props, ref) => (
  <Dialog {...props} forwardedRef={ref} />
));
