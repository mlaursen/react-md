import { Avatar } from "@react-md/core/avatar/Avatar";
import { box } from "@react-md/core/box/styles";
import { Form } from "@react-md/core/form/Form";
import { Option } from "@react-md/core/form/Option";
import { Select } from "@react-md/core/form/Select";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import { type ReactElement } from "react";

export default function SelectWithAddons(): ReactElement {
  return (
    <Form className={box({ stacked: true, align: "stretch" })}>
      <Select label="Label" leftAddon={<FavoriteIcon />}>
        <Option value="a">Option 1</Option>
        <Option value="b">Option 2</Option>
        <Option value="c">Option 3</Option>
        <Option value="d">Option 4</Option>
      </Select>
      <Select label="Label" leftAddon={<Avatar size="icon">O</Avatar>}>
        <Option value="a">Option 1</Option>
        <Option value="b">Option 2</Option>
        <Option value="c">Option 3</Option>
        <Option value="d">Option 4</Option>
      </Select>
    </Form>
  );
}
