/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Box,
  Button,
  Form,
  TextField,
  box,
  defaultGetErrorIcon,
  defaultGetErrorMessage,
  useTextField,
} from "@react-md/core";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import { type ReactElement } from "react";

export default function TextFieldHookExample(): ReactElement {
  const { value, error, errorMessage, fieldRef, reset, setState, fieldProps } =
    useTextField({
      name: "example",
      counter: true,
      required: true,
      helpText: "Alpha-numeric characters only",
      pattern: "^[0-9A-Za-z]+$",
      minLength: 10,
      maxLength: 60,
      // This can be used to configure the error icon that gets placed as a
      // rightAddon
      getErrorIcon(options) {
        const { error, errorMessage, errorIcon } = options;
        if (!error) {
          return <FavoriteIcon />;
        }

        return defaultGetErrorIcon(options);
      },
      // This can be used to set a custom validation message when there
      // is an error in the input
      getErrorMessage(options) {
        const {
          isBlurEvent,
          isNumber,
          validationMessage,
          validationType,
          validity,
          value,
          maxLength,
          minLength,
          pattern,
          required,
        } = options;

        return defaultGetErrorMessage(options);
      },
    });
  return (
    <Form
      onReset={reset}
      className={box({
        stacked: true,
        align: "stretch",
        disablePadding: true,
        fullWidth: true,
      })}
    >
      <TextField label="Label" placeholder="Placeholder" {...fieldProps} />
      <Box disablePadding disableWrap justify="space-between">
        <Button type="reset" theme="warning" themeType="outline">
          Reset
        </Button>
        <Button type="submit" theme="primary" themeType="contained">
          Submit
        </Button>
      </Box>
    </Form>
  );
}
