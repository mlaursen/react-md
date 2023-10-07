"use client";
import { states, type StateAbbreviation } from "@/constants/states.js";
import { Form, Option, Select } from "@react-md/core";
import { useState, type ReactElement } from "react";

export default function ControlledSelectExample(): ReactElement {
  const [value, setValue] = useState<StateAbbreviation | "">("");

  return (
    <Form>
      <Select
        label="Label"
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
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
