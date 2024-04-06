import { Checkbox, Form, box } from "react-md";
import { type ReactElement } from "react";

export default function CheckboxStates(): ReactElement {
  return (
    <Form className={box()}>
      <Checkbox label="Normal" />
      <Checkbox label="Error" error />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Active" active />
    </Form>
  );
}
