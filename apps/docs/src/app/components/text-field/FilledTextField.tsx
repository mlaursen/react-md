import { Form, TextField, box } from "@react-md/core";
import { type ReactElement } from "react";

export default function FilledTextField(): ReactElement {
  return (
    <Form className={box({ stacked: true, align: "stretch" })}>
      <TextField
        aria-label="Label"
        placeholder="Placeholder-only"
        theme="filled"
      />
      <TextField label="Label" placeholder="Placeholder" theme="filled" />
      <TextField
        label="Label"
        placeholder="Placeholder"
        theme="filled"
        underlineDirection="center"
      />
      <TextField
        label="Label"
        placeholder="Placeholder"
        theme="filled"
        underlineDirection="right"
      />
    </Form>
  );
}
