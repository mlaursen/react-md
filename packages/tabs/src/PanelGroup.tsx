/* eslint-disable react/prop-types */
import React, { Fragment, ReactElement, ReactNode } from "react";
import TransitionGroup from "react-transition-group/TransitionGroup";

export interface PanelGroupProps {
  children?: ReactNode;
  persistent: boolean;
  disableTransition: boolean;
}

/**
 * @private
 */
export default function PanelGroup({
  persistent,
  disableTransition,
  children,
}: PanelGroupProps): ReactElement {
  if (persistent) {
    return <Fragment>{children}</Fragment>;
  }

  return (
    <TransitionGroup
      component={null}
      appear={!disableTransition}
      enter={!disableTransition}
      exit={!disableTransition}
    >
      {children}
    </TransitionGroup>
  );
}
