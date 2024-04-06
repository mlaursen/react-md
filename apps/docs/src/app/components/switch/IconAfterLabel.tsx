import { Form, Switch, box } from "react-md";
import { type ReactElement } from "react";

export default function IconAfterLabel(): ReactElement {
  return (
    <Form className={box()}>
      <Switch label="Label" iconAfter />
      <Switch label="Label" iconAfter />
    </Form>
  );
}
