import { Form, Radio, box } from "@react-md/core";
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
