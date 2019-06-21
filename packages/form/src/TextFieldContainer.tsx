import React, {
  FC,
  HTMLAttributes,
  forwardRef,
  CSSProperties,
  ReactNode,
} from "react";
import cn from "classnames";
import { bem } from "@react-md/theme";
import { WithForwardedRef, Omit } from "@react-md/utils";
import TextFieldAddon from "./TextFieldAddon";

export interface TextFieldContainerOptions {
  containerStyle?: CSSProperties;
  containerClassName?: string;
  theme?: "none" | "underline" | "outline" | "filled";
  inline?: boolean;
  error?: boolean;
  active?: boolean;
  growable?: boolean;
  underlineDirection?: "left" | "right";
  leftChildren?: ReactNode;
  rightChildren?: ReactNode;
}

export interface TextFieldContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    Omit<TextFieldContainerOptions, "containerStyle" | "containerClassName"> {}

type WithRef = WithForwardedRef<HTMLDivElement>;
type DefaultProps = Required<
  Pick<
    TextFieldContainerProps,
    "inline" | "theme" | "error" | "underlineDirection" | "growable"
  >
>;
type WithDefaultProps = TextFieldContainerProps & DefaultProps & WithRef;

const block = bem("rmd-text-field-container");

const TextFieldContainer: FC<
  TextFieldContainerProps & WithRef
> = providedProps => {
  const {
    inline,
    className,
    children,
    forwardedRef,
    theme,
    error,
    active,
    growable,
    underlineDirection,
    leftChildren,
    rightChildren,
    ...props
  } = providedProps as WithDefaultProps;

  const underline = theme === "underline";
  const outline = theme === "outline";
  const filled = theme === "filled";
  const isUnderlined = underline || filled;

  return (
    <div
      {...props}
      ref={forwardedRef}
      className={cn(
        block({
          error,
          inline,
          filled,
          outline,
          growable,
          "offset-left": leftChildren,
          "offset-right": rightChildren,
          "outline-active": outline && active,
          "outline-error": outline && error,
          // "outline-offset-left": outline && leftChildren,
          // "outline-offset-right": outline && rightChildren,
          underline: isUnderlined,
          "underline-active": isUnderlined && active,
          "underline-error": isUnderlined && active && !error,
          // "underline-offset-left": isUnderlined && leftChildren,
          // "underline-offset-right": isUnderlined && rightChildren,
          [`underline-${underlineDirection}`]: isUnderlined,
        }),
        className
      )}
    >
      <TextFieldAddon first>{leftChildren}</TextFieldAddon>
      {children}
      <TextFieldAddon>{rightChildren}</TextFieldAddon>
    </div>
  );
};

const defaultProps: DefaultProps = {
  inline: false,
  theme: "none",
  error: false,
  growable: false,
  underlineDirection: "left",
};

TextFieldContainer.defaultProps = defaultProps;

export default forwardRef<HTMLDivElement, TextFieldContainerProps>(
  (props, ref) => <TextFieldContainer {...props} forwardedRef={ref} />
);
