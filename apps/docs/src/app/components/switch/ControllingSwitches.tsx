"use client";
import { Form, Switch, box } from "react-md";
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
