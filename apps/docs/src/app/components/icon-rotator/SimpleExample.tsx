"use client";
import { Button, IconRotator, useToggle } from "react-md";
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
