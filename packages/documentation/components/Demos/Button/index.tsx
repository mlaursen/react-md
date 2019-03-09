import React, { FunctionComponent, Fragment } from "react";

import DemoPage from "../DemoPage";

import TextButtons from "./TextButtons";
import textDescription from "./TextButtons.md";

import ContainedButtons from "./ContainedButtons";
import containedDesciption from "./ContainedButtons.md";

import OutlinedButtons from "./OutlinedButtons";
import outlineDescription from "./OutlinedButtons.md";

import IconButtons from "./IconButtons";
import iconDescription from "./IconButtons.md";

import TextButtonsWithIcons from "./TextButtonsWithIcons";
import textWithIconDescription from "./TextButtonsWithIcons.md";

import CustomButtonTheme from "./CustomButtonTheme";
import customThemeDescription from "./CustomButtonTheme.md";
import { MarkdownPage } from "components/Markdown";

const demos = [
  {
    name: "Text Buttons",
    description: textDescription,
    children: <TextButtons />,
  },
  {
    name: "Outlined Buttons",
    description: outlineDescription,
    children: <OutlinedButtons />,
  },
  {
    name: "Contained Buttons",
    description: containedDesciption,
    children: <ContainedButtons />,
  },
  {
    name: "Icon Buttons",
    description: iconDescription,
    children: <IconButtons />,
  },
  {
    name: "Text Buttons with Icons",
    description: textWithIconDescription,
    children: <TextButtonsWithIcons />,
  },
  {
    name: "Custom Button Theme",
    description: customThemeDescription,
    children: <CustomButtonTheme />,
  },
];

export default () => <DemoPage demos={demos} />;
