"use client";

import { Form } from "@react-md/core/form/Form";
import { Option } from "@react-md/core/form/Option";
import { Select } from "@react-md/core/form/Select";
import { type ReactElement, useState } from "react";

import { type StateAbbreviation, states } from "@/constants/states.js";

export default function ControlledSelectExample(): ReactElement {
  const [value, setValue] = useState<StateAbbreviation | "">("");

  return (
    <Form>
      <Select
        label="Label"
        value={value}
        onChange={(event) => {
          setValue(event.currentTarget.value);
        }}
      >
        {states.map(({ name, abbreviation }) => (
          <Option key={abbreviation} value={abbreviation}>
            {name}
          </Option>
        ))}
      </Select>
    </Form>
  );
}
