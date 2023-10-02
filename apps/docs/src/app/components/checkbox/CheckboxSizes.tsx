import { Checkbox, Form, box } from "@react-md/core";
import { type ReactElement } from "react";

export default function CheckboxSizes(): ReactElement {
  return (
    <Form className={box()}>
      <Checkbox label="Small" size="small" />
      <Checkbox label="Dense" size="dense" />
      <Checkbox label="Normal" size="normal" />
      <Checkbox label="Large" size="large" />
      <Checkbox label="Auto" size="auto" style={{ fontSize: "3rem" }} />
    </Form>
  );
}
