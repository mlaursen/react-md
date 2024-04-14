import { box } from "@react-md/core/box/styles";
import { Form } from "@react-md/core/form/Form";
import { Radio } from "@react-md/core/form/Radio";
import { type ReactElement } from "react";

export default function SimpleRadio(): ReactElement {
  return (
    <Form className={box()}>
      <Radio value="a" name="choices" label="Value A" />
      <Radio value="b" name="choices" label="Value B" />
      <Radio value="c" name="choices" label="Value C" />
    </Form>
  );
}
