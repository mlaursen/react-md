"use client";

import { box } from "@react-md/core/box/styles";
import { Checkbox } from "@react-md/core/form/Checkbox";
import { Form } from "@react-md/core/form/Form";
import { type ReactElement, useState } from "react";

export default function ControllingCheckboxes(): ReactElement {
  const [checked, setChecked] = useState(false);
  return (
    <Form className={box()}>
      <Checkbox
        label="Label"
        checked={checked}
        onChange={(event) => {
          setChecked(event.currentTarget.checked);
        }}
      />
    </Form>
  );
}
