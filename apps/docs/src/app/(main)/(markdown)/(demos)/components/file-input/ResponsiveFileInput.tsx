import { box } from "@react-md/core/box/styles";
import { FileInput } from "@react-md/core/form/FileInput";
import { Form } from "@react-md/core/form/Form";
import { type ReactElement } from "react";

export default function ResponsiveFileInput(): ReactElement {
  return (
    <Form className={box()}>
      <FileInput responsive />
      <FileInput responsive iconAfter />
    </Form>
  );
}
