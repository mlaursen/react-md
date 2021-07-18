import React, { ReactElement, ReactNode } from "react";
import { Control, Controller, RegisterOptions } from "react-hook-form";
import {
  TextFieldWithMessage,
  TextFieldWithMessageProps,
} from "@react-md/form";

export interface ExampleFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  title: string;
  developer: "yes" | "no" | "";
  cool: "yes" | "";
  save: "yes" | "";
}

export interface ControllerTextFieldProps
  extends Omit<TextFieldWithMessageProps, "onFocus" | "onBlur"> {
  control: Control<ExampleFormData>;
  rules?: RegisterOptions;

  name: keyof ExampleFormData;
  error: boolean;
  message?: ReactNode;
}

export default function ControllerTextField({
  id,
  message,
  control,
  rules,
  name,
  ...props
}: ControllerTextFieldProps): ReactElement | null {
  const { error } = props;
  const messageId = `${id}-message`;
  return (
    <Controller
      control={control}
      rules={rules}
      name={name}
      defaultValue=""
      render={({ field }) => (
        <TextFieldWithMessage
          {...field}
          {...props}
          id={id}
          aria-describedby={messageId}
          messageProps={{
            id: messageId,
            error,
            children: message,
          }}
        />
      )}
    />
  );
}
