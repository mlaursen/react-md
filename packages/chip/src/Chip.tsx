/* eslint-disable react/button-has-type */
import React, { FC, forwardRef, HTMLAttributes, ReactNode } from "react";
import cn from "classnames";
import { TextIconSpacing } from "@react-md/icon";
import {
  InteractionStatesOptions,
  useInteractionStates,
} from "@react-md/states";
import { bem, WithForwardedRef } from "@react-md/utils";

export interface ChipProps
  extends HTMLAttributes<HTMLButtonElement>,
    Omit<InteractionStatesOptions<HTMLButtonElement>, "disableSpacebarClick"> {
  /**
   * The button's type attribute. This is set to "button" by default so that forms are not
   * accidentally submitted when this prop is omitted since buttons without a type attribute work
   * as submit by default.
   */
  type?: "button" | "reset" | "submit";

  theme?: "outline" | "solid";

  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

type WithRef = WithForwardedRef<HTMLButtonElement>;
type DefaultProps = Required<
  Pick<ChipProps, "theme" | "type" | "enablePressedAndRipple">
>;
type WithDefaultProps = ChipProps & DefaultProps & WithRef;

const block = bem("rmd-chip");

const Chip: FC<ChipProps & WithRef> = providedProps => {
  const {
    className: propClassName,
    children,
    forwardedRef,
    theme,
    leftIcon,
    rightIcon,
    disableRipple,
    disableProgrammaticRipple,
    rippleTimeout,
    rippleClassNames,
    rippleClassName,
    rippleContainerClassName,
    enablePressedAndRipple,
    ...props
  } = providedProps as WithDefaultProps;
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
      ref={forwardedRef}
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
};

const defaultProps: DefaultProps = {
  theme: "solid",
  type: "button",
  enablePressedAndRipple: true,
};

Chip.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  Chip.displayName = "Chip";

  let PropTypes;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    Chip.propTypes = {
      disabled: PropTypes.bool,
      theme: PropTypes.oneOf(["outline", "solid"]),
      type: PropTypes.string,
      enablePressedAndRipple: PropTypes.bool,
    };
  }
}

export default forwardRef<HTMLButtonElement, ChipProps>((props, ref) => (
  <Chip {...props} forwardedRef={ref} />
));
