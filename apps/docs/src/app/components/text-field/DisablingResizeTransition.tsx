import { Form, TextArea, box } from "react-md";
import { type ReactElement } from "react";

export default function DisablingResizeTransition(): ReactElement {
  return (
    <Form className={box({ stacked: true, align: "stretch" })}>
      <TextArea
        label="Label"
        placeholder="Placeholder..."
        disableTransition
        maxRows={8}
      />
    </Form>
  );
}
