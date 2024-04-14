"use client";
import { box } from "@react-md/core/box/styles";
import { Form } from "@react-md/core/form/Form";
import { Switch } from "@react-md/core/form/Switch";
import { useState, type ReactElement } from "react";

export default function ControllingSwitches(): ReactElement {
  const [checked, setChecked] = useState(false);
  return (
    <Form className={box()}>
      <Switch
        label="Label"
        checked={checked}
        onChange={(event) => setChecked(event.currentTarget.checked)}
      />
    </Form>
  );
}
