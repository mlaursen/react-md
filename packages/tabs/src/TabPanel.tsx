import React, { FC, forwardRef, HTMLAttributes } from "react";
import cn from "classnames";
import { TransitionTimeout } from "@react-md/transition";
import { bem, WithForwardedRef } from "@react-md/utils";
import CSSTransition, {
  CSSTransitionClassNames,
  CSSTransitionProps,
} from "react-transition-group/CSSTransition";

export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
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

  /**
   * The duration for the panel's enter and exit animations.
   */
  timeout?: TransitionTimeout;

  /**
   * The class names to use for the panel's enter and exit animations.
   */
  classNames?: CSSTransitionClassNames;
}

type WithRef = WithForwardedRef<HTMLDivElement>;
type DefaultProps = Required<Pick<TabPanelProps, "timeout" | "classNames">>;
type TabPanelWithTransitionProps = TabPanelProps & CSSTransitionProps;
type WithDefaultProps = TabPanelWithTransitionProps & DefaultProps & WithRef;

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
    ...props
  } = providedProps as WithDefaultProps;

  return (
    <CSSTransition
      in={transitionIn}
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
    enter: `${prefix}--start`,
    enterActive: `${prefix}--end ${prefix}--animate`,
    exit: `${prefix}--start`,
    exitActive: `${prefix}--end ${prefix}--animate`,
  },
};

TabPanel.defaultProps = defaultProps;

export default forwardRef<HTMLDivElement, TabPanelProps>((props, ref) => (
  <TabPanel {...props} forwardedRef={ref} />
));
