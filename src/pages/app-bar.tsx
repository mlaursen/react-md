import { AppBar, AppBarTitle } from "@react-md/app-bar";
import { Button } from "@react-md/button";
import { TextContainer } from "@react-md/core";
import type { ReactElement } from "react";
import { MenuSVGIcon } from "src/components/MenuSVGIcon";

export default function AppBarPage(): ReactElement {
  return (
    <TextContainer>
      <AppBar>
        <AppBarTitle>Title</AppBarTitle>
      </AppBar>
      <AppBar>
        <Button buttonType="icon">
          <MenuSVGIcon />
        </Button>
        <AppBarTitle keyline="nav">Title</AppBarTitle>
      </AppBar>
      <AppBar>
        <AppBarTitle keyline="title">Title</AppBarTitle>
        <Button buttonType="icon">
          <MenuSVGIcon />
        </Button>
      </AppBar>

      <AppBar theme="secondary">
        <AppBarTitle keyline="title">Title</AppBarTitle>
        <Button buttonType="icon">
          <MenuSVGIcon />
        </Button>
      </AppBar>
      <AppBar theme="surface">
        <AppBarTitle keyline="title">Title</AppBarTitle>
        <Button buttonType="icon">
          <MenuSVGIcon />
        </Button>
      </AppBar>
      <AppBar theme="clear">
        <AppBarTitle keyline="title">Title</AppBarTitle>
        <Button buttonType="icon">
          <MenuSVGIcon />
        </Button>
      </AppBar>
    </TextContainer>
  );
}
