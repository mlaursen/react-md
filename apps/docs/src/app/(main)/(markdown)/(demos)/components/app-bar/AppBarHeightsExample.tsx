import { AppBar } from "@react-md/core/app-bar/AppBar";
import { AppBarTitle } from "@react-md/core/app-bar/AppBarTitle";
import { type ReactElement } from "react";

export default function AppBarHeightsExample(): ReactElement {
  return (
    <>
      <AppBar height="dense">
        <AppBarTitle>dense</AppBarTitle>
      </AppBar>
      <AppBar height="normal">
        <AppBarTitle>normal</AppBarTitle>
      </AppBar>
      <AppBar height="prominent-dense">
        <AppBarTitle>prominent-dense</AppBarTitle>
      </AppBar>
      <AppBar height="prominent">
        <AppBarTitle>prominent</AppBarTitle>
      </AppBar>
      <AppBar height="auto">
        <AppBarTitle>auto</AppBarTitle>
      </AppBar>
    </>
  );
}
