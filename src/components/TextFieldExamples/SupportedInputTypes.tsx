import { Box } from "@react-md/core";
import { Form, TextField } from "@react-md/form";
import type { ReactElement } from "react";

const INPUT_TYPES = [
  "text",
  "password",
  "number",
  "tel",
  "email",
  "date",
  "time",
  "datetime-local",
  "url",
  "color",
  "search",
] as const;

export function SupportedInputTypes(): ReactElement {
  return (
    <Form>
      <Box stacked>
        {INPUT_TYPES.map((type) => (
          <TextField
            key={type}
            label={`Example ${type}`}
            type={type}
            placeholder="Placeholder"
            style={{ width: type === "color" ? "10rem" : undefined }}
          />
        ))}
      </Box>
    </Form>
  );
}
