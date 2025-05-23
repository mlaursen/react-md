import { box } from "@react-md/core/box/styles";
import { Form } from "@react-md/core/form/Form";
import { Radio } from "@react-md/core/form/Radio";
import { type ReactElement } from "react";

export default function RadioStates(): ReactElement {
  return (
    <Form className={box({ stacked: true })}>
      <Radio value="a" name="states" stacked label="Normal" />
      <Radio value="b" name="states" stacked label="Disabled" disabled />
      <Radio value="c" name="states" stacked label="Error" error />
      <Radio value="d" name="states" stacked label="Active" active />
    </Form>
  );
}
