import { Form, Option, Select, box } from "@react-md/core";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import { type ReactElement } from "react";

export default function CustomDropdownIcon(): ReactElement {
  return (
    <Form className={box({ stacked: true, align: "stretch" })}>
      <Select label="Rotates" icon={<FavoriteIcon />}>
        <Option value="a">Option 1</Option>
        <Option value="b">Option 2</Option>
        <Option value="c">Option 3</Option>
        <Option value="d">Option 4</Option>
      </Select>
      <Select label="No Rotation" rightAddon={<FavoriteIcon />}>
        <Option value="a">Option 1</Option>
        <Option value="b">Option 2</Option>
        <Option value="c">Option 3</Option>
        <Option value="d">Option 4</Option>
      </Select>
    </Form>
  );
}
