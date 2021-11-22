import { ReactElement } from "react";
import { Form, Switch } from "@react-md/form";

export default function SwitchExamples(): ReactElement {
  return (
    <Form>
      <Switch id="switch-1" name="switch" label="Switch" />
      <Switch id="switch-2" name="switch" label="Switch" defaultChecked />
      <Switch id="switch-3" name="switch" label="Switch" disabled />
      <Switch
        id="switch-4"
        name="switch"
        label="Switch"
        disabled
        defaultChecked
      />
    </Form>
  );
}
