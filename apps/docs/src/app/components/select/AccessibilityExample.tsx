import { states } from "@/constants/states.js";
import { Form, Option, Select } from "@react-md/core";
import { type ReactElement } from "react";

export default function AccessibilityExample(): ReactElement {
  return (
    <Form>
      <Select label="Select a state" name="states">
        {states.map(({ name, abbreviation }) => (
          <Option key={abbreviation} value={abbreviation}>
            {name}
          </Option>
        ))}
      </Select>
    </Form>
  );
}
