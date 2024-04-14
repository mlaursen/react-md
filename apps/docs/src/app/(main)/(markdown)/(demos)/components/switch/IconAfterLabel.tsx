import { box } from "@react-md/core/box/styles";
import { Form } from "@react-md/core/form/Form";
import { Switch } from "@react-md/core/form/Switch";
import { type ReactElement } from "react";

export default function IconAfterLabel(): ReactElement {
  return (
    <Form className={box()}>
      <Switch label="Label" iconAfter />
      <Switch label="Label" iconAfter />
    </Form>
  );
}
