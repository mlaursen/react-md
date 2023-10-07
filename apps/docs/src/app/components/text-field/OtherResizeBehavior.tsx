import { Form, TextArea, box } from "@react-md/core";
import { type ReactElement } from "react";

export default function OtherResizeBehavior(): ReactElement {
  return (
    <Form
      className={box({ stacked: true, align: "start", fullWidth: true })}
      style={{ minWidth: 0 }}
    >
      <TextArea
        label="Resize both"
        placeholder="Placeholder..."
        resize="both"
      />
      <TextArea
        label="Resize horizontal"
        placeholder="Placeholder..."
        resize="horizontal"
      />
      <TextArea
        label="Resize vertical"
        placeholder="Placeholder..."
        resize="vertical"
      />
      <TextArea label="No resize" placeholder="Placeholder..." resize="none" />
    </Form>
  );
}
