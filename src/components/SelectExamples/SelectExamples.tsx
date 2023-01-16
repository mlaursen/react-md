import { Box } from "@react-md/core";
import type { ReactElement } from "react";
import { DemoHeadingWithDivider } from "../DemoHeadingWithDivider";
import { Resettable } from "../Resettable";
import { ConfiguringTheMenuExample } from "./ConfiguringTheMenuExample";
import { ControlledExample } from "./ControlledExample";
import { GroupedOptionsExample } from "./GroupedOptionsExample";
import { RemovingSelectedIconExample } from "./RemovingSelectedIconExample";
import { SimpleExample } from "./SimpleExample";
import { WithAddonsExample } from "./WithAddonsExample";
import { WithDisabledOptions } from "./WithDisabledOptions";
import { WithFormMessageExamples } from "./WithFormMessageExamples";

export default function SelectExamples(): ReactElement {
  return (
    <Resettable>
      <Box stacked>
        <DemoHeadingWithDivider>Simple Example</DemoHeadingWithDivider>
        <SimpleExample />
        <DemoHeadingWithDivider>Controlled Example</DemoHeadingWithDivider>
        <ControlledExample />
        <DemoHeadingWithDivider>With Addons Example</DemoHeadingWithDivider>
        <WithAddonsExample />
        <DemoHeadingWithDivider>Grouped Options Example</DemoHeadingWithDivider>
        <GroupedOptionsExample />
        <DemoHeadingWithDivider>
          Removing Selected Icon Example
        </DemoHeadingWithDivider>
        <RemovingSelectedIconExample />
        <DemoHeadingWithDivider>
          With Form Message Examples
        </DemoHeadingWithDivider>
        <WithFormMessageExamples />
        <DemoHeadingWithDivider>With Disabled Options</DemoHeadingWithDivider>
        <WithDisabledOptions />
        <DemoHeadingWithDivider>
          Configuring The Menu Example
        </DemoHeadingWithDivider>
        <ConfiguringTheMenuExample />
      </Box>
    </Resettable>
  );
}
