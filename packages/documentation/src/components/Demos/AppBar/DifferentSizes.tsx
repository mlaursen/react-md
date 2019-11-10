import React, { FC } from "react";
import { AppBar, AppBarAction, AppBarNav } from "@react-md/app-bar";
import { TextIconSpacing } from "@react-md/icon";
import {
  ArrowDropDownSVGIcon,
  MenuSVGIcon,
  MoreVertSVGIcon,
  SearchSVGIcon,
} from "@react-md/material-icons";

import AppBarTitle from "components/AppBarTitle";

import Container from "./Container";

const DenseAppBar: FC = () => (
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

const NormalAppBar: FC = () => (
  <AppBar>
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

const DenseProminentAppBar: FC = () => (
  <AppBar dense prominent>
    <AppBar dense>
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
    <AppBar dense>
      <AppBarTitle keyline>And Prominent!</AppBarTitle>
      <AppBarAction first buttonType="text" id="dense-prominent-new">
        <TextIconSpacing icon={<ArrowDropDownSVGIcon />} iconAfter>
          New...
        </TextIconSpacing>
      </AppBarAction>
    </AppBar>
  </AppBar>
);

const ProminentAppBar: FC = () => (
  <AppBar prominent>
    <AppBar>
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
    <AppBar>
      <AppBarTitle keyline>Only Prominent</AppBarTitle>
      <AppBarAction first buttonType="text" id="prominent-new">
        <TextIconSpacing icon={<ArrowDropDownSVGIcon />} iconAfter>
          New...
        </TextIconSpacing>
      </AppBarAction>
    </AppBar>
  </AppBar>
);

const DifferentSizes: FC = () => (
  <Container>
    <DenseAppBar />
    <NormalAppBar />
    <DenseProminentAppBar />
    <ProminentAppBar />
  </Container>
);

export default DifferentSizes;
