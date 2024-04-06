import { Form, TextField, box } from "react-md";
import { type ReactElement } from "react";

export default function OutlinedTextField(): ReactElement {
  return (
    <Form className={box({ stacked: true, align: "stretch" })}>
      <TextField aria-label="Label" placeholder="Placeholder-only" />
      <TextField label="Label" placeholder="Placeholder" />
    </Form>
  );
}
