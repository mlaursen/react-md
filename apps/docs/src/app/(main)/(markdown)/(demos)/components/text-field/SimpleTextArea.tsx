import { box } from "@react-md/core/box/styles";
import { Form } from "@react-md/core/form/Form";
import { TextArea } from "@react-md/core/form/TextArea";
import { type ReactElement } from "react";

export default function SimpleTextArea(): ReactElement {
  return (
    <Form className={box({ stacked: true, align: "stretch" })}>
      <TextArea label="Label" placeholder="Placeholder..." />
      <TextArea label="Label" placeholder="Placeholder..." theme="filled" />
      <TextArea label="Label" placeholder="Placeholder..." theme="underline" />
    </Form>
  );
}
