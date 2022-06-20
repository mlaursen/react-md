import { AppBar, AppBarTitle } from "@react-md/app-bar";
import { Button } from "@react-md/button";
import { box, TextContainer } from "@react-md/core";
import { MenuIcon } from "@react-md/material-icons/filled/navigation/MenuIcon";
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
        <AppBarTitle keyline="title">Title</AppBarTitle>
        <Button buttonType="icon">
          <MenuIcon />
        </Button>
      </AppBar>

      <AppBar theme="secondary">
        <AppBarTitle keyline="title">Title</AppBarTitle>
        <Button buttonType="icon">
          <MenuIcon />
        </Button>
      </AppBar>
      <AppBar theme="surface">
        <AppBarTitle keyline="title">Title</AppBarTitle>
        <Button buttonType="icon">
          <MenuIcon />
        </Button>
      </AppBar>
      <AppBar theme="clear">
        <AppBarTitle keyline="title">Title</AppBarTitle>
        <Button buttonType="icon">
          <MenuIcon />
        </Button>
      </AppBar>
    </TextContainer>
  );
}
