"use client";
import { cnb } from "cnbuilder";
import type { CSSProperties, HTMLAttributes, InputHTMLAttributes } from "react";
import { forwardRef, useState } from "react";
import type { PropsWithRef } from "../types";
import { useEnsuredId } from "../useEnsuredId";
import { bem } from "../utils";
import { FormMessageContainer } from "./FormMessageContainer";
import type { InputToggleLabelProps } from "./InputToggle";
import { Label } from "./Label";
import { SwitchTrack } from "./SwitchTrack";
import type {
  FormComponentStates,
  FormMessageContainerExtension,
} from "./types";

declare module "react" {
  interface CSSProperties {
    "--rmd-switch-track-background-color"?: string;
    "--rmd-switch-ball-background-color"?: string;
  }
}

const styles = bem("rmd-switch");

const noop = (): void => {
  // do nothing
};

/**
 * @remarks \@since 6.0.0 Added `containerProps` and support for the
 * `FormMessage` behavior.
 */
export interface SwitchProps
  extends InputHTMLAttributes<HTMLInputElement>,
    InputToggleLabelProps,
    FormMessageContainerExtension,
    FormComponentStates {
  containerProps?: PropsWithRef<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  trackProps?: PropsWithRef<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  trackStyle?: CSSProperties;
  trackClassName?: string;
  ballProps?: PropsWithRef<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
  ballStyle?: CSSProperties;
  ballClassName?: string;
}

/**
 * **Client Component**
 *
 * @example
 * Simple Example
 * ```tsx
 * import { Form, Switch } from "@react-md/core";
 * import type { ReactElement } from "react";
 * import { useState } from "react";
 *
 * function Example(): ReactElement {
 *   const [checked, setChecked] = useState(false);
 *
 *   return (
 *     <Form>
 *       <Switch
 *         label="Label"
 *         name="enabled"
 *         checked={checked}
 *         onChange={(event) => setChecked(event.currentTarget.checked)}
 *       />
 *     </Form>
 *   );
 * }
 * ```
 *
 * @remarks \@since 6.0.0 Added support for `FormMessage` behavior.
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  function Switch(props, ref) {
    const {
      id: propId,
      label,
      labelProps,
      style,
      className,
      containerProps,
      ballProps,
      ballStyle,
      ballClassName,
      trackProps,
      trackStyle,
      trackClassName,
      messageProps,
      messageContainerProps,
      disableLabelGap = false,
      error = false,
      active = false,
      stacked = false,
      iconAfter = false,
      disabled = false,
      readOnly = false,
      onChange = noop,
      defaultChecked = false,
      ...remaining
    } = props;
    const id = useEnsuredId(propId, "switch");
    const [isChecked, setChecked] = useState(defaultChecked);
    const checked = props.checked ?? isChecked;

    return (
      <FormMessageContainer
        {...messageContainerProps}
        messageProps={messageProps}
      >
        <Label
          style={style}
          {...labelProps}
          className={cnb(className, labelProps?.className)}
          gap={!disableLabelGap}
          stacked={stacked}
          reversed={!iconAfter}
          active={active}
          error={error}
          disabled={disabled}
        >
          {label}
          <div
            {...containerProps}
            className={cnb(
              styles({ clickable: !disabled && !readOnly }),
              containerProps?.className
            )}
          >
            <SwitchTrack
              style={trackStyle}
              {...trackProps}
              className={cnb(trackClassName, trackProps?.className)}
              disabled={disabled}
              ballProps={ballProps}
              ballStyle={ballStyle}
              ballClassName={ballClassName}
            >
              <input
                {...remaining}
                id={id}
                ref={ref}
                role="switch"
                type="checkbox"
                className={cnb(
                  "rmd-switch__input rmd-hidden-input",
                  disabled && "rmd-hidden-input--disabled"
                )}
                disabled={disabled}
                checked={checked}
                onChange={(event) => {
                  // checkboxes do not natively support the readOnly attribute, so
                  // polyfill it in. can't use `disabled` since the checkbox's
                  // checked/unchecked state would then not be submitted in forms.
                  if (readOnly) {
                    event.preventDefault();
                    event.stopPropagation();
                    return;
                  }

                  onChange(event);
                  if (typeof props.checked === "undefined") {
                    setChecked(event.currentTarget.checked);
                  }
                }}
              />
            </SwitchTrack>
          </div>
        </Label>
      </FormMessageContainer>
    );
  }
);
