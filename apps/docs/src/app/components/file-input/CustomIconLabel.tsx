import { FileInput, Form, SrOnly, box } from "@react-md/core";
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
