import { Checkbox, Form, box } from "react-md";
import { type ReactElement } from "react";

export default function IndeterminateCheckbox(): ReactElement {
  return (
    <Form className={box()}>
      <Checkbox label="Label" indeterminate />
      <Checkbox label="Label" indeterminate defaultChecked />
    </Form>
  );
}
