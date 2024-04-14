import { box } from "@react-md/core/box/styles";
import { Form } from "@react-md/core/form/Form";
import { Switch } from "@react-md/core/form/Switch";
import { type ReactElement } from "react";

export default function SimpleSwitch(): ReactElement {
  return (
    <Form className={box()}>
      <Switch label="Label" />
      <Switch label="Label" defaultChecked />
      <Switch label="Disabled" disabled />
    </Form>
  );
}
