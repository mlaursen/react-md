import { Box } from "@react-md/core";
import type { ReactElement } from "react";
import { DemoHeadingWithDivider } from "../DemoHeadingWithDivider";
import { Resettable } from "../Resettable";
import { ContainedButtons } from "./ContainedButtons";
import { ContainedIconButtons } from "./ContainedIconButtons";
import { FlatButtons } from "./FlatButtons";
import { FlatIconButtons } from "./FlatIconButtons";
import { FloatingActionButtons } from "./FloatingActionButtons";
import { OutlinedButtons } from "./OutlinedButtons";
import { OutlinedIconButtons } from "./OutlinedIconButtons";

export default function ButtonExamples(): ReactElement {
  return (
    <Resettable>
      <Box stacked>
        <DemoHeadingWithDivider>Flat Buttons</DemoHeadingWithDivider>
        <FlatButtons />
        <DemoHeadingWithDivider>Outlined Buttons</DemoHeadingWithDivider>
        <OutlinedButtons />
        <DemoHeadingWithDivider>Contained Buttons</DemoHeadingWithDivider>
        <ContainedButtons />
        <DemoHeadingWithDivider>Flat Icon Buttons</DemoHeadingWithDivider>
        <FlatIconButtons />
        <DemoHeadingWithDivider>Outlined Icon Buttons</DemoHeadingWithDivider>
        <OutlinedIconButtons />
        <DemoHeadingWithDivider>Contained Icon Buttons</DemoHeadingWithDivider>
        <ContainedIconButtons />
        <DemoHeadingWithDivider>Floating Action Buttons</DemoHeadingWithDivider>
        <FloatingActionButtons />
      </Box>
    </Resettable>
  );
}
