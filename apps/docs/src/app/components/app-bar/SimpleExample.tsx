import { AppBar, AppBarTitle, Button } from "react-md";
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
