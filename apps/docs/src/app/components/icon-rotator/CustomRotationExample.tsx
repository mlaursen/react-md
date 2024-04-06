"use client";
import { Box, Button, IconRotator, useToggle } from "react-md";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import { type ReactElement } from "react";

import styles from "./CustomRotationExample.module.scss";

export default function CustomRotationExample(): ReactElement {
  const { toggled, toggle } = useToggle();

  return (
    <Box disablePadding className={styles.container}>
      <Button onClick={toggle}>Toggle</Button>
      <IconRotator rotated={toggled}>
        <FavoriteIcon />
      </IconRotator>
    </Box>
  );
}
