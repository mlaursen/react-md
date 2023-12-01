import { Form, Option, Select } from "@react-md/core";
import { type ReactElement } from "react";

export default function UncontrolledSelectExample(): ReactElement {
  return (
    <Form>
      <Select label="Label" defaultValue="b">
        <Option value="a">Option 1</Option>
        <Option value="b">Option 2</Option>
        <Option value="c">Option 3</Option>
        <Option value="d">Option 4</Option>
      </Select>
    </Form>
  );
}