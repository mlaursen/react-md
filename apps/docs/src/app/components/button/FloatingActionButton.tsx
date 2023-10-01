import { Button } from "@react-md/core";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import type { ReactElement } from "react";

export default function FloatingActionButton(): ReactElement {
  return (
    <>
      <Button aria-label="Favorite" floating="top-left">
        <FavoriteIcon />
      </Button>
      <Button aria-label="Favorite" floating="top-right" theme="primary">
        <FavoriteIcon />
      </Button>
      <Button floating="bottom-left" themeType="outline" buttonType="text">
        Action
      </Button>
      <Button floating="bottom-right" themeType="flat" buttonType="text">
        Action
      </Button>
    </>
  );
}
