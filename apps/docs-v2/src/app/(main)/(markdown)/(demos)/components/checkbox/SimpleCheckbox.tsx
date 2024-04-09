import { box } from "@react-md/core/box/styles";
import { Checkbox } from "@react-md/core/form/Checkbox";
import { Form } from "@react-md/core/form/Form";
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
