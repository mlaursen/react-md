import { Form, Switch, box } from "react-md";
import { type ReactElement } from "react";

export default function StackedSwitch(): ReactElement {
  return (
    <Form className={box({ align: "start", stacked: true })}>
      <Switch label="Stacked" stacked iconAfter />
      <Switch label="Stacked" stacked />
    </Form>
  );
}
