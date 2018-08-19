import * as React from "react";
import { AppBar, AppBarNav, AppBarAction, AppBarTitle, AppBarRow } from "@react-md/app-bar";
import { MenuSVGIcon, FavoriteSVGIcon, SearchSVGIcon, MoreVertSVGIcon } from "@react-md/material-icons";

const ProminentAppBars = () => (
  <React.Fragment>
    <AppBar className="example-group__example" theme="primary" prominent={true} fixed={false}>
      <AppBarRow>
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
        <AppBarAction last={true}>
          <MoreVertSVGIcon />
        </AppBarAction>
      </AppBarRow>
    </AppBar>
    <AppBar className="example-group__example" theme="secondary" prominent={true} fixed={false}>
      <AppBarRow>
        <AppBarTitle keyline={true}>Page title</AppBarTitle>
        <AppBarAction first={true}>
          <FavoriteSVGIcon />
        </AppBarAction>
        <AppBarAction>
          <SearchSVGIcon />
        </AppBarAction>
        <AppBarAction last={true}>
          <MoreVertSVGIcon />
        </AppBarAction>
      </AppBarRow>
    </AppBar>
    <AppBar className="example-group__example" theme="clear" prominent={true} fixed={false}>
      <AppBarRow>
        <AppBarNav>
          <MenuSVGIcon />
        </AppBarNav>
        <AppBarAction first={true}>
          <FavoriteSVGIcon />
        </AppBarAction>
        <AppBarAction>
          <SearchSVGIcon />
        </AppBarAction>
        <AppBarAction last={true}>
          <MoreVertSVGIcon />
        </AppBarAction>
      </AppBarRow>
      <AppBarRow>
        <AppBarTitle keyline={true}>Page title</AppBarTitle>
      </AppBarRow>
    </AppBar>
    <AppBar className="example-group__example" theme="default" prominent={true} fixed={false}>
      <AppBarRow>
        <AppBarAction first={true}>
          <FavoriteSVGIcon />
        </AppBarAction>
        <AppBarAction>
          <SearchSVGIcon />
        </AppBarAction>
        <AppBarAction last={true}>
          <MoreVertSVGIcon />
        </AppBarAction>
      </AppBarRow>
      <AppBarRow>
        <AppBarTitle keyline={true}>Page title</AppBarTitle>
      </AppBarRow>
    </AppBar>
  </React.Fragment>
);

export default ProminentAppBars;
