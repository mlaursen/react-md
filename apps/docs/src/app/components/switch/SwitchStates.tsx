import { Form, Switch, box } from "@react-md/core";
import { type ReactElement } from "react";

export default function SwitchStates(): ReactElement {
  return (
    <Form className={box()}>
      <Switch label="Normal" />
      <Switch label="Error" error />
      <Switch label="Disabled" disabled />
      <Switch label="Active" active />
    </Form>
  );
}
