import { Form } from "@react-md/core/form/Form";
import { Option } from "@react-md/core/form/Option";
import { Select } from "@react-md/core/form/Select";
import { type ReactElement } from "react";

export default function SimpleSelect(): ReactElement {
  return (
    <Form>
      <Select label="Label">
        <Option value="a">Option 1</Option>
        <Option value="b">Option 2</Option>
        <Option value="c">Option 3</Option>
        <Option value="d">Option 4</Option>
      </Select>
    </Form>
  );
}
