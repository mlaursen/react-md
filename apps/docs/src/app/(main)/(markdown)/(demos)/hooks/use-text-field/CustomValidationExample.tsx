"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
import { TextField } from "@react-md/core/form/TextField";
import { useTextField } from "@react-md/core/form/useTextField";
import { defaultGetErrorMessage } from "@react-md/core/form/validation";
import { type ReactElement } from "react";

export default function CustomValidationExample(): ReactElement {
  const { fieldProps } = useTextField({
    name: "example",
    pattern: "^[A-Za-z,! ]+$",
    required: true,
    minLength: 4,
    maxLength: 20,
    getErrorMessage(options) {
      const {
        value,
        pattern,
        required,
        minLength,
        maxLength,
        validity,
        validationMessage,
        isNumber,
        isBlurEvent,
        validationType,
      } = options;

      if (validity.tooLong) {
        return `No more than ${maxLength} characters.`;
      }

      if (validity.tooShort) {
        return `No more than ${minLength} characters.`;
      }

      if (validity.valueMissing) {
        return "This value is required!";
      }

      if (value === "bad value") {
        return "Value cannot be bad value";
      }

      return defaultGetErrorMessage(options);
    },
  });

  return <TextField {...fieldProps} label="Example" />;
}
