import { Avatar, Form, Option, Select, box } from "@react-md/core";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import { type ReactElement } from "react";

export default function UsingOptionAddons(): ReactElement {
  return (
    <Form className={box({ stacked: true, align: "stretch" })}>
      <Select label="Include Addon">
        <Option value="a" leftAddon={<Avatar size="icon">1</Avatar>}>
          Option 1
        </Option>
        <Option value="b" leftAddon={<FavoriteIcon />}>
          Option 2
        </Option>
        <Option value="c" leftAddon={<Avatar size="icon">3</Avatar>}>
          Option 3
        </Option>
        <Option value="d" leftAddon={<Avatar size="icon">4</Avatar>}>
          Option 4
        </Option>
      </Select>
      <Select label="Disable Addon" disableValueAddon>
        <Option value="a" leftAddon={<Avatar size="icon">1</Avatar>}>
          Option 1
        </Option>
        <Option value="b" leftAddon={<FavoriteIcon />}>
          Option 2
        </Option>
        <Option value="c" leftAddon={<Avatar size="icon">3</Avatar>}>
          Option 3
        </Option>
        <Option value="d" leftAddon={<Avatar size="icon">4</Avatar>}>
          Option 4
        </Option>
      </Select>
    </Form>
  );
}
