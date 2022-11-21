import { Box } from "@react-md/core";
import type { ReactElement } from "react";
import { DemoHeadingWithDivider } from "../DemoHeadingWithDivider";
import { Resettable } from "../Resettable";
import { UsingBorderBoxAdnContentBox } from "./UsingBorderBoxAndContentBox";

export default function ResizeObserverExamples(): ReactElement {
  return (
    <Resettable>
      <Box stacked>
        <DemoHeadingWithDivider>
          Using Border Box and Content Box
        </DemoHeadingWithDivider>
        <UsingBorderBoxAdnContentBox />
      </Box>
    </Resettable>
  );
}
