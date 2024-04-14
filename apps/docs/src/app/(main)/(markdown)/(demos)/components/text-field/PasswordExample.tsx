import { box } from "@react-md/core/box/styles";
import { Form } from "@react-md/core/form/Form";
import { Password } from "@react-md/core/form/Password";
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
