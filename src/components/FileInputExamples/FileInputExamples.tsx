import { Box } from "@react-md/core";
import type { ReactElement } from "react";
import { DemoHeadingWithDivider } from "../DemoHeadingWithDivider";
import { Resettable } from "../Resettable";
import { FileUploadExample } from "./FileUploadExample";
import { SimpleFileInputs } from "./SimpleFileInputs";

export default function FileInputExamples(): ReactElement {
  return (
    <Resettable>
      <Box stacked>
        <DemoHeadingWithDivider>Simple File Inputs</DemoHeadingWithDivider>
        <SimpleFileInputs />
        <DemoHeadingWithDivider>File Upload Example</DemoHeadingWithDivider>
        <FileUploadExample />
      </Box>
    </Resettable>
  );
}
