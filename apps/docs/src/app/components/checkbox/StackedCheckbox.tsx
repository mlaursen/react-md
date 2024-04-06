import { Form, Checkbox, box } from "react-md";
import { type ReactElement } from "react";

export default function StackedCheckbox(): ReactElement {
  return (
    <Form className={box({ stacked: true, align: "start" })}>
      <Checkbox value="b" name="stacked" label="Label" stacked iconAfter />
      <Checkbox value="a" name="stacked" label="Label" stacked />
    </Form>
  );
}
