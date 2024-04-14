"use client";
import { Avatar } from "@react-md/core/avatar/Avatar";
import { Box } from "@react-md/core/box/Box";
import { box } from "@react-md/core/box/styles";
import { Button } from "@react-md/core/button/Button";
import { Form } from "@react-md/core/form/Form";
import { Radio } from "@react-md/core/form/Radio";
import { TextField } from "@react-md/core/form/TextField";
import { type FormTheme } from "@react-md/core/form/types";
import { useRadioGroup } from "@react-md/core/form/useRadioGroup";
import { Typography } from "@react-md/core/typography/Typography";
import { typography } from "@react-md/core/typography/typographyStyles";
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
