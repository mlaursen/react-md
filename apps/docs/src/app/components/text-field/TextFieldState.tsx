"use client";
import {
  Box,
  Form,
  Radio,
  TextField,
  box,
  useRadioGroup,
  type FormTheme,
  typography,
  Typography,
} from "@react-md/core";
import { type ReactElement } from "react";

export default function TextFieldState(): ReactElement {
  const { value: theme, getRadioProps } = useRadioGroup<FormTheme>({
    name: "theme",
    defaultValue: "outline",
  });
  return (
    <Form className={box({ stacked: true, align: "stretch" })}>
      <TextField label="Disabled" theme={theme} disabled />
      <TextField
        label="Read Only"
        theme={theme}
        readOnly
        defaultValue="Some text to display"
      />
      <TextField label="Active" theme={theme} active />
      <TextField label="Error" theme={theme} error />
      <TextField label="Normal" theme={theme} />
      <Box stacked disablePadding align="start" fullWidth>
        <Typography>Form Theme</Typography>
        {themes.map((theme) => (
          <Radio
            key={theme}
            {...getRadioProps(theme)}
            label={theme}
            className={typography({ type: null, textTransform: "capitalize" })}
          />
        ))}
      </Box>
    </Form>
  );
}

const themes: readonly FormTheme[] = ["underline", "filled", "outline"];
