import { box } from "@react-md/core/box/styles";
import { Checkbox } from "@react-md/core/form/Checkbox";
import { Form } from "@react-md/core/form/Form";
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
