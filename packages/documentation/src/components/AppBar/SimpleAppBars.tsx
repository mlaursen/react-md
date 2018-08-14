import * as React from "react";
import { AppBar, AppBarNav, AppBarAction, AppBarTitle } from "@react-md/app-bar";
import { MenuSVGIcon, FavoriteSVGIcon, SearchSVGIcon, MoreVertSVGIcon } from "@react-md/material-icons";
import { Text } from "@react-md/typography";

const SimpleAppBars = () => (
  <React.Fragment>
    <AppBar className="example-group__example">
      <AppBarNav theme="clear">
        <MenuSVGIcon />
      </AppBarNav>
      <AppBarTitle>Page title</AppBarTitle>
      <AppBarAction first={true}>
        <FavoriteSVGIcon />
      </AppBarAction>
      <AppBarAction>
        <SearchSVGIcon />
      </AppBarAction>
      <AppBarAction>
        <MoreVertSVGIcon />
      </AppBarAction>
    </AppBar>
    <AppBar className="example-group__example" theme="secondary">
      <AppBarTitle offset={true}>Page title</AppBarTitle>
      <AppBarAction first={true}>
        <FavoriteSVGIcon />
      </AppBarAction>
      <AppBarAction>
        <SearchSVGIcon />
      </AppBarAction>
      <AppBarAction>
        <MoreVertSVGIcon />
      </AppBarAction>
    </AppBar>
    <AppBar className="example-group__example" dense={true}>
      <AppBarNav theme="clear">
        <MenuSVGIcon />
      </AppBarNav>
      <AppBarTitle>Page title</AppBarTitle>
      <AppBarAction first={true}>
        <FavoriteSVGIcon />
      </AppBarAction>
      <AppBarAction>
        <SearchSVGIcon />
      </AppBarAction>
      <AppBarAction>
        <MoreVertSVGIcon />
      </AppBarAction>
    </AppBar>
    <AppBar className="example-group__example" theme="secondary" prominent={true}>
      <AppBarTitle offset={true}>Page title</AppBarTitle>
      <AppBarAction first={true}>
        <FavoriteSVGIcon />
      </AppBarAction>
      <AppBarAction>
        <SearchSVGIcon />
      </AppBarAction>
      <AppBarAction>
        <MoreVertSVGIcon />
      </AppBarAction>
    </AppBar>
    <AppBar className="example-group__example" theme="secondary" prominent={true} dense={true}>
      <AppBarTitle offset={true} prominent={true}>
        Page title
      </AppBarTitle>
      <AppBarAction first={true}>
        <FavoriteSVGIcon />
      </AppBarAction>
      <AppBarAction>
        <SearchSVGIcon />
      </AppBarAction>
      <AppBarAction>
        <MoreVertSVGIcon />
      </AppBarAction>
    </AppBar>
    <AppBar className="example-group__example" prominent={true} dense={true}>
      <AppBarTitle offset={true}>Page title</AppBarTitle>
      <AppBarAction first={true}>
        <FavoriteSVGIcon />
      </AppBarAction>
      <AppBarAction>
        <SearchSVGIcon />
      </AppBarAction>
      <AppBarAction>
        <MoreVertSVGIcon />
      </AppBarAction>
    </AppBar>
    <AppBar className="example-group__example" grow={true} dense={true}>
      <AppBarTitle offset={true}>Growing</AppBarTitle>
      <AppBarAction>
        <SearchSVGIcon />
      </AppBarAction>
    </AppBar>
  </React.Fragment>
);

export default SimpleAppBars;
