import React, {
  CSSProperties,
  FC,
  forwardRef,
  Fragment,
  HTMLAttributes,
  ReactNode,
} from "react";
import cn from "classnames";
import { CSSTransition } from "react-transition-group";
import { Overlay } from "@react-md/overlay";
import {
  ConditionalPortal,
  RenderConditionalPortalProps,
} from "@react-md/portal";
import { bem } from "@react-md/theme";
import { CSSTransitionProps } from "@react-md/transition";
import {
  LabelRequiredForA11y,
  WithForwardedRef,
  FocusContainer,
  FocusContainerOptionsProps,
  useCloseOnEscape,
  useScrollLock,
} from "@react-md/utils";

import useNestedDialogFixes from "./useNestedDialogFixes";

export interface DialogProps
  extends CSSTransitionProps,
    RenderConditionalPortalProps,
    FocusContainerOptionsProps,
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
   * `aria-label` prop are required for accessibility.
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
   * Boolean if the overlay should be "hidden" from the user once it's visible be keeping the
   * opacity set to `0`. This is really only used for custom dialogs like the `FixedDialog`.
   */
  overlayHidden?: boolean;

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
   * within the page, you should set this prop to `"custom"` and add custom styles to position it
   * instead.
   */
  type?: "full-page" | "centered" | "custom";

  /**
   * Either the "first" or "last" string to focus the first or last focusable element within the
   * container or a query selector string to find a focusable element within the container.
   */
  defaultFocus?: "first" | "last" | string;

  /**
   * Boolean if the dialog should no longer add scroll locking to the page when visible. You
   * normally want this prop to stay `false`, but it is useful when using custom dialogs that
   * are more for popovers and don't require full user attention.
   */
  disableScrollLock?: boolean;

  /**
   * Boolean if the ability to close the dialog via the escape key should be disabled. You should
   * really not be using this as it breaks accessibility in most cases.
   *
   * Note: When the `modal` prop is enabled, this flag will be considered `true` as well so that
   * the escape keypress no longer closes the dialog.
   */
  disableEscapeClose?: boolean;

  /**
   * Boolean if the dialog's focus container logic should be disabled. This should normally be kept
   * at the default of `false` unless implementing a custom dialog that does not require consistent
   * user focus.
   */
  disableFocusContainer?: boolean;

  /**
   * The Dialog component will attempt to automatically fix nested dialogs behind the scenes using
   * the `NestedDialogContextProvider` component. This prop will disable that feature if it does
   * not seem to be working as expected.
   */
  disableNestedDialogFixes?: boolean;
}

type StrictProps = LabelRequiredForA11y<DialogProps>;
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
    | "defaultFocus"
    | "mountOnEnter"
    | "unmountOnExit"
    | "forceContainer"
    | "disableScrollLock"
    | "disableEscapeClose"
    | "disableFocusContainer"
    | "disableNestedDialogFixes"
    | "portal"
    | "overlayHidden"
  >
>;
type WithDefaultProps = StrictProps & DefaultProps & WithRef;

// used to disable the overlay click-to-close functionality when the `modal` prop is enabled.
const noop = () => {};
const block = bem("rmd-dialog");

const Dialog: FC<StrictProps & WithRef> = providedProps => {
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
    overlayHidden,
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
    onExited,
    modal,
    type,
    disableScrollLock,
    disableEscapeClose: propDisableEscapeClose,
    disableFocusContainer,
    disableFocusOnMount,
    disableFocusOnUnmount,
    disableNestedDialogFixes,
    onKeyDown,
    ...props
  } = providedProps as WithDefaultProps;
  const { id } = props;
  const isFullPage = type === "full-page";
  const isCentered = type === "centered";

  const { disableOverlay, disableEscapeClose } = useNestedDialogFixes({
    id,
    visible,
    disabled: disableNestedDialogFixes,
    disableEscapeClose: propDisableEscapeClose,
  });

  useScrollLock(visible && !disableScrollLock);

  let overlayEl: ReactNode = null;
  if (typeof propOverlay === "boolean" ? propOverlay : !isFullPage) {
    overlayEl = (
      <Overlay
        id={`${id}-overlay`}
        style={overlayStyle}
        className={cn("rmd-dialog-overlay", overlayClassName)}
        hidden={overlayHidden || disableOverlay}
        visible={visible}
        clickable={!modal}
        onRequestClose={modal ? noop : onRequestClose}
        portal={portal}
        portalInto={portalInto}
        portalIntoId={portalIntoId}
      />
    );
  }

  let dialog = (
    <FocusContainer
      {...props}
      aria-modal
      disableTabFocusWrap={disableFocusContainer}
      disableFocusOnMount={disableFocusContainer || disableFocusOnMount}
      disableFocusOnUnmount={disableFocusContainer || disableFocusOnUnmount}
      onKeyDown={useCloseOnEscape(
        onRequestClose,
        disableEscapeClose,
        onKeyDown
      )}
      className={cn(
        block({
          centered: isCentered,
          "full-page": isFullPage,
        }),
        className
      )}
      ref={forwardedRef}
    >
      {children}
    </FocusContainer>
  );

  if (isCentered || forceContainer) {
    // the additional container is only required when we don't have a full page dialog. it's just
    // used to apply flex center to the dialog and add some margin
    dialog = (
      <span
        id={`${id}-container`}
        style={containerStyle}
        className={cn("rmd-dialog-container", containerClassName)}
      >
        {dialog}
      </span>
    );
  }

  return (
    <ConditionalPortal
      portal={portal}
      portalInto={portalInto}
      portalIntoId={portalIntoId}
    >
      <Fragment>
        {overlayEl}
        <CSSTransition
          appear={mountOnEnter}
          in={visible}
          classNames={classNames}
          timeout={timeout}
          onEnter={onEnter}
          onEntering={onEntering}
          onEntered={onEntered}
          onExit={onExit}
          onExiting={onExited}
          onExited={onExited}
          mountOnEnter={mountOnEnter}
          unmountOnExit={unmountOnExit}
        >
          {dialog}
        </CSSTransition>
      </Fragment>
    </ConditionalPortal>
  );
};

const defaultProps: DefaultProps = {
  role: "dialog",
  type: "centered",
  tabIndex: -1,
  portal: true,
  modal: false,
  overlayHidden: false,
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
  defaultFocus: "first",
  forceContainer: false,
  disableScrollLock: false,
  disableEscapeClose: false,
  disableFocusContainer: false,
  disableNestedDialogFixes: false,
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
      "aria-label": PropTypes.string,
      "aria-labelledby": PropTypes.string,
      className: PropTypes.string,
      type: PropTypes.oneOf(["custom", "centered", "full-page"]),
      tabIndex: PropTypes.number,
      modal: PropTypes.bool,
      visible: PropTypes.bool.isRequired,
      onRequestClose: PropTypes.func.isRequired,
      overlay: PropTypes.bool,
      overlayStyle: PropTypes.object,
      overlayClassName: PropTypes.string,
      overlayHidden: PropTypes.bool,
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
      defaultFocus: PropTypes.oneOfType([
        PropTypes.oneOf(["first", "last"]),
        PropTypes.string,
      ]),
      disableScrollLock: PropTypes.bool,
      disableEscapeClose: PropTypes.bool,
      disableFocusContainer: PropTypes.bool,
      disableNestedDialogFixes: PropTypes.bool,
    };
  }
}

export default forwardRef<HTMLDivElement, StrictProps>((props, ref) => (
  <Dialog {...props} forwardedRef={ref} />
));
