/* eslint-disable react/prop-types */
import React, { FC, Fragment } from "react";
import TransitionGroup from "react-transition-group/TransitionGroup";

export interface PanelGroupProps {
  persistent: boolean;
  disableTransition: boolean;
}

/**
 * @private
 */
const PanelGroup: FC<PanelGroupProps> = ({
  persistent,
  disableTransition,
  children,
}) => {
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
};

export default PanelGroup;
