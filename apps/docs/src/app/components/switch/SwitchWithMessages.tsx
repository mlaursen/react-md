import { Form, Switch, box } from "@react-md/core";
import { type ReactElement } from "react";

export default function SwitchWithMessages(): ReactElement {
  return (
    <Form className={box({ align: "start", stacked: true })}>
      <Switch label="Label" messageProps={{ children: "Help Text" }} />
      <Switch
        label="Label"
        error
        messageProps={{ children: "Error!", error: true }}
      />
      <Switch
        label="Stacked"
        stacked
        iconAfter
        messageProps={{ children: "Help Text" }}
      />
      <Switch
        label="Stacked"
        error
        stacked
        iconAfter
        messageProps={{ children: "Error!", error: true }}
      />
    </Form>
  );
}
