import { box } from "@react-md/core/box/styles";
import { Form } from "@react-md/core/form/Form";
import { TextField } from "@react-md/core/form/TextField";
import { type ReactElement } from "react";

export default function HelpTextAndErrorText(): ReactElement {
  return (
    <Form className={box({ stacked: true, align: "start" })}>
      <TextField
        label="Label"
        placeholder="Placeholder"
        messageProps={{
          children: "This is some help text",
        }}
      />
      <TextField
        label="Label"
        error
        placeholder="Placeholder"
        messageProps={{
          error: true,
          children: "This is some error text",
        }}
      />
    </Form>
  );
}
