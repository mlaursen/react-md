import { Form, Password, box } from "react-md";
import { type ReactElement } from "react";

export default function PasswordExample(): ReactElement {
  return (
    <Form className={box({ stacked: true, align: "stretch" })}>
      <Password label="Password" theme="outline" />
      <Password label="Password" theme="filled" />
      <Password label="Password" theme="underline" />
    </Form>
  );
}
