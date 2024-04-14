import { box } from "@react-md/core/box/styles";
import { Form } from "@react-md/core/form/Form";
import { Radio } from "@react-md/core/form/Radio";
import { type ReactElement } from "react";

export default function RadioWithMessages(): ReactElement {
  return (
    <Form className={box({ stacked: true, align: "start" })}>
      <Radio
        label="Label"
        name="messages"
        messageProps={{
          children: "Help text",
        }}
        value="a"
      />
      <Radio
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
