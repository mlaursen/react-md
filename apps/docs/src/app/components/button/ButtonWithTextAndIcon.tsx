import { Button } from "@react-md/core";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import { type ReactElement } from "react";

export default function ButtonWithTextAndIcon(): ReactElement {
  return (
    <>
      <Button>
        <FavoriteIcon />
        Text
      </Button>
      <Button theme="primary" themeType="outline">
        Text
        <FavoriteIcon />
      </Button>
      <Button theme="secondary" themeType="contained">
        <FavoriteIcon />
        Text
        <FavoriteIcon />
      </Button>
    </>
  );
}
