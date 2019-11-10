import React, { FC, forwardRef, HTMLAttributes } from "react";
import cn from "classnames";
import { OverridableCSSTransitionProps } from "@react-md/transition";
import { bem, WithForwardedRef } from "@react-md/utils";
import CSSTransition from "react-transition-group/CSSTransition";

export interface TabPanelProps
  extends HTMLAttributes<HTMLDivElement>,
    OverridableCSSTransitionProps {
  /**
   * The id for the tab panel. This is required for a11y but will automatically be provided
   * by the `TabPanels` component by cloning the `id` in.
   */
  id?: string;

  /**
   * An optional label to describe this tab panel. Either this or the `aria-labelledby`
   * are required for a11y but the default implementation will use the `aria-labelledby`
   * automatically.
   */
  "aria-label"?: string;

  /**
   * An optional id pointing to an element that describes this tab panel. Either this or
   * the `aria-labelledby` are required for a11y but the default implementation will use
   * the `aria-labelledby` automatically.
   */
  "aria-labelledby"?: string;
}

type WithRef = WithForwardedRef<HTMLDivElement>;
type DefaultProps = Required<Pick<TabPanelProps, "timeout" | "classNames">>;
type WithDefaultProps = TabPanelProps & DefaultProps & WithRef;

const block = bem("rmd-tab-panel");

/**
 * This component renders an accessible tab panel with enter and exit animations.
 * This probably should only be used internally as it relies on the `TabPanels`
 * component along with the `TransitionGroup` from `react-transition-group` to
 * work as expected.
 */
const TabPanel: FC<TabPanelProps & WithRef> = providedProps => {
  const {
    className,
    forwardedRef,
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
    timeout,
    classNames,
    children,
    hidden,
    ...props
  } = providedProps as WithDefaultProps;

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
        ref={forwardedRef}
        role="tabpanel"
        hidden={hidden}
        className={cn(block(), className)}
      >
        {children}
      </div>
    </CSSTransition>
  );
};

const prefix = "rmd-tab-panel";
const defaultProps: DefaultProps = {
  timeout: 150,
  classNames: {
    enter: `${prefix}--enter`,
    enterActive: `${prefix}--enter-active ${prefix}--animate`,
    exit: `${prefix}--exit`,
    exitActive: `${prefix}--exit-active ${prefix}--animate`,
  },
};

TabPanel.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  TabPanel.displayName = "TabPanel";

  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    TabPanel.propTypes = {
      className: PropTypes.string,
      timeout: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.shape({
          enter: PropTypes.number,
          exit: PropTypes.number,
        }),
      ]),
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
      children: PropTypes.node,
      forwardedRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    };
  }
}

export default forwardRef<HTMLDivElement, TabPanelProps>((props, ref) => (
  <TabPanel {...props} forwardedRef={ref} />
));
