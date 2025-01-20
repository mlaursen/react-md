"use client";

import { Chip } from "@react-md/core/chip/Chip";
import { useToggle } from "@react-md/core/useToggle";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import { type ReactElement } from "react";

export default function CustomSelectedIconExample(): ReactElement {
  const { toggled, toggle } = useToggle(true);

  return (
    <Chip selectedIcon={<FavoriteIcon />} selected={toggled} onClick={toggle}>
      Chip
    </Chip>
  );
}
