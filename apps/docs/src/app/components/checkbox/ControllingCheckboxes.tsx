"use client";
import { Checkbox, Form, box } from "react-md";
import { useState, type ReactElement } from "react";

export default function ControllingCheckboxes(): ReactElement {
  const [checked, setChecked] = useState(false);
  return (
    <Form className={box()}>
      <Checkbox
        label="Label"
        checked={checked}
        onChange={(event) => setChecked(event.currentTarget.checked)}
      />
    </Form>
  );
}
