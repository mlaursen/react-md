import React, { ButtonHTMLAttributes, FC } from "react";
import cn from "classnames";
import {
  InteractionStatesOptions,
  useInteractionStates,
} from "@react-md/states";

import styles from "./CustomComponent.module.scss";

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
      className={cn(styles.button, className)}
      {...handlers}
    >
      {children}
      {ripples}
    </button>
  );
};

const CustomComponent: FC = () => {
  return (
    <>
      <CustomButton id="custom-button-1">Hello</CustomButton>
    </>
  );
};

export default CustomComponent;
