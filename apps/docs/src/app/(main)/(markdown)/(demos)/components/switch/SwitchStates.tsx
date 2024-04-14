import { box } from "@react-md/core/box/styles";
import { Form } from "@react-md/core/form/Form";
import { Switch } from "@react-md/core/form/Switch";
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
