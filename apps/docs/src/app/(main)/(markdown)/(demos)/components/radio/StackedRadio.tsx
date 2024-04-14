import { box } from "@react-md/core/box/styles";
import { Form } from "@react-md/core/form/Form";
import { Radio } from "@react-md/core/form/Radio";
import { type ReactElement } from "react";

export default function StackedRadio(): ReactElement {
  return (
    <Form className={box({ stacked: true, align: "start" })}>
      <Radio value="b" name="stacked" label="Label" stacked iconAfter />
      <Radio value="a" name="stacked" label="Label" stacked />
    </Form>
  );
}
