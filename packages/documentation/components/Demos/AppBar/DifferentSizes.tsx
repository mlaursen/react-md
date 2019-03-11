import React, { FunctionComponent } from "react";
import {
  AppBar,
  AppBarNav,
  AppBarTitle,
  AppBarAction,
} from "@react-md/app-bar";
import {
  MenuSVGIcon,
  SearchSVGIcon,
  MoreVertSVGIcon,
  ArrowDropDownSVGIcon,
} from "@react-md/material-icons";

import Container from "../Container";
import { TextIconSpacing } from "@react-md/icon";

const DenseAppBar = () => (
  <AppBar dense>
    <AppBarNav aria-label="Navigation" id="dense-nav">
      <MenuSVGIcon />
    </AppBarNav>
    <AppBarTitle>Dense</AppBarTitle>
    <AppBarAction first aria-label="Search" id="dense-search">
      <SearchSVGIcon />
    </AppBarAction>
    <AppBarAction last aria-label="Actions" id="dense-actions">
      <MoreVertSVGIcon />
    </AppBarAction>
  </AppBar>
);

const NormalAppBar = () => (
  <AppBar component="div">
    <AppBarNav aria-label="Navigation" id="normal-nav">
      <MenuSVGIcon />
    </AppBarNav>
    <AppBarTitle>Dense Prominent</AppBarTitle>
    <AppBarAction first aria-label="Search" id="normal-search">
      <SearchSVGIcon />
    </AppBarAction>
    <AppBarAction last aria-label="Actions" id="normal-actions">
      <MoreVertSVGIcon />
    </AppBarAction>
  </AppBar>
);

const DenseProminentAppBar = () => (
  <AppBar dense prominent>
    <AppBar component="div" dense>
      <AppBarNav aria-label="Navigation" id="dense-prominent-nav">
        <MenuSVGIcon />
      </AppBarNav>
      <AppBarTitle>Dense</AppBarTitle>
      <AppBarAction first aria-label="Search" id="dense-prominent-search">
        <SearchSVGIcon />
      </AppBarAction>
      <AppBarAction last aria-label="Actions" id="dense-prominent-actions">
        <MoreVertSVGIcon />
      </AppBarAction>
    </AppBar>
    <AppBar component="div" dense>
      <AppBarTitle keyline>And Prominent!</AppBarTitle>
      <AppBarAction first buttonType="text" id="dense-prominent-new">
        <TextIconSpacing icon={<ArrowDropDownSVGIcon />} iconAfter>
          New...
        </TextIconSpacing>
      </AppBarAction>
    </AppBar>
  </AppBar>
);

const ProminentAppBar = () => (
  <AppBar prominent>
    <AppBar component="div">
      <AppBarNav aria-label="Navigation">
        <MenuSVGIcon />
      </AppBarNav>
      <AppBarAction first aria-label="Search">
        <SearchSVGIcon />
      </AppBarAction>
      <AppBarAction last aria-label="Actions" id="prominent-actions">
        <MoreVertSVGIcon />
      </AppBarAction>
    </AppBar>
    <AppBar component="div">
      <AppBarTitle keyline>Only Prominent</AppBarTitle>
      <AppBarAction first buttonType="text" id="prominent-new">
        <TextIconSpacing icon={<ArrowDropDownSVGIcon />} iconAfter>
          New...
        </TextIconSpacing>
      </AppBarAction>
    </AppBar>
  </AppBar>
);

const DifferentSizes: FunctionComponent = () => (
  <Container>
    <DenseAppBar />
    <NormalAppBar />
    <DenseProminentAppBar />
    <ProminentAppBar />
  </Container>
);

export default DifferentSizes;
