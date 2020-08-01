import React, { ReactElement } from "react";

import description from "./README.md";
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

import FloatingActionButtons from "./FloatingActionButtons";
import floatingActionButtons from "./FloatingActionButtons.md";

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
    name: "Floating Action Buttons",
    description: floatingActionButtons,
    disableCard: true,
    emulated: { fabOffset: true },
    children: <FloatingActionButtons />,
  },
  {
    name: "Custom Button Theme",
    description: customButtonTheme,
    children: <CustomButtonTheme />,
  },
];

export default function Button(): ReactElement {
  return (
    <DemoPage
      demos={demos}
      packageName="button"
      description={description}
      fonts={["Material Icons"]}
    />
  );
}
