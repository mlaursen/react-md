import React, {
  useState,
  useCallback,
  ChangeEvent,
  FocusEvent,
  InputHTMLAttributes,
  FocusEventHandler,
  ChangeEventHandler,
  ReactNode,
} from "react";
import { InfoSVGIcon } from "@react-md/material-icons";

type InputAttributes = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  "min" | "max" | "onBlur" | "onChange"
>;

interface NumberInputOptions extends InputAttributes {
  min?: number;
  max?: number;
  fixOnBlur?: "zeros" | "none" | true;
  defaultValue?: number;
  errorIcon?: ReactNode;
}

function withinRange(
  value: number,
  min: number | undefined,
  max: number | undefined
): number {
  let nextValue = value;
  if (typeof min === "number") {
    nextValue = Math.max(min, nextValue);
  }

  if (typeof max === "number") {
    nextValue = Math.min(max, nextValue);
  }

  return nextValue;
}

interface InputProps {
  min?: number;
  max?: number;
  value: string;
  error: boolean;
  type: "number";
  onBlur: FocusEventHandler<HTMLInputElement>;
  onChange: ChangeEventHandler<HTMLInputElement>;
  rightChildren: ReactNode;
}
type ErrorMessage = string;
type ResetValue = () => void;
type ReturnValue = [number | undefined, InputProps, ErrorMessage, ResetValue];

/**
 * This is a pretty hacked together first implementation for a `useValidity`
 * hook I'm planning on making for simple form validation. Needs a lot of work
 * right now though.
 */
export default function useNumberInput({
  min,
  max,
  defaultValue,
  onBlur,
  onChange,
  fixOnBlur = true,
  errorIcon = <InfoSVGIcon />,
}: NumberInputOptions): ReturnValue {
  const [value, setValue] = useState(`${defaultValue ?? ""}`);
  const [number, setNumber] = useState(defaultValue);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(event);
      }

      const { value } = event.currentTarget;
      event.currentTarget.checkValidity();
      setValue(value);
      setErrorMessage(event.currentTarget.validationMessage);
    },
    [onChange]
  );

  const reset = useCallback(() => {
    setValue(`${defaultValue ?? ""}`);
    setNumber(defaultValue);
  }, [defaultValue]);

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      if (onBlur) {
        onBlur(event);
      }

      const { value, valueAsNumber } = event.currentTarget;
      if (fixOnBlur === "none" || fixOnBlur === "zeros") {
        const isValid = event.currentTarget.checkValidity();
        if (fixOnBlur === "zeros") {
          const fixedValue = value.replace(/^0+([0-9]*)$/, "$1");
          setValue(fixedValue);
        }

        if (!isValid) {
          setErrorMessage(event.currentTarget.validationMessage);
          return;
        }
      }

      setErrorMessage("");

      const number = withinRange(valueAsNumber, min, max);
      if (!value || Number.isNaN(number)) {
        reset();
        return;
      }

      setNumber(number);
      setValue(`${number}`);
    },
    [fixOnBlur, max, min, onBlur, reset]
  );

  return [
    number,
    {
      min,
      max,
      type: "number",
      value,
      error: !!errorMessage,
      onBlur: handleBlur,
      onChange: handleChange,
      rightChildren: !!errorMessage && errorIcon,
    },
    errorMessage,
    reset,
  ];
}
