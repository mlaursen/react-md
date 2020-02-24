import React, { FC, Fragment, ButtonHTMLAttributes } from "react";
import { cnb } from "cnbuilder";
import {
  useInteractionStates,
  InteractionStatesOptions,
} from "@react-md/states";

import "./CustomComponent.scss";

interface CustomButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    Omit<InteractionStatesOptions, "handlers"> {}

const CustomButton: FC<CustomButtonProps> = ({
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
      className={cnb("custom-states-component", className)}
      {...handlers}
    >
      {children}
      {ripples}
    </button>
  );
};

const CustomComponent: FC = () => {
  return (
    <Fragment>
      <CustomButton id="custom-button-1">Hello</CustomButton>
    </Fragment>
  );
};

export default CustomComponent;
