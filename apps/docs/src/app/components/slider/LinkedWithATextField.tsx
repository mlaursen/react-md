"use client";
import {
  Form,
  Slider,
  TextField,
  Typography,
  box,
  useNumberField,
  type GetErrorMessage,
} from "@react-md/core";
import { useId, type ReactElement } from "react";
import styles from "./LinkedWithATextField.module.scss";

const min = 0;
const max = 255;
const step = 1;
const getErrorMessage: GetErrorMessage = (options) => {
  const { validity } = options;
  if (validity.rangeUnderflow || validity.rangeOverflow || validity.badInput) {
    return `Must be a number between ${min} and ${max}.`;
  }

  return "";
};

export default function LinkedWithATextField(): ReactElement {
  const { value, fieldProps, setState } = useNumberField({
    min,
    max,
    name: "red",
    defaultValue: 0,
    getErrorMessage,
  });
  const labelId = useId();

  return (
    <Form className={box({ fullWidth: true })}>
      <Slider
        aria-labelledby={labelId}
        className={styles.slider}
        min={min}
        max={max}
        step={step}
        value={value}
        setValue={(nextValue) => {
          setState({
            value:
              typeof nextValue === "function" ? nextValue(value) : nextValue,
            error: false,
            errorMessage: "",
          });
        }}
        beforeAddon={
          <Typography
            id={labelId}
            as="span"
            aria-label="Red"
            className={styles.label}
          >
            R
          </Typography>
        }
        afterAddon={
          <TextField
            {...fieldProps}
            messageContainerProps={{
              className: styles.container,
            }}
          />
        }
      />
    </Form>
  );
}