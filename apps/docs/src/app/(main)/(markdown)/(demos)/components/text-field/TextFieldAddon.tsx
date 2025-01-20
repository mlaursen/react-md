"use client";

import { Avatar } from "@react-md/core/avatar/Avatar";
import { Box } from "@react-md/core/box/Box";
import { box } from "@react-md/core/box/styles";
import { Form } from "@react-md/core/form/Form";
import { Radio } from "@react-md/core/form/Radio";
import { TextField } from "@react-md/core/form/TextField";
import { type FormTheme } from "@react-md/core/form/types";
import { useRadioGroup } from "@react-md/core/form/useRadioGroup";
import { Typography } from "@react-md/core/typography/Typography";
import { typography } from "@react-md/core/typography/typographyStyles";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import { type ReactElement } from "react";

export default function TextFieldAddon(): ReactElement {
  const { value: theme, getRadioProps } = useRadioGroup<FormTheme>({
    name: "theme",
    defaultValue: "outline",
  });

  return (
    <Form className={box({ stacked: true, align: "stretch" })}>
      <TextField
        label="Label"
        theme={theme}
        placeholder="Placeholder"
        leftAddon={<FavoriteIcon />}
      />
      <TextField
        label="Label"
        theme={theme}
        placeholder="Placeholder"
        rightAddon={<FavoriteIcon />}
      />
      <TextField
        label="Label"
        theme={theme}
        placeholder="Placeholder"
        leftAddon={<FavoriteIcon />}
        rightAddon={<Avatar size="icon">A</Avatar>}
      />
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
