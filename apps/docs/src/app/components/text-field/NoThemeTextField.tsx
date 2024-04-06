import { Form, TextField, box } from "react-md";
import { type ReactElement } from "react";

export default function NoThemeTextField(): ReactElement {
  return (
    <Form className={box({ stacked: true, align: "stretch" })}>
      <TextField
        aria-label="Label"
        placeholder="Placeholder-only"
        theme="none"
      />
    </Form>
  );
}
