"use client";

import { Box } from "@react-md/core/box/Box";
import { box } from "@react-md/core/box/styles";
import { Form } from "@react-md/core/form/Form";
import { Radio } from "@react-md/core/form/Radio";
import { TextField } from "@react-md/core/form/TextField";
import { type FormTheme } from "@react-md/core/form/types";
import { useRadioGroup } from "@react-md/core/form/useRadioGroup";
import { Typography } from "@react-md/core/typography/Typography";
import { typography } from "@react-md/core/typography/typographyStyles";
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
