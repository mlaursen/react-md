import { Checkbox, Form, box } from "react-md";
import { type ReactElement } from "react";

export default function SimpleCheckbox(): ReactElement {
  return (
    <Form className={box()}>
      <Checkbox label="Label" />
      <Checkbox label="Label" defaultChecked />
      <Checkbox label="Disabled" disabled />
    </Form>
  );
}
