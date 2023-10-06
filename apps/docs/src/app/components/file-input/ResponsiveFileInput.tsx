import { FileInput, Form, box } from "@react-md/core";
import { type ReactElement } from "react";

export default function ResponsiveFileInput(): ReactElement {
  return (
    <Form className={box()}>
      <FileInput responsive />
      <FileInput responsive iconAfter />
    </Form>
  );
}
