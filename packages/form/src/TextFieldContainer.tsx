import React, { FC, HTMLAttributes, forwardRef, CSSProperties } from "react";
import cn from "classnames";
import { bem } from "@react-md/theme";
import { WithForwardedRef, Omit } from "@react-md/utils";

export interface TextFieldContainerOptions {
  containerStyle?: CSSProperties;
  containerClassName?: string;
  theme?: "none" | "underline" | "outline" | "filled";
  inline?: boolean;
  error?: boolean;
  active?: boolean;
  underlineDirection?: "left" | "right";
}

export interface TextFieldContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    Omit<TextFieldContainerOptions, "containerStyle" | "containerClassName"> {}

type WithRef = WithForwardedRef<HTMLDivElement>;
type DefaultProps = Required<
  Pick<
    TextFieldContainerProps,
    "inline" | "theme" | "error" | "underlineDirection"
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
    underlineDirection,
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
          "outline-active": outline && active,
          underline: isUnderlined,
          "underline-active": isUnderlined && active,
          [`underline-${underlineDirection}`]: isUnderlined,
        }),
        className
      )}
    >
      {children}
    </div>
  );
};

const defaultProps: DefaultProps = {
  inline: false,
  theme: "none",
  error: false,
  underlineDirection: "left",
};

TextFieldContainer.defaultProps = defaultProps;

export default forwardRef<HTMLDivElement, TextFieldContainerProps>(
  (props, ref) => <TextFieldContainer {...props} forwardedRef={ref} />
);
