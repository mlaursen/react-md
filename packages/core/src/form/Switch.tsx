import { cnb } from "cnbuilder";
import {
  forwardRef,
  type CSSProperties,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { type PropsWithRef } from "../types.js";
import { useEnsuredId } from "../useEnsuredId.js";
import { FormMessageContainer } from "./FormMessageContainer.js";
import { type InputToggleLabelProps } from "./InputToggle.js";
import { Label } from "./Label.js";
import { SwitchTrack } from "./SwitchTrack.js";
import { switchStyles } from "./switchStyles.js";
import {
  type FormComponentStates,
  type FormMessageContainerExtension,
} from "./types.js";

/**
 * @since 6.0.0 Added `containerProps` and support for the
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
  ballAddon?: ReactNode;
  ballProps?: PropsWithRef<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
  ballStyle?: CSSProperties;
  ballClassName?: string;
}

/**
 * @example Simple Example
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
 * @since 6.0.0 Added support for `FormMessage` behavior.
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
      ballAddon,
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
      ...remaining
    } = props;
    const id = useEnsuredId(propId, "switch");

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
            className={switchStyles({
              clickable: !disabled && !readOnly,
              className: containerProps?.className,
              currentColor: active || error,
            })}
          >
            <SwitchTrack
              style={trackStyle}
              {...trackProps}
              className={cnb(trackClassName, trackProps?.className)}
              disabled={disabled}
              ballAddon={ballAddon}
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
              />
            </SwitchTrack>
          </div>
        </Label>
      </FormMessageContainer>
    );
  }
);
