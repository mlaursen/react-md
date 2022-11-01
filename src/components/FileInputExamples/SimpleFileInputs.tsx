import { Box } from "@react-md/core";
import { FileInput, Form } from "@react-md/form";
import type { ReactElement } from "react";

const onChange = (): void => {
  // do nothing
};

export function SimpleFileInputs(): ReactElement {
  return (
    <Form>
      <Box>
        <FileInput onChange={onChange} />
        <FileInput theme="secondary" onChange={onChange} />
        <FileInput theme="warning" onChange={onChange} />
        <FileInput themeType="flat" onChange={onChange} />
        <FileInput themeType="outline" onChange={onChange} />
        <FileInput buttonType="text" onChange={onChange}>
          Labelled
        </FileInput>
        <FileInput iconAfter buttonType="text" onChange={onChange}>
          Labelled
        </FileInput>
        <FileInput buttonType="text" onChange={onChange} icon={null}>
          Labelled
        </FileInput>
      </Box>
    </Form>
  );
}
