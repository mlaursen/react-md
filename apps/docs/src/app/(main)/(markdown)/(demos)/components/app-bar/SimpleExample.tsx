import { AppBar } from "@react-md/core/app-bar/AppBar";
import { AppBarTitle } from "@react-md/core/app-bar/AppBarTitle";
import { Button } from "@react-md/core/button/Button";
import MoreVertOutlinedIcon from "@react-md/material-icons/MoreVertOutlinedIcon";
import SearchIcon from "@react-md/material-icons/SearchIcon";
import { type ReactElement } from "react";

export default function SimpleExample(): ReactElement {
  return (
    <AppBar>
      <AppBarTitle>Title</AppBarTitle>
      <Button aria-label="Search" buttonType="icon">
        <SearchIcon />
      </Button>
      <Button aria-label="Options" buttonType="icon">
        <MoreVertOutlinedIcon />
      </Button>
    </AppBar>
  );
}
