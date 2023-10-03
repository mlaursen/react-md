import { Form, Checkbox, box } from "@react-md/core";
import { type ReactElement } from "react";

export default function IconAfterLabel(): ReactElement {
  return (
    <Form className={box({ stacked: true, align: "start" })}>
      <Checkbox value="b" name="iconAfter" label="Label" iconAfter />
      <Checkbox value="a" name="iconAfter" label="Label" iconAfter />
    </Form>
  );
}
