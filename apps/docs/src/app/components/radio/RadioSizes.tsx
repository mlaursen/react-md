import { Form, Radio, box } from "@react-md/core";
import { type ReactElement } from "react";

export default function RadioSizes(): ReactElement {
  return (
    <Form className={box({ stacked: true })}>
      <Radio label="Small" name="sizes" value="a" size="small" stacked />
      <Radio label="Dense" name="sizes" value="b" size="dense" stacked />
      <Radio label="Normal" name="sizes" value="c" size="normal" stacked />
      <Radio label="Large" name="sizes" value="c" size="large" stacked />
      <Radio
        label="Auto"
        name="sizes"
        value="c"
        size="auto"
        style={{ fontSize: "1.75rem" }}
        stacked
      />
    </Form>
  );
}
