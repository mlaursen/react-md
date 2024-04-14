import { box } from "@react-md/core/box/styles";
import { Form } from "@react-md/core/form/Form";
import { TextField } from "@react-md/core/form/TextField";
import { type ReactElement } from "react";

export default function OutlinedTextField(): ReactElement {
  return (
    <Form className={box({ stacked: true, align: "stretch" })}>
      <TextField aria-label="Label" placeholder="Placeholder-only" />
      <TextField label="Label" placeholder="Placeholder" />
    </Form>
  );
}
