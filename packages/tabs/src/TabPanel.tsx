import React, { forwardRef, HTMLAttributes } from "react";
import cn from "classnames";
import CSSTransition, {
  CSSTransitionClassNames,
} from "react-transition-group/CSSTransition";
import { OverridableCSSTransitionProps } from "@react-md/transition";
import { bem } from "@react-md/utils";

export interface TabPanelProps
  extends HTMLAttributes<HTMLDivElement>,
    OverridableCSSTransitionProps {
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
}

const block = bem("rmd-tab-panel");
const prefix = "rmd-tab-panel";

const DEFAULT_TABPANEL_CLASSNAMES: CSSTransitionClassNames = {
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
      className,
      in: transitionIn,
      appear,
      enter,
      exit,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
      timeout = 150,
      classNames = DEFAULT_TABPANEL_CLASSNAMES,
      children,
      hidden,
      ...props
    },
    ref
  ) {
    return (
      <CSSTransition
        in={transitionIn && !hidden}
        appear={appear}
        enter={enter}
        exit={exit}
        onEnter={onEnter}
        onEntering={onEntering}
        onEntered={onEntered}
        onExit={onExit}
        onExiting={onExiting}
        onExited={onExited}
        timeout={timeout}
        classNames={classNames}
      >
        <div
          {...props}
          ref={ref}
          role="tabpanel"
          hidden={hidden}
          className={cn(block(), className)}
        >
          {children}
        </div>
      </CSSTransition>
    );
  }
);

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    TabPanel.propTypes = {
      className: PropTypes.string,
      timeout: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.shape({
          enter: PropTypes.number,
          exit: PropTypes.number,
        }),
      ]),
      in: PropTypes.bool,
      appear: PropTypes.bool,
      enter: PropTypes.bool,
      exit: PropTypes.bool,
      onEnter: PropTypes.func,
      onEntering: PropTypes.func,
      onEntered: PropTypes.func,
      onExit: PropTypes.func,
      onExiting: PropTypes.func,
      onExited: PropTypes.func,
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
      hidden: PropTypes.bool,
      children: PropTypes.node,
    };
  } catch (e) {}
}
