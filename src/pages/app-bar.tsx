import { AppBar, AppBarTitle } from "@react-md/app-bar";
import { Button } from "@react-md/button";
import { TextContainer } from "@react-md/core";
import { SVGIcon } from "@react-md/icon";
import type { ReactElement } from "react";

export default function AppBarPage(): ReactElement {
  return (
    <TextContainer>
      <AppBar>
        <AppBarTitle>Title</AppBarTitle>
      </AppBar>
      <AppBar>
        <Button buttonType="icon">
          <SVGIcon>
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </SVGIcon>
        </Button>
        <AppBarTitle keyline="nav">Title</AppBarTitle>
      </AppBar>
      <AppBar>
        <AppBarTitle keyline="title">Title</AppBarTitle>
        <Button buttonType="icon">
          <SVGIcon>
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </SVGIcon>
        </Button>
      </AppBar>

      <AppBar theme="secondary">
        <AppBarTitle keyline="title">Title</AppBarTitle>
        <Button buttonType="icon">
          <SVGIcon>
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </SVGIcon>
        </Button>
      </AppBar>
      <AppBar theme="surface">
        <AppBarTitle keyline="title">Title</AppBarTitle>
        <Button buttonType="icon">
          <SVGIcon>
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </SVGIcon>
        </Button>
      </AppBar>
      <AppBar theme="clear">
        <AppBarTitle keyline="title">Title</AppBarTitle>
        <Button buttonType="icon">
          <SVGIcon>
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </SVGIcon>
        </Button>
      </AppBar>
    </TextContainer>
  );
}
