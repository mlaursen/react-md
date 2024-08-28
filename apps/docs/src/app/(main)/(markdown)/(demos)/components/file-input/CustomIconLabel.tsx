import { box } from "@react-md/core/box/styles";
import { FileInput } from "@react-md/core/files/FileInput";
import { Form } from "@react-md/core/form/Form";
import { SrOnly } from "@react-md/core/typography/SrOnly";
import { useId, type ReactElement } from "react";

export default function CustomIconLabel(): ReactElement {
  const labelId = useId();
  return (
    <Form className={box({ stacked: true })}>
      <FileInput srOnlyLabel="Upload file" />
      <FileInput aria-label="Upload SVG" accept="*.svg" />
      <FileInput aria-labelledby={labelId} />
      <SrOnly id={labelId}>Upload File</SrOnly>
    </Form>
  );
}
