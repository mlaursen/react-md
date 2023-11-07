import { Form, Switch, box } from "@react-md/core";
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
