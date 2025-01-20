import { Form } from "@react-md/core/form/Form";
import { Option } from "@react-md/core/form/Option";
import { Select } from "@react-md/core/form/Select";
import { type ReactElement } from "react";

import { states } from "@/constants/states.js";

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
