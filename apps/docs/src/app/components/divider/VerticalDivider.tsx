import { AppBar, AppBarTitle, Divider } from "@react-md/core";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import { type ReactElement } from "react";

export default function VerticalDividerExample(): ReactElement {
  return (
    <AppBar
      theme="surface"
      style={{
        // these are the defaults
        "--rmd-divider-vertical-size": "0.125rem",
        "--rmd-divider-vertical-spacing": "auto 0.25rem",
        "--rmd-divider-max-size": "100%",
      }}
    >
      <FavoriteIcon />
      <Divider vertical />
      <AppBarTitle>Title</AppBarTitle>
    </AppBar>
  );
}
