import { Form, Radio, box } from "react-md";
import { type ReactElement } from "react";

export default function StackedRadio(): ReactElement {
  return (
    <Form className={box({ stacked: true, align: "start" })}>
      <Radio value="b" name="stacked" label="Label" stacked iconAfter />
      <Radio value="a" name="stacked" label="Label" stacked />
    </Form>
  );
}
