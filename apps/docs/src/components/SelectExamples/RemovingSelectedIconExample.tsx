import { Avatar, box, Form, OptGroup, Option, Select } from "@react-md/core";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import MenuIcon from "@react-md/material-icons/MenuIcon";
import type { ReactElement } from "react";

export function RemovingSelectedIconExample(): ReactElement {
  return (
    <Form className={box({ stacked: true, align: "stretch" })}>
      <Select label="Select an option" disableSelectedIcon>
        <Option value="a">Option 1</Option>
        <Option value="b">Option 2</Option>
        <Option value="c">Option 3</Option>
        <Option value="d">Option 4</Option>
      </Select>
      <Select label="Includes addons" disableSelectedIcon>
        <Option value="a" leftAddon={<FavoriteIcon />}>
          Option 1
        </Option>
        <Option value="b" leftAddon={<MenuIcon />}>
          Option 2
        </Option>
        <Option
          value="c"
          leftAddon={
            <Avatar size="icon" color="orange">
              A
            </Avatar>
          }
        >
          Option 3
        </Option>
        <Option
          value="d"
          leftAddon={
            <Avatar size="icon" color="blue">
              4
            </Avatar>
          }
          rightAddon={<FavoriteIcon />}
        >
          Option 4
        </Option>
      </Select>
      <Select label="Select a fruit" disableSelectedIcon>
        <OptGroup label="A">
          <Option value="apple">Apple</Option>
          <Option value="appricot">Appricot</Option>
          <Option value="avacado">Avacado</Option>
        </OptGroup>
        <OptGroup label="B">
          <Option value="blueberry">Blueberry</Option>
        </OptGroup>
        <OptGroup label="C">
          <Option value="cranberry">Cranberry</Option>
          <Option value="currant">Currant</Option>
        </OptGroup>
      </Select>
    </Form>
  );
}
