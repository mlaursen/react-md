"use client";
import { cnb } from "cnbuilder";
import type { ReactNode } from "react";
import { forwardRef } from "react";
import type { ButtonProps } from "../button";
import { Button } from "../button";
import { useIcon } from "../icon";
import type { PropsWithRef } from "../types";
import { useEnsuredId } from "../useEnsuredId";
import { useToggle } from "../useToggle";
import { bem } from "../utils";
import type { TextFieldProps } from "./TextField";
import { TextField } from "./TextField";

const styles = bem("rmd-password");

/**
 * @example
 * Simple Example
 * ```tsx
 * const getVisibilityIcon: GetPasswordVisibilityIcon = (isPasswordVisible) => {
 *   if (isPasswordVisible) {
 *     return <SecurityIcon />;
 *   }
 *
 *   return <RemoveRedEyeIcon />;
 * };
 * ```
 *
 * @param isPasswordVisible - `true` when the password is visible and in plain
 * text
 * @returns a custom icon to use for the password visibility toggle.
 */
export type GetPasswordVisibilityIcon = (
  isPasswordVisible: boolean
) => ReactNode;

/**
 * @example
 * Simple Example
 * ```tsx
 * const visibilityIcon: ConfigurableVisibilityIcon = {
 *   visible: <SecurityIcon />,
 *   invisible: <RemoveRedEyeIcon />,
 * };
 * ```
 */
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

export interface PasswordProps
  extends Omit<TextFieldProps, "type" | "rightAddon"> {
  /**
   * @defaultValue `"password"`
   * @remarks \@since 6.0.0 Defaults to `"password"`
   */
  name?: string;

  /**
   * @example
   * Configurable Visibility Icon Object
   * ```tsx
   * <Password
   *   {...props}
   *   visibilityIcon={{
   *     visible: <SecurityIcon />,
   *     invisible: <RemoveRedEyeIcon />,
   *   }}
   * />
   * ```
   *
   * @example
   * Get Password Visibility Icon Function
   * ```tsx
   * <Password
   *   {...props}
   *   visibilityIcon={(isPasswordVisible) => {
   *     if (isPasswordVisible) {
   *       return <SecurityIcon />;
   *     }
   *
   *     return <RemoveRedEyeIcon />;
   *   }}
   * />
   * ```
   *
   * @example
   * Custom Icon
   * ```tsx
   * <Password
   *   {...props}
   *   visibilityIcon={<SomeCustomComponent />}
   * />
   * ```
   */
  visibilityIcon?:
    | ConfigurableVisibilityIcon
    | GetPasswordVisibilityIcon
    | ReactNode;

  /**
   * The `aria-label` to use for the password visibility icon button.
   *
   * @defaultValue `"Show password"`
   */
  visibilityLabel?: string;

  /**
   * Any props that should be passed to the password visibility icon button. If
   * `id`, `buttonType`, `aria-label`, `aria-pressed`, or `children` are
   * provided here, they will override the default implementation.
   */
  visibilityProps?: PropsWithRef<ButtonProps, HTMLButtonElement>;
}

/**
 * **Client Component**
 *
 * @example
 * Simple Example
 * ```tsx
 * import { Password } from "@react-md/core";
 *
 * function Example(): ReactElement {
 *   return (
 *     <Password
 *       label="Password"
 *       name="password"
 *       required
 *     />
 *   );
 * }
 * ```
 */
export const Password = forwardRef<HTMLInputElement, PasswordProps>(
  function Password(props, ref) {
    const {
      id: propId,
      name = "password",
      className,
      inputClassName,
      visibilityIcon: propVisibilityIcon,
      visibilityLabel = "Show password",
      visibilityProps,
      ...remaining
    } = props;
    const { toggled: isPasswordVisible, toggle } = useToggle(false);

    let currentVisibilityIcon: ReactNode;
    if (
      propVisibilityIcon &&
      typeof propVisibilityIcon === "object" &&
      "visible" in propVisibilityIcon
    ) {
      currentVisibilityIcon = isPasswordVisible
        ? propVisibilityIcon.visible
        : propVisibilityIcon.invisible;
    } else if (typeof propVisibilityIcon === "function") {
      currentVisibilityIcon = propVisibilityIcon(isPasswordVisible);
    } else {
      currentVisibilityIcon = propVisibilityIcon;
    }

    const id = useEnsuredId(propId, "password");
    const visibilityIcon = useIcon("password", currentVisibilityIcon);

    return (
      <TextField
        {...remaining}
        ref={ref}
        name={name}
        type={isPasswordVisible ? "text" : "password"}
        className={cnb(styles({ offset: true }), className)}
        inputClassName={cnb(styles("input", { offset: true }), inputClassName)}
        rightAddon={
          <Button
            id={`${id}-toggle`}
            buttonType="icon"
            aria-label={visibilityLabel}
            aria-pressed={isPasswordVisible}
            // allow all props except the onClick, className, and aria-pressed to
            // be overridden. onClick can only stop default behavior with
            // `event.stopPropagation()`
            {...visibilityProps}
            className={cnb(styles("toggle"), visibilityProps?.className)}
            onClick={(event) => {
              visibilityProps?.onClick?.(event);
              if (event.isPropagationStopped()) {
                return;
              }

              toggle();
            }}
          >
            {visibilityProps?.children ?? visibilityIcon}
          </Button>
        }
        disableRightAddonStyles
      />
    );
  }
);
