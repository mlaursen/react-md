import { Button } from "react-md";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import { type ReactElement } from "react";

export default function IconButtonSizes(): ReactElement {
  return (
    <>
      <Button aria-label="Favorite" iconSize="small" buttonType="icon">
        <FavoriteIcon />
      </Button>
      <Button aria-label="Favorite" iconSize="normal" buttonType="icon">
        <FavoriteIcon />
      </Button>
      <Button aria-label="Favorite" iconSize="large" buttonType="icon">
        <FavoriteIcon />
      </Button>
      <Button
        aria-label="Favorite"
        buttonType="icon"
        style={{ fontSize: "2rem" }}
      >
        <FavoriteIcon />
      </Button>
    </>
  );
}
