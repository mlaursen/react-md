import { Box } from "@react-md/core";
import type { ReactElement } from "react";
import { DemoHeadingWithDivider } from "../DemoHeadingWithDivider";
import { Resettable } from "../Resettable";
import { DifferentSizes } from "./DifferentSizes";
import { IndeterminateCheckboxes } from "./IndeterminateCheckboxes";
import { SimpleCheckboxes } from "./SimpleCheckboxes";
import { WithFormMessageExample } from "./WithFormMessageExample";

export default function CheckboxExamples(): ReactElement {
  return (
    <Resettable>
      <Box stacked>
        <DemoHeadingWithDivider>Simple Checkboxes</DemoHeadingWithDivider>
        <SimpleCheckboxes />
        <DemoHeadingWithDivider>Different Sizes</DemoHeadingWithDivider>
        <DifferentSizes />
        <DemoHeadingWithDivider>
          Indeterminate Checkboxes
        </DemoHeadingWithDivider>
        <IndeterminateCheckboxes />
        <DemoHeadingWithDivider>
          With Form Message Example
        </DemoHeadingWithDivider>
        <WithFormMessageExample />
      </Box>
    </Resettable>
  );
}
