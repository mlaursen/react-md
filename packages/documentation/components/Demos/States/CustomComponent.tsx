import React, { FunctionComponent, HTMLAttributes, Fragment } from "react";
import cn from "classnames";
import {
  useInteractionStates,
  InteractionStatesOptions,
} from "@react-md/states";
import { Omit } from "@react-md/utils";

import "./custom-component.scss";

interface CustomButtonProps
  extends HTMLAttributes<HTMLButtonElement>,
    Omit<InteractionStatesOptions, "handlers"> {}

const CustomButton: FunctionComponent<CustomButtonProps> = ({
  disabled,
  disableRipple,
  disableSpacebarClick,
  disableProgrammaticRipple,
  className: propClassName,
  children,
  onKeyDown,
  onKeyUp,
  onMouseDown,
  onMouseUp,
  onMouseLeave,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  ...props
}) => {
  const { ripples, handlers, className } = useInteractionStates({
    handlers: {
      onKeyDown,
      onKeyUp,
      onMouseDown,
      onMouseUp,
      onMouseLeave,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
    },
    disabled,
    disableRipple,
    disableSpacebarClick,
    disableProgrammaticRipple,
    className: propClassName,
  });

  return (
    <button
      {...props}
      type="button"
      className={cn("custom-states-component", className)}
      {...handlers}
    >
      {children}
      {ripples}
    </button>
  );
};

const CustomComponent: FunctionComponent = () => {
  return (
    <Fragment>
      <CustomButton id="custom-button-1">Hello</CustomButton>
    </Fragment>
  );
};

export default CustomComponent;
