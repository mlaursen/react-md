"use client";
import {
  Avatar,
  Box,
  Button,
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
        leftAddon={<FavoriteIcon />}
        label="Label"
        placeholder="Placeholder"
        theme={theme}
      />
      <TextField
        rightAddon={<FavoriteIcon />}
        label="Label"
        placeholder="Placeholder"
        theme={theme}
      />
      <TextField
        leftAddon={<FavoriteIcon />}
        rightAddon={<Avatar size="icon">A</Avatar>}
        label="Label"
        placeholder="Placeholder"
        theme={theme}
      />
      <TextField
        leftAddon={<FavoriteIcon />}
        rightAddon={<Avatar>A</Avatar>}
        disableRightAddonStyles
        label="Label"
        placeholder="Placeholder"
        theme={theme}
      />
      <TextField
        label="Label"
        disableRightAddonStyles
        rightAddon={
          // iconSize is optional. It just makes it align with other icons when stacked
          <Button aria-label="Favorite" buttonType="icon" iconSize="small">
            <FavoriteIcon />
          </Button>
        }
        theme={theme}
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
