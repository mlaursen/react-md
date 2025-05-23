import { box } from "@react-md/core/box/styles";
import { Form } from "@react-md/core/form/Form";
import { Switch } from "@react-md/core/form/Switch";
import { type ReactElement } from "react";

export default function SwitchSizes(): ReactElement {
  return (
    <Form className={box({ align: "start", stacked: true })}>
      <Switch label="Small" style={{ fontSize: "0.75rem" }} />
      <Switch label="Medium" style={{ fontSize: "1.25rem" }} />
      <Switch label="Large" style={{ fontSize: "2rem" }} />
      <Switch label="Toggle Only" trackStyle={{ fontSize: "1.5rem" }} />
    </Form>
  );
}
