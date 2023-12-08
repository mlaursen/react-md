import { AppBar, AppBarTitle, Button } from "@react-md/core";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import { type ReactElement } from "react";

export default function StackedAppBarsExample(): ReactElement {
  return (
    <AppBar stacked theme="surface">
      <AppBar height="dense" theme="clear">
        <AppBarTitle>Title</AppBarTitle>
      </AppBar>
      <AppBar height="dense" theme="clear">
        <AppBarTitle as="span" />
        <Button aria-label="Favorite" buttonType="icon" iconSize="small">
          <FavoriteIcon />
        </Button>
      </AppBar>
    </AppBar>
  );
}
