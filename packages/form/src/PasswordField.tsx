import React, {
  FC,
  ReactNode,
  useState,
  forwardRef,
  useCallback,
  CSSProperties,
} from "react";
import cn from "classnames";
import { Button } from "@react-md/button";
import { FontIcon } from "@react-md/icon";
import { bem } from "@react-md/theme";
import { Omit, WithForwardedRef } from "@react-md/utils";

import TextField, { TextFieldProps } from "./TextField";

export interface PasswordFieldProps
  extends Omit<TextFieldProps, "type" | "rightChildren"> {
  visibilityIcon?: ReactNode;
  visibilityStyle?: CSSProperties;
  visibilityClassName?: string;
  disableVisibility?: boolean;
}

type WithRef = WithForwardedRef<HTMLInputElement>;
type DefaultProps = Required<
  Pick<PasswordFieldProps, "visibilityIcon" | "disableVisibility">
>;
type WithDefaultProps = PasswordFieldProps & DefaultProps & WithRef;

const block = bem("rmd-password");

const PasswordField: FC<PasswordFieldProps & WithRef> = providedProps => {
  const {
    className,
    forwardedRef,
    visibilityIcon,
    disableVisibility,
    visibilityStyle,
    visibilityClassName,
    ...props
  } = providedProps as WithDefaultProps;
  const [type, setType] = useState<"password" | "text">("password");
  const toggle = useCallback(() => {
    setType(prevType => (prevType === "password" ? "text" : "password"));
  }, []);

  return (
    <TextField
      {...props}
      className={cn(block({ offset: !disableVisibility }), className)}
      ref={forwardedRef}
      type={type}
      rightChildren={
        !disableVisibility && (
          <Button
            id={`${props.id}-password-toggle`}
            buttonType="icon"
            onClick={toggle}
            style={visibilityStyle}
            className={cn(block("toggle"), visibilityClassName)}
          >
            {visibilityIcon}
          </Button>
        )
      }
    />
  );
};

const defaultProps: DefaultProps = {
  visibilityIcon: <FontIcon>remove_red_eye</FontIcon>,
  disableVisibility: false,
};

PasswordField.defaultProps = defaultProps;

export default forwardRef<HTMLInputElement, PasswordFieldProps>(
  (props, ref) => <PasswordField {...props} forwardedRef={ref} />
);
