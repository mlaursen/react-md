import { Box } from "@react-md/core";
import type { ReactElement } from "react";
import { DemoHeadingWithDivider } from "../DemoHeadingWithDivider";
import { Resettable } from "../Resettable";
import { DifferentSizes } from "./DifferentSizes";
import { RadioStates } from "./RadioStates";
import { RequiredRadioGroup } from "./RequiredRadioGroup";
import { SimpleRadioGroup } from "./SimpleRadioGroup";
import { StrictTypescriptTypes } from "./StrictTypescriptTypes";
import { WithFormMessageExample } from "./WithFormMessageExample";

export default function RadioExamples(): ReactElement {
  return (
    <Resettable>
      <Box stacked>
        <DemoHeadingWithDivider>Simple Radio Group</DemoHeadingWithDivider>
        <SimpleRadioGroup />
        <DemoHeadingWithDivider>Required Radio Group</DemoHeadingWithDivider>
        <RequiredRadioGroup />
        <DemoHeadingWithDivider>Strict Typescript Types</DemoHeadingWithDivider>
        <StrictTypescriptTypes />
        <DemoHeadingWithDivider>Radio States</DemoHeadingWithDivider>
        <RadioStates />
        <DemoHeadingWithDivider>Different Sizes</DemoHeadingWithDivider>
        <DifferentSizes />
        <DemoHeadingWithDivider>
          With Form Message Example
        </DemoHeadingWithDivider>
        <WithFormMessageExample />
      </Box>
    </Resettable>
  );
}
