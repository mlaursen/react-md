import { AppBar, AppBarTitle } from "@react-md/core";
import { type ReactElement } from "react";

export default function AppBarThemesExample(): ReactElement {
  return (
    <>
      <AppBar theme="primary">
        <AppBarTitle>primary</AppBarTitle>
      </AppBar>
      <AppBar theme="secondary">
        <AppBarTitle>secondary</AppBarTitle>
      </AppBar>
      <AppBar theme="warning">
        <AppBarTitle>warning</AppBarTitle>
      </AppBar>
      <AppBar theme="success">
        <AppBarTitle>success</AppBarTitle>
      </AppBar>
      <AppBar theme="error">
        <AppBarTitle>error</AppBarTitle>
      </AppBar>
      <AppBar theme="surface">
        <AppBarTitle>surface</AppBarTitle>
      </AppBar>
      <AppBar theme="clear">
        <AppBarTitle>clear</AppBarTitle>
      </AppBar>
    </>
  );
}
