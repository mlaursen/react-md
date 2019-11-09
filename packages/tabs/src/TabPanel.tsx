import React, { FC, forwardRef, HTMLAttributes } from "react";
import cn from "classnames";
import { TransitionTimeout } from "@react-md/transition";
import { bem, LabelRequiredForA11y, WithForwardedRef } from "@react-md/utils";
import CSSTransition, {
  CSSTransitionClassNames,
  CSSTransitionProps,
} from "react-transition-group/CSSTransition";

export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
  timeout?: TransitionTimeout;
  classNames?: CSSTransitionClassNames;
  "aria-labelledby"?: string;
  "aria-label"?: string;
}

type WithRef = WithForwardedRef<HTMLDivElement>;
type DefaultProps = Required<Pick<TabPanelProps, "timeout" | "classNames">>;
type StrictProps = LabelRequiredForA11y<TabPanelProps> & CSSTransitionProps;
type WithDefaultProps = StrictProps & DefaultProps & WithRef;

const block = bem("rmd-tab-panel");

const TabPanel: FC<StrictProps & WithRef> = providedProps => {
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

export default forwardRef<HTMLDivElement, StrictProps>((props, ref) => (
  <TabPanel {...props} forwardedRef={ref} />
));
