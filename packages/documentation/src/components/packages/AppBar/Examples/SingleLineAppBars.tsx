import * as React from "react";
import { AppBar, AppBarNav, AppBarAction, AppBarTitle } from "@react-md/app-bar";
import {
  MenuSVGIcon,
  FavoriteSVGIcon,
  SearchSVGIcon,
  MoreVertSVGIcon,
} from "@react-md/material-icons";

const SingleLineAppBars = () => (
  <React.Fragment>
    <AppBar className="example-group__example" theme="primary" fixed={false}>
      <AppBarNav>
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
    <AppBar className="example-group__example" theme="secondary" fixed={false}>
      <AppBarTitle keyline={true}>Page title</AppBarTitle>
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
    <AppBar className="example-group__example" theme="clear" fixed={false}>
      <AppBarNav>
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
    <AppBar className="example-group__example" theme="default" fixed={false}>
      <AppBarTitle keyline={true}>Page title</AppBarTitle>
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
  </React.Fragment>
);

export default SingleLineAppBars;
