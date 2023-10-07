"use client";
import {
  Avatar,
  Box,
  Form,
  Radio,
  TextField,
  Typography,
  box,
  typography,
  useRadioGroup,
  type FormTheme,
} from "@react-md/core";
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
