import { Form, Radio, box } from "react-md";
import { type ReactElement } from "react";

export default function IconAfterLabel(): ReactElement {
  return (
    <Form className={box({ stacked: true, align: "start" })}>
      <Radio value="b" name="iconAfter" label="Label" iconAfter />
      <Radio value="a" name="iconAfter" label="Label" iconAfter />
    </Form>
  );
}
