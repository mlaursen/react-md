import React, { forwardRef } from "react";
import cn from "classnames";
import { TextField, TextFieldProps } from "@react-md/form";
import { bem } from "@react-md/utils";

const styles = bem("rmd-time-input");

/** @remarks \@since 2.7.0 */
export interface TimeInputProps extends TextFieldProps {
  milliseconds?: boolean;
}

/** @remarks \@since 2.7.0 */
export type TimeInputBehaviorHandlers = Pick<
  TimeInputProps,
  "onBlur" | "onFocus" | "onChange" | "onKeyDown"
>;

/** @remarks \@since 2.7.0 */
export type RequiredTimeInputProps = Required<
  TimeInputBehaviorHandlers & { value: string }
>;

/** @remarks \@since 2.7.0 */
export const TimeInput = forwardRef<HTMLInputElement, TimeInputProps>(
  function TimeInput({ inputClassName, milliseconds = false, ...props }, ref) {
    return (
      <TextField
        {...props}
        ref={ref}
        inputClassName={cn(styles({ ms: milliseconds }), inputClassName)}
      />
    );
  }
);
