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
import styles from "./NonIconAddons.module.scss";

export default function NonIconAddons(): ReactElement {
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
        className={styles.avatarField}
        leftAddon={<Avatar>B</Avatar>}
        rightAddon={<Avatar>A</Avatar>}
        defaultValue="Here's some long default text to show padding"
      />
      <TextField
        label="Label"
        theme={theme}
        placeholder="Placeholder"
        className={styles.buttonField}
        rightAddon={
          <Button aria-label="Favorite" buttonType="icon" iconSize="small">
            <FavoriteIcon />
          </Button>
        }
        // addons are normally presentational without pointer events, so set
        // `pointerEvents: true` to allow them for clickable elements
        rightAddonProps={{ pointerEvents: true }}
        defaultValue="Here's some long default text to show padding"
      />
      <TextField
        label="Label"
        theme={theme}
        placeholder="Placeholder"
        className={styles.buttonField}
        rightAddon={
          <Button aria-label="Favorite" buttonType="icon">
            <FavoriteIcon />
          </Button>
        }
        // addons are normally presentational without pointer events, so set
        // `pointerEvents: true` to allow them for clickable elements
        rightAddonProps={{ pointerEvents: true }}
        defaultValue="Here's some long default text to show padding"
      />
      <TextField
        label="Label"
        theme={theme}
        placeholder="Placeholder"
        rightAddon={
          <Button aria-label="Favorite" buttonType="icon">
            <FavoriteIcon />
          </Button>
        }
        disableRightAddonStyles
        defaultValue="Here's some long default text to show padding"
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
