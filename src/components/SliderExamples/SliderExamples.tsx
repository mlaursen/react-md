import { Box } from "@react-md/core";
import type { ReactElement } from "react";
import { DemoHeadingWithDivider } from "../DemoHeadingWithDivider";
import { Resettable } from "../Resettable";
import { DisabledSliderExamples } from "./DisabledSliderExamples";
import { DiscreteHorizontalRangeSliderExample } from "./DiscreteHorizontalRangeSliderExample";
import { DiscreteHorizontalSliderExample } from "./DiscreteHorizontalSliderExample";
import { DiscreteVerticalRangeSliderExample } from "./DiscreteVerticalRangeSliderExample";
import { DiscreteVerticalSliderExample } from "./DiscreteVerticalSliderExample";
import { HorizontalWithAddonsExample } from "./HorizontalWithAddonsExample";
import { LinkedWithATextField } from "./LinkedWithATextField";
import { SimpleHorizontalExample } from "./SimpleHorizontalExample";
import { SimpleHorizontalRangeSliderExample } from "./SimpleHorizontalRangeSliderExample";
import { SimpleVerticalExample } from "./SimpleVerticalExample";
import { SimpleVerticalRangeSliderExample } from "./SimpleVerticalRangeSliderExample";
import { VerticalWithAddonsExample } from "./VerticalWithAddonsExample";

export default function SliderExamples(): ReactElement {
  return (
    <Resettable>
      <Box stacked>
        <DemoHeadingWithDivider>
          Simple Horizontal Example
        </DemoHeadingWithDivider>
        <SimpleHorizontalExample />
        <DemoHeadingWithDivider>
          Horizontal With Addons Example
        </DemoHeadingWithDivider>
        <HorizontalWithAddonsExample />
        <DemoHeadingWithDivider>Simple Vertical Example</DemoHeadingWithDivider>
        <SimpleVerticalExample />
        <DemoHeadingWithDivider>
          Vertical With Addons Example
        </DemoHeadingWithDivider>
        <VerticalWithAddonsExample />
        <DemoHeadingWithDivider>
          Discrete Horizontal Slider Example
        </DemoHeadingWithDivider>
        <DiscreteHorizontalSliderExample />
        <DemoHeadingWithDivider>
          Discrete Vertical Slider Example
        </DemoHeadingWithDivider>
        <DiscreteVerticalSliderExample />
        <DemoHeadingWithDivider>
          Simple Horizontal Range Slider Example
        </DemoHeadingWithDivider>
        <SimpleHorizontalRangeSliderExample />
        <DemoHeadingWithDivider>
          Simple Vertical Range Slider Example
        </DemoHeadingWithDivider>
        <SimpleVerticalRangeSliderExample />
        <DemoHeadingWithDivider>
          Discrete Horizontal Range Slider Example
        </DemoHeadingWithDivider>
        <DiscreteHorizontalRangeSliderExample />
        <DemoHeadingWithDivider>
          Discrete Vertical Range Slider Example
        </DemoHeadingWithDivider>
        <DiscreteVerticalRangeSliderExample />
        <DemoHeadingWithDivider>
          Disabled Slider Examples
        </DemoHeadingWithDivider>
        <DisabledSliderExamples />
        <DemoHeadingWithDivider>
          Linked With a Text Field
        </DemoHeadingWithDivider>
        <LinkedWithATextField />
      </Box>
    </Resettable>
  );
}
