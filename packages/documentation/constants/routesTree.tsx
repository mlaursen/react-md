/* this is an auto-generated file */
import React, { ReactNode } from "react";
import { Avatar } from "@react-md/avatar";
import {
  HomeSVGIcon,
  InfoOutlineSVGIcon,
  ColorLensSVGIcon,
} from "@react-md/material-icons";
import { IFlattenedTree } from "@react-md/tree";

import { Component as ReactLogo } from "svgs/reactLogo.svg";
import { Component as GoogleLogo } from "svgs/googleLogo.svg";
import { Component as MaterialDesignLogo } from "svgs/materialDesignLogo.svg";

export type RouteLink = {
  children: ReactNode;
  target?: string;
  href?: string;
  leftIcon?: ReactNode;
};

export type RouteSubheader = RouteLink & {
  subheader: true;
};

export type RouteDivider = { divider: true };
export type RoutesTreeData = ((RouteLink | RouteSubheader) | RouteDivider) & {
  index: number;
};
export type RoutesTree = IFlattenedTree<RoutesTreeData>;

const tree: RoutesTree = {
  "/customization/css-variables": {
    index: 0,
    parentId: "/customization",
    itemId: "/customization/css-variables",
    href: "/customization/css-variables",
    children: "CSS Variables",
  },
  "/customization": {
    index: 2,
    parentId: null,
    itemId: "/customization",
    children: "Customization",
    leftIcon: <ColorLensSVGIcon />,
  },
  "/customization/dynamic-themes": {
    index: 1,
    parentId: "/customization",
    itemId: "/customization/dynamic-themes",
    href: "/customization/dynamic-themes",
    children: "Dynamic Themes",
  },
  "/customization/overriding-defaults": {
    index: 2,
    parentId: "/customization",
    itemId: "/customization/overriding-defaults",
    href: "/customization/overriding-defaults",
    children: "Overriding Defaults",
  },
  "/getting-started/installation": {
    index: 0,
    parentId: "/getting-started",
    itemId: "/getting-started/installation",
    href: "/getting-started/installation",
    children: "Installation",
  },
  "/getting-started": {
    index: 1,
    parentId: null,
    itemId: "/getting-started",
    children: "Getting Started",
    leftIcon: <InfoOutlineSVGIcon />,
  },
  "/getting-started/updating-create-react-app": {
    index: 1,
    parentId: "/getting-started",
    itemId: "/getting-started/updating-create-react-app",
    href: "/getting-started/updating-create-react-app",
    children: "Updating Create React App",
  },
  "/": {
    index: 0,
    parentId: null,
    itemId: "/",
    href: "/",
    children: "Home",
    leftIcon: <HomeSVGIcon />,
  },
  "divider-1": {
    index: 3,
    parentId: null,
    itemId: "divider-1",
    divider: true,
  },
  references: {
    index: 4,
    parentId: null,
    itemId: "references",
    children: "References",
    subheader: true,
  },
  react: {
    index: 5,
    parentId: null,
    itemId: "react",
    children: "React",
    href: "https://reactjs.org/",
    target: "_blank",
    leftIcon: <ReactLogo className="rmd-icon rmd-icon--svg react-logo" />,
  },
  "material-design": {
    index: 6,
    parentId: null,
    itemId: "material-design",
    children: "Material Design",
    href: "https://material.io/design/",
    target: "_blank",
    leftIcon: (
      <MaterialDesignLogo className="rmd-icon rmd-icon--svg materail-design-logo" />
    ),
  },
};

export default tree;
