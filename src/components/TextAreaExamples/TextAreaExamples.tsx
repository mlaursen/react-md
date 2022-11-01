import { Box } from "@react-md/core";
import type { ReactElement } from "react";
import { DemoHeadingWithDivider } from "../DemoHeadingWithDivider";
import { Resettable } from "../Resettable";
import SimpleTextAreas from "./SimpleTextAreas";

export default function TextAreaExamples(): ReactElement {
  return (
    <Resettable>
      <Box stacked>
        <DemoHeadingWithDivider>Simple Text Areas</DemoHeadingWithDivider>
        <SimpleTextAreas />
      </Box>
    </Resettable>
  );
}
