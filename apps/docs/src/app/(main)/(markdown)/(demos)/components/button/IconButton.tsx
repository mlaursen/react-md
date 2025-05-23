import { Button } from "@react-md/core/button/Button";
import { SrOnly } from "@react-md/core/typography/SrOnly";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import { type ReactElement } from "react";

export default function IconButton(): ReactElement {
  return (
    <>
      <Button aria-label="Favorite" buttonType="icon">
        <FavoriteIcon />
      </Button>
      <Button theme="secondary" themeType="outline" buttonType="icon">
        <SrOnly>Favorite</SrOnly>
        <FavoriteIcon />
      </Button>
      <Button
        aria-label="Favorite"
        theme="primary"
        themeType="contained"
        buttonType="icon"
      >
        <FavoriteIcon />
      </Button>
      <Button aria-label="Favorite" buttonType="icon-square">
        <FavoriteIcon />
      </Button>
      <Button
        aria-label="Favorite"
        theme="secondary"
        themeType="outline"
        buttonType="icon-square"
      >
        <FavoriteIcon />
      </Button>
      <Button
        aria-label="Favorite"
        theme="primary"
        themeType="contained"
        buttonType="icon-square"
      >
        <FavoriteIcon />
      </Button>
    </>
  );
}
