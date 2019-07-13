import React, {
  CSSProperties,
  FC,
  forwardRef,
  ReactNode,
  useCallback,
  useState,
} from "react";
import cn from "classnames";
import { Button } from "@react-md/button";
import { FontIcon } from "@react-md/icon";
import { bem } from "@react-md/theme";
import { Omit, WithForwardedRef } from "@react-md/utils";

import TextField, { TextFieldProps } from "./TextField";

export interface PasswordProps
  extends Omit<TextFieldProps, "type" | "rightChildren"> {
  /**
   * The icon to use to toggle the visibility of the password by changing the
   * input type to text temporarily.
   */
  visibilityIcon?: ReactNode;

  /**
   * An optional style to apply to the visibility toggle button.
   */
  visibilityStyle?: CSSProperties;

  /**
   * An optional classname to apply to the visibility toggle button.
   */
  visibilityClassName?: string;

  /**
   * An optional `aria-label` to apply to the visibility toggle button.
   */
  visibilityLabel?: string;

  /**
   * Boolean if the visibility toggle feature should be disabled.
   */
  disableVisibility?: boolean;
}

type WithRef = WithForwardedRef<HTMLInputElement>;
type DefaultProps = Required<
  Pick<
    PasswordProps,
    "visibilityIcon" | "visibilityLabel" | "disableVisibility"
  >
>;
type WithDefaultProps = PasswordProps & DefaultProps & WithRef;

const block = bem("rmd-password");

/**
 * This component is a simple wrapper of the `TextField` that can only be rendered
 * for password inputs. There is built-in functionality to be able to temporarily
 * show the password's value by swapping the `type` to `"text"`.
 */
const Password: FC<PasswordProps & WithRef> = providedProps => {
  const {
    className,
    inputClassName,
    forwardedRef,
    visibilityIcon,
    disableVisibility,
    visibilityStyle,
    visibilityClassName,
    visibilityLabel,
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
      inputClassName={cn(
        block("input", { offset: !disableVisibility }),
        inputClassName
      )}
      ref={forwardedRef}
      type={type}
      isRightAddon={false}
      rightChildren={
        !disableVisibility && (
          <Button
            id={`${props.id}-password-toggle`}
            aria-label={visibilityLabel}
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
  visibilityLabel: "Temporarily show password",
  disableVisibility: false,
};

Password.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  Password.displayName = "Password";

  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    Password.propTypes = {
      id: PropTypes.string.isRequired,
      visibilityIcon: PropTypes.node,
      visibilityStyle: PropTypes.object,
      visibilityClassName: PropTypes.string,
      visibilityLabel: PropTypes.string,
      disableVisibility: PropTypes.bool,
    };
  }
}

export default forwardRef<HTMLInputElement, PasswordProps>((props, ref) => (
  <Password {...props} forwardedRef={ref} />
));
