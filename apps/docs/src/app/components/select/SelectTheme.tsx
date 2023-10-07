import { Form, Option, Select, box } from "@react-md/core";
import { type ReactElement } from "react";

export default function SelectTheme(): ReactElement {
  return (
    <Form className={box({ stacked: true, align: "stretch" })}>
      <Select label="Label" theme="outline">
        <Option value="a">Option 1</Option>
        <Option value="b">Option 2</Option>
        <Option value="c">Option 3</Option>
        <Option value="d">Option 4</Option>
      </Select>
      <Select label="Label" theme="filled">
        <Option value="a">Option 1</Option>
        <Option value="b">Option 2</Option>
        <Option value="c">Option 3</Option>
        <Option value="d">Option 4</Option>
      </Select>
      <Select label="Label" theme="underline">
        <Option value="a">Option 1</Option>
        <Option value="b">Option 2</Option>
        <Option value="c">Option 3</Option>
        <Option value="d">Option 4</Option>
      </Select>
    </Form>
  );
}
