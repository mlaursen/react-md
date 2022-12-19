import { Typography } from "@react-md/core";
import type {
  FormMessageContainerProps,
  GetErrorMessage,
} from "@react-md/form";
import {
  Fieldset,
  Form,
  Legend,
  Slider,
  TextField,
  useNumberField,
} from "@react-md/form";
import type { ReactElement } from "react";
import { useId } from "react";

import styles from "./LinkedWithATextField.module.scss";

const min = 0;
const max = 255;
const messageContainerProps: FormMessageContainerProps = {
  className: styles.field,
};
const getErrorMessage: GetErrorMessage = (options) => {
  const { validity } = options;
  if (validity.rangeUnderflow || validity.rangeOverflow || validity.badInput) {
    return "Must be a number between 0 and 255.";
  }

  return "";
};

export function LinkedWithATextField(): ReactElement {
  const {
    value: r,
    fieldProps: rFieldProps,
    setState: rSetState,
  } = useNumberField({
    min,
    max,
    name: "red",
    defaultValue: 0,
    getErrorMessage,
  });
  const {
    value: g,
    fieldProps: gFieldProps,
    setState: gSetState,
  } = useNumberField({
    min,
    max,
    name: "green",
    defaultValue: 150,
  });
  const {
    value: b,
    fieldProps: bFieldProps,
    setState: bSetState,
  } = useNumberField({
    min,
    max,
    name: "blue",
    defaultValue: 136,
  });
  const rLabelId = useId();
  const gLabelId = useId();
  const bLabelId = useId();

  return (
    <Form className={styles.container}>
      <Fieldset>
        <Legend>RGB Value</Legend>
        <Slider
          aria-labelledby={rLabelId}
          className={styles.row}
          min={min}
          max={max}
          value={r}
          setValue={(nextValue) => {
            rSetState({
              value: typeof nextValue === "function" ? nextValue(r) : nextValue,
              error: false,
              errorMessage: "",
            });
          }}
          beforeAddon={
            <Typography id={rLabelId} as="span" aria-label="Red">
              R
            </Typography>
          }
          afterAddon={
            <TextField
              {...rFieldProps}
              messageContainerProps={messageContainerProps}
            />
          }
        />
        <Slider
          aria-labelledby={gLabelId}
          className={styles.row}
          min={min}
          max={max}
          value={g}
          setValue={(nextValue) => {
            gSetState({
              value: typeof nextValue === "function" ? nextValue(g) : nextValue,
              error: false,
              errorMessage: "",
            });
          }}
          beforeAddon={
            <Typography id={rLabelId} as="span" aria-label="Green">
              G
            </Typography>
          }
          afterAddon={
            <TextField
              {...gFieldProps}
              messageContainerProps={messageContainerProps}
            />
          }
        />
        <Slider
          aria-labelledby={bLabelId}
          className={styles.row}
          min={min}
          max={max}
          value={b}
          setValue={(nextValue) => {
            bSetState({
              value: typeof nextValue === "function" ? nextValue(b) : nextValue,
              error: false,
              errorMessage: "",
            });
          }}
          beforeAddon={
            <Typography id={rLabelId} as="span" aria-label="Blue">
              B
            </Typography>
          }
          afterAddon={
            <TextField
              {...bFieldProps}
              messageContainerProps={messageContainerProps}
            />
          }
        />
      </Fieldset>
      <div
        style={{
          height: 300,
          backgroundColor: `rgb(${r}, ${g}, ${b})`,
        }}
      />
    </Form>
  );
}
