import React, { FC, HTMLAttributes, forwardRef, ReactNode } from "react";
import cn from "classnames";
import { TextIconSpacing } from "@react-md/icon";
import {
  InteractionStatesOptions,
  useInteractionStates,
} from "@react-md/states";
import { bem } from "@react-md/theme";
import { Omit, WithForwardedRef } from "@react-md/utils";

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

  const { ripples, className, handlers } = useInteractionStates({
    handlers: props,
    className: propClassName,
    disabled: props.disabled,
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

export default forwardRef<HTMLButtonElement, ChipProps>((props, ref) => (
  <Chip {...props} forwardedRef={ref} />
));
