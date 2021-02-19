/* eslint-disable react/prop-types */
import React, { ReactElement, ReactNode } from "react";
import TransitionGroup from "react-transition-group/TransitionGroup";

export interface PanelGroupProps {
  children?: ReactNode;
  persistent: boolean;
  disableTransition: boolean;
}

/**
 * @internal
 */
export function PanelGroup({
  persistent,
  disableTransition,
  children,
}: PanelGroupProps): ReactElement {
  if (persistent) {
    return <>{children}</>;
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
