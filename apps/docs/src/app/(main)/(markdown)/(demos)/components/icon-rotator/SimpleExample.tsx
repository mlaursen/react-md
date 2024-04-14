"use client";
import { Button } from "@react-md/core/button/Button";
import { IconRotator } from "@react-md/core/icon/IconRotator";
import { useToggle } from "@react-md/core/useToggle";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import { type ReactElement } from "react";

export default function SimpleExample(): ReactElement {
  const { toggled, toggle } = useToggle();
  return (
    <>
      <Button onClick={toggle}>Toggle</Button>
      <IconRotator rotated={toggled}>
        <FavoriteIcon />
      </IconRotator>
    </>
  );
}
