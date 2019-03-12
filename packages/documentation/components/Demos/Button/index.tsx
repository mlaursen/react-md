import React, { FunctionComponent, Fragment } from "react";

import DemoPage from "../DemoPage";

import TextButtons from "./TextButtons";
import textButtons from "./TextButtons.md";

import ContainedButtons from "./ContainedButtons";
import containedButtons from "./ContainedButtons.md";

import OutlinedButtons from "./OutlinedButtons";
import outlinedButtons from "./OutlinedButtons.md";

import IconButtons from "./IconButtons";
import iconButtons from "./IconButtons.md";

import TextButtonsWithIcons from "./TextButtonsWithIcons";
import textButtonsWithIcons from "./TextButtonsWithIcons.md";

import CustomButtonTheme from "./CustomButtonTheme";
import customButtonTheme from "./CustomButtonTheme.md";

const demos = [
  {
    name: "Text Buttons",
    description: textButtons,
    children: <TextButtons />,
  },
  {
    name: "Outlined Buttons",
    description: outlinedButtons,
    children: <OutlinedButtons />,
  },
  {
    name: "Contained Buttons",
    description: containedButtons,
    children: <ContainedButtons />,
  },
  {
    name: "Icon Buttons",
    description: iconButtons,
    children: <IconButtons />,
  },
  {
    name: "Text Buttons with Icons",
    description: textButtonsWithIcons,
    children: <TextButtonsWithIcons />,
  },
  {
    name: "Custom Button Theme",
    description: customButtonTheme,
    children: <CustomButtonTheme />,
  },
];

export default () => <DemoPage demos={demos} packageName="button" />;
