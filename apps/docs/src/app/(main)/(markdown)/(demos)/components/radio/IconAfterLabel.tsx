import { box } from "@react-md/core/box/styles";
import { Form } from "@react-md/core/form/Form";
import { Radio } from "@react-md/core/form/Radio";
import { type ReactElement } from "react";

export default function IconAfterLabel(): ReactElement {
  return (
    <Form className={box({ stacked: true, align: "start" })}>
      <Radio value="b" name="iconAfter" label="Label" iconAfter />
      <Radio value="a" name="iconAfter" label="Label" iconAfter />
    </Form>
  );
}
