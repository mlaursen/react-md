"use client";
import { Box } from "@react-md/core/box/Box";
import { Button } from "@react-md/core/button/Button";
import { IconRotator } from "@react-md/core/icon/IconRotator";
import { useToggle } from "@react-md/core/useToggle";
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
