import { Box } from "@react-md/core";
import type { ReactElement } from "react";
import { DemoHeadingWithDivider } from "../DemoHeadingWithDivider";
import { Resettable } from "../Resettable";
import { AccessibleCarouselExample } from "./AccessibleCarouselExample";

export default function CarouselExamples(): ReactElement {
  return (
    <Resettable>
      <Box stacked>
        <DemoHeadingWithDivider>
          Accessible Carousel Example
        </DemoHeadingWithDivider>
        <AccessibleCarouselExample />
      </Box>
    </Resettable>
  );
}
