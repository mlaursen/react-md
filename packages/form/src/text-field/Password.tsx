import React, {
  CSSProperties,
  forwardRef,
  isValidElement,
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  useCallback,
  useState,
} from "react";
import cn from "classnames";
import { Button } from "@react-md/button";
import { useIcon } from "@react-md/icon";
import { bem } from "@react-md/utils";

import { TextField, TextFieldProps } from "./TextField";

export interface ConfigurableVisibilityIcon {
  /**
   * The icon to display while the password is currently visible as plain text.
   */
  visible: ReactNode;

  /**
   * The icon to display while the password is currently invisible as the
   * password input.
   */
  invisible: ReactNode;
}

export type GetVisibilityIcon = (type: "text" | "password") => ReactNode;

export interface PasswordProps extends Omit<TextFieldProps, "type"> {
  /**
   * The icon to use to toggle the visibility of the password by changing the
   * input type to text temporarily. This can either be a renderable React node
   * or an object for the `visible` and `invisible` states.
   */
  visibilityIcon?: ReactNode | ConfigurableVisibilityIcon;

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
   *
   * Note: The visibility button is being treated as a [toggle
   * button](https://www.w3.org/TR/wai-aria-practices-1.1/#button) which means
   * that the label **should not change** based on the visibility state and
   * should not include the word "toggle" since it will be redundant.
   */
  visibilityLabel?: string;

  /**
   * Boolean if the visibility toggle feature should be disabled.
   */
  disableVisibility?: boolean;

  /**
   * An optional function to return the current icon to display within the
   * visibility toggle button for additional control.
   *
   * Depending on the customization needs, it will probably be easier to just
   * implement your own `Password` component using the native `TextField`.
   */
  getVisibilityIcon?: GetVisibilityIcon;

  /**
   * An optional function to call when the visibility button has been clicked.
   * This is only a simple `MouseEventHandler` for the button element.
   *
   * Depending on the customization needs, it will probably be easier to just
   * implement your own `Password` component using the native `TextField`.
   */
  onVisibilityClick?: MouseEventHandler<HTMLButtonElement>;
}

const block = bem("rmd-password");

function isConfigurableIcon(
  icon: ReactNode | ConfigurableVisibilityIcon
): icon is ConfigurableVisibilityIcon {
  return !!icon && !isValidElement(icon);
}

/**
 * This component is a simple wrapper of the `TextField` that can only be
 * rendered for password inputs. There is built-in functionality to be able to
 * temporarily show the password's value by swapping the `type` to `"text"`.
 */
export const Password = forwardRef<HTMLInputElement, PasswordProps>(
  function Password(
    {
      className,
      inputClassName,
      visibilityIcon: propVisibilityIcon,
      visibilityStyle,
      visibilityClassName,
      visibilityLabel = "Show password",
      onVisibilityClick,
      getVisibilityIcon,
      disableVisibility = false,
      rightChildren: propRightChildren,
      isRightAddon = disableVisibility,
      ...props
    },
    ref
  ) {
    const { id } = props;
    const [type, setType] = useState<"password" | "text">("password");
    const toggle = useCallback(
      (event: MouseEvent<HTMLButtonElement>) => {
        if (onVisibilityClick) {
          onVisibilityClick(event);
        }

        setType((prevType) => (prevType === "password" ? "text" : "password"));
      },
      [onVisibilityClick]
    );

    const visible = type === "text";
    let visibilityIcon = useIcon("password", propVisibilityIcon);
    if (isConfigurableIcon(propVisibilityIcon)) {
      visibilityIcon = visible
        ? propVisibilityIcon.visible
        : propVisibilityIcon.invisible;
    }

    let rightChildren: ReactNode = propRightChildren;
    if (!disableVisibility) {
      rightChildren = (
        <Button
          id={`${id}-password-toggle`}
          aria-label={visibilityLabel}
          aria-pressed={visible}
          buttonType="icon"
          onClick={toggle}
          style={visibilityStyle}
          className={cn(block("toggle"), visibilityClassName)}
        >
          {typeof getVisibilityIcon === "function"
            ? getVisibilityIcon(type)
            : visibilityIcon}
        </Button>
      );
    }

    return (
      <TextField
        {...props}
        className={cn(block({ offset: !disableVisibility }), className)}
        inputClassName={cn(
          block("input", { offset: !disableVisibility }),
          inputClassName
        )}
        ref={ref}
        type={type}
        isRightAddon={isRightAddon}
        rightChildren={rightChildren}
      />
    );
  }
);

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    Password.propTypes = {
      id: PropTypes.string.isRequired,
      className: PropTypes.string,
      inputClassName: PropTypes.string,
      visibilityIcon: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.shape({
          visible: PropTypes.node,
          invisible: PropTypes.node,
        }),
      ]),
      visibilityStyle: PropTypes.object,
      visibilityClassName: PropTypes.string,
      visibilityLabel: PropTypes.string,
      disableVisibility: PropTypes.bool,
      onVisibilityClick: PropTypes.func,
      getVisibilityIcon: PropTypes.func,
    };
  } catch (e) {}
}
