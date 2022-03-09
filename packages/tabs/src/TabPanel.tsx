import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import cn from "classnames";
import type {
  CSSTransitionClassNames,
  CSSTransitionComponentProps,
  TransitionActions,
  TransitionTimeout,
} from "@react-md/transition";
import { useCSSTransition } from "@react-md/transition";
import { bem } from "@react-md/utils";

export interface TabPanelProps
  extends HTMLAttributes<HTMLDivElement>,
    CSSTransitionComponentProps,
    TransitionActions {
  /**
   * The id for the tab panel. This is required for a11y but will automatically
   * be provided by the `TabPanels` component by cloning the `id` in.
   */
  id?: string;

  /**
   * An optional label to describe this tab panel. Either this or the
   * `aria-labelledby` are required for a11y but the default implementation will
   * use the `aria-labelledby` automatically.
   */
  "aria-label"?: string;

  /**
   * An optional id pointing to an element that describes this tab panel. Either
   * this or the `aria-labelledby` are required for a11y but the default
   * implementation will use the `aria-labelledby` automatically.
   */
  "aria-labelledby"?: string;

  /**
   * @see {@link TransitionOptions.transitionIn}
   */
  transitionIn?: boolean;
}

const block = bem("rmd-tab-panel");
const prefix = "rmd-tab-panel";

/** @remarks \@since 4.0.0 */
export const DEFAULT_TABPANEL_TIMEOUT: TransitionTimeout = 150;

/** @remarks \@since 4.0.0 */
export const DEFAULT_TABPANEL_CLASSNAMES: Readonly<CSSTransitionClassNames> = {
  enter: `${prefix}--enter`,
  enterActive: `${prefix}--enter-active ${prefix}--animate`,
  exit: `${prefix}--exit`,
  exitActive: `${prefix}--exit-active ${prefix}--animate`,
};

/**
 * This component renders an accessible tab panel with enter and exit
 * animations.  This probably should only be used internally as it relies on the
 * `TabPanels` component along with the `TransitionGroup` from
 * `react-transition-group` to work as expected.
 */
export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  function TabPanel(
    {
      className: propClassName,
      appear,
      enter,
      exit,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
      timeout = DEFAULT_TABPANEL_TIMEOUT,
      classNames = DEFAULT_TABPANEL_CLASSNAMES,
      transitionIn = true,
      temporary,
      children,
      hidden,
      ...props
    },
    nodeRef
  ) {
    const { elementProps, rendered } = useCSSTransition({
      nodeRef,
      timeout,
      classNames,
      className: cn(block(), propClassName),
      transitionIn: transitionIn && !hidden,
      appear,
      enter,
      exit,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
      temporary,
    });
    if (!rendered) {
      return null;
    }

    return (
      <div {...props} {...elementProps} role="tabpanel" hidden={hidden}>
        {children}
      </div>
    );
  }
);
