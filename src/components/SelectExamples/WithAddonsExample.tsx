import { Avatar, box } from "@react-md/core";
import { Checkbox, Form, Option, Select } from "@react-md/form";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import MenuIcon from "@react-md/material-icons/MenuIcon";
import type { ReactElement } from "react";
import { useState } from "react";

export function WithAddonsExample(): ReactElement {
  const [disableValueAddon, setDisableValueAddon] = useState(false);
  return (
    <Form className={box({ stacked: true, align: "stretch" })}>
      <Checkbox
        label="Disable value addon?"
        checked={disableValueAddon}
        onChange={(event) => setDisableValueAddon(event.currentTarget.checked)}
        name="disableValueAddon"
      />
      <Select
        label="Select an option"
        disableValueAddon={disableValueAddon}
        defaultValue="a"
      >
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
    </Form>
  );
}
