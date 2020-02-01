/* eslint-disable react/button-has-type */
import React, {
  forwardRef,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  Ref,
} from "react";
import cn from "classnames";
import { TextIconSpacing } from "@react-md/icon";
import {
  InteractionStatesOptions,
  useInteractionStates,
} from "@react-md/states";
import { bem } from "@react-md/utils";

export interface ChipProps
  extends HTMLAttributes<HTMLButtonElement>,
    Omit<InteractionStatesOptions<HTMLButtonElement>, "disableSpacebarClick"> {
  /**
   * The button's type attribute. This is set to "button" by default so that
   * forms are not accidentally submitted when this prop is omitted since
   * buttons without a type attribute work as submit by default.
   */
  type?: "button" | "reset" | "submit";

  theme?: "outline" | "solid";

  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const block = bem("rmd-chip");

function Chip(
  {
    className: propClassName,
    children,
    theme = "solid",
    leftIcon,
    rightIcon,
    disableRipple,
    disableProgrammaticRipple,
    rippleTimeout,
    rippleClassNames,
    rippleClassName,
    rippleContainerClassName,
    enablePressedAndRipple = true,
    type = "button",
    ...props
  }: ChipProps,
  ref?: Ref<HTMLButtonElement>
): ReactElement {
  const { disabled } = props;

  const { ripples, className, handlers } = useInteractionStates({
    handlers: props,
    className: propClassName,
    disabled,
    disableRipple,
    disableProgrammaticRipple,
    rippleTimeout,
    rippleClassNames,
    rippleClassName,
    rippleContainerClassName,
    enablePressedAndRipple,
  });

  return (
    <button
      {...props}
      {...handlers}
      type={type}
      ref={ref}
      className={cn(
        block({
          [theme]: true,
          "leading-icon": leftIcon,
          "trailing-icon": rightIcon,
        }),
        className
      )}
    >
      <TextIconSpacing icon={leftIcon}>
        <TextIconSpacing icon={rightIcon} iconAfter>
          {children}
        </TextIconSpacing>
      </TextIconSpacing>
      {ripples}
    </button>
  );
}

const ForwardedChip = forwardRef<HTMLButtonElement, ChipProps>(Chip);

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");
    ForwardedChip.propTypes = {
      disabled: PropTypes.bool,
      theme: PropTypes.oneOf(["outline", "solid"]),
      type: PropTypes.string,
      enablePressedAndRipple: PropTypes.bool,
    };
  } catch (e) {}
}

export default ForwardedChip;
