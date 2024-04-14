import { box } from "@react-md/core/box/styles";
import { FileInput } from "@react-md/core/form/FileInput";
import { Form } from "@react-md/core/form/Form";
import { type ReactElement } from "react";

export default function SimpleFileInput(): ReactElement {
  return (
    <Form className={box()}>
      <FileInput />
      <FileInput theme="secondary" buttonType="icon-square" />
      <FileInput theme="success" themeType="outline" iconSize="small" />
      <FileInput>Upload</FileInput>
      <FileInput iconAfter>Upload</FileInput>
      <FileInput disabled />
    </Form>
  );
}
