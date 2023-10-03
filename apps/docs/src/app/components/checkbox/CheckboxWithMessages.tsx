import { Form, Checkbox, box } from "@react-md/core";
import { type ReactElement } from "react";

export default function CheckboxWithMessages(): ReactElement {
  return (
    <Form className={box({ stacked: true, align: "start" })}>
      <Checkbox
        label="Label"
        name="messages"
        messageProps={{
          children: "Help text",
        }}
        value="a"
      />
      <Checkbox
        label="Label"
        name="messages"
        error
        messageProps={{
          error: true,
          children: "Error text",
        }}
        value="a"
      />
    </Form>
  );
}
