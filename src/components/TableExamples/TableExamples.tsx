import { Box } from "@react-md/core";
import type { ReactElement } from "react";
import { DemoHeadingWithDivider } from "../DemoHeadingWithDivider";
import { Resettable } from "../Resettable";
import { ContainerBasedStickyTable } from "./ContainerBasedStickyTable";
import { DefaultStyles } from "./DefaultStyles";
import { SelectableRows } from "./SelectableRows";
import { SortableColumns } from "./SortableColumns";
import { StickyColumns } from "./StickyColumns";
import { ViewportBasedStickyTable } from "./ViewportBasedStickyTable";

export default function TableExamples(): ReactElement {
  return (
    <Resettable>
      <Box stacked>
        <DemoHeadingWithDivider>Default Styles</DemoHeadingWithDivider>
        <DefaultStyles />
        <DemoHeadingWithDivider>Selectable Rows</DemoHeadingWithDivider>
        <SelectableRows />
        <DemoHeadingWithDivider>Sortable Columns</DemoHeadingWithDivider>
        <SortableColumns />
        <DemoHeadingWithDivider>
          Container Based Sticky Tables
        </DemoHeadingWithDivider>
        <ContainerBasedStickyTable />
        <DemoHeadingWithDivider>
          Viewport Based Sticky Table
        </DemoHeadingWithDivider>
        <ViewportBasedStickyTable />
        <DemoHeadingWithDivider>Sticky Columns</DemoHeadingWithDivider>
        <StickyColumns />
      </Box>
    </Resettable>
  );
}
