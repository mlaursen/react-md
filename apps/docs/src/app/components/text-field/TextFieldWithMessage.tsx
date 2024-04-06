import { Form, TextField, box } from "react-md";
import { type ReactElement } from "react";

export default function TextFieldWithMessage(): ReactElement {
  return (
    <Form className={box({ stacked: true, align: "stretch" })}>
      <TextField
        label="Label"
        placeholder="Placeholder"
        messageProps={{
          children: "Help text!",
        }}
      />
      <TextField
        label="Label"
        placeholder="Placeholder"
        messageProps={{
          length: 0,
          maxLength: 30,
        }}
      />
      <TextField
        error
        label="Label"
        placeholder="Placeholder"
        messageProps={{
          error: true,
          children: "Error text!",
        }}
      />
    </Form>
  );
}
