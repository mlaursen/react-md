import { Box } from "@react-md/core";
import type { ReactElement } from "react";
import { DemoHeadingWithDivider } from "../DemoHeadingWithDivider";
import { Resettable } from "../Resettable";
import { NumberFields } from "./NumberFields";
import { PlaceholderOnlyTextFields } from "./PlaceholderOnlyTextFields";
import { SimpleTextFields } from "./SimpleTextFields";
import { SimpleValidation } from "./SimpleValidation";
import { SupportedInputTypes } from "./SupportedInputTypes";

export default function TextFieldExamples(): ReactElement {
  return (
    <Resettable>
      <Box stacked>
        <DemoHeadingWithDivider>Simple Text Fields</DemoHeadingWithDivider>
        <SimpleTextFields />
        <DemoHeadingWithDivider>
          Placeholder Only Text Fields
        </DemoHeadingWithDivider>
        <PlaceholderOnlyTextFields />
        <DemoHeadingWithDivider>Supported Input Types</DemoHeadingWithDivider>
        <SupportedInputTypes />
        <DemoHeadingWithDivider>Simple Validation</DemoHeadingWithDivider>
        <SimpleValidation />
        <DemoHeadingWithDivider>Number Fields</DemoHeadingWithDivider>
        <NumberFields />
      </Box>
    </Resettable>
  );
}
