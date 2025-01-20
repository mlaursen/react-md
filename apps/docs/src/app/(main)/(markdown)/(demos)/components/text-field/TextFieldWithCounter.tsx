"use client";

import { Form } from "@react-md/core/form/Form";
import { TextField } from "@react-md/core/form/TextField";
import { type ReactElement, useState } from "react";

const maxLength = 30;

export default function TextFieldWithCounter(): ReactElement {
  const [value, setValue] = useState("");
  const error = value.length > maxLength;
  return (
    <Form>
      <TextField
        label="Label"
        placeholder="Placeholder"
        value={value}
        onChange={(event) => {
          setValue(event.currentTarget.value);
        }}
        // Uncomment this line to allow the browser to prevent adding more
        // characters as well
        // maxLength={maxLength}
        messageProps={{
          error,
          length: value.length,
          maxLength,
          children: error ? "Value too long" : "Optional help text",
        }}
      />
    </Form>
  );
}
