import { AppBar, AppBarTitle } from "@react-md/app-bar";
import { box, Button, TextContainer } from "@react-md/core";
import MenuIcon from "@react-md/material-icons/MenuIcon";
import MoreVertIcon from "@react-md/material-icons/MoreVertIcon";
import SearchIcon from "@react-md/material-icons/SearchIcon";
import type { ReactElement } from "react";

export default function AppBarPage(): ReactElement {
  return (
    <TextContainer className={box()}>
      <AppBar>
        <AppBarTitle>Title</AppBarTitle>
      </AppBar>
      <AppBar>
        <Button buttonType="icon">
          <MenuIcon />
        </Button>
        <AppBarTitle keyline="nav">Title</AppBarTitle>
      </AppBar>
      <AppBar>
        <AppBarTitle keyline="list">Title</AppBarTitle>
        <Button buttonType="icon">
          <SearchIcon />
        </Button>
        <Button buttonType="icon">
          <MoreVertIcon />
        </Button>
      </AppBar>
      <AppBar theme="secondary">
        <AppBarTitle keyline="list">Title</AppBarTitle>
        <Button buttonType="icon">
          <SearchIcon />
        </Button>
        <Button buttonType="icon">
          <MoreVertIcon />
        </Button>
      </AppBar>
      <AppBar theme="surface">
        <AppBarTitle keyline="list">Title</AppBarTitle>
        <Button buttonType="icon">
          <SearchIcon />
        </Button>
        <Button buttonType="icon">
          <MoreVertIcon />
        </Button>
      </AppBar>
      <AppBar theme="clear">
        <AppBarTitle keyline="list">Title</AppBarTitle>
        <Button buttonType="icon">
          <SearchIcon />
        </Button>
        <Button buttonType="icon">
          <MoreVertIcon />
        </Button>
      </AppBar>
      <AppBar stacked>
        <AppBar as="div">
          <AppBarTitle keyline="list">Title</AppBarTitle>
          <Button buttonType="icon">
            <SearchIcon />
          </Button>
          <Button buttonType="icon">
            <MoreVertIcon />
          </Button>
        </AppBar>
        <AppBar as="div">
          <AppBarTitle keyline="list">Title</AppBarTitle>
          <Button buttonType="icon">
            <SearchIcon />
          </Button>
          <Button buttonType="icon">
            <MoreVertIcon />
          </Button>
        </AppBar>
      </AppBar>
    </TextContainer>
  );
}
