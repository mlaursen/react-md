import { box } from "@react-md/core/box/styles";
import { Form } from "@react-md/core/form/Form";
import { Switch } from "@react-md/core/form/Switch";
import { type ReactElement } from "react";

export default function StackedSwitch(): ReactElement {
  return (
    <Form className={box({ align: "start", stacked: true })}>
      <Switch label="Stacked" stacked iconAfter />
      <Switch label="Stacked" stacked />
    </Form>
  );
}
