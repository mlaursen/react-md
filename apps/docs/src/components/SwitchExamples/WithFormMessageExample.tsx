import { box, Form, Switch } from "@react-md/core";
import type { ReactElement } from "react";
import { useState } from "react";

export function WithFormMessageExample(): ReactElement {
  const [checked, setChecked] = useState(false);

  return (
    <Form
      className={box({ disablePadding: true, stacked: true, align: "start" })}
    >
      <Switch
        label="Label"
        name="enabled"
        checked={checked}
        onChange={(event) => setChecked(event.currentTarget.checked)}
        messageProps={{
          children: <span>Here is some help text!</span>,
        }}
      />
      <Switch
        label="Label"
        name="enabled"
        checked={checked}
        onChange={(event) => setChecked(event.currentTarget.checked)}
        error
        messageProps={{
          error: true,
          children: <span>Error! Some additional information!</span>,
        }}
      />
      <Switch
        label="Label"
        name="enabled"
        checked={checked}
        onChange={(event) => setChecked(event.currentTarget.checked)}
        stacked
        messageProps={{
          children: <span>Here is some help text!</span>,
        }}
      />
      <Switch
        label="Label"
        name="enabled"
        checked={checked}
        onChange={(event) => setChecked(event.currentTarget.checked)}
        stacked
        iconAfter
        error
        messageProps={{
          error: true,
          children: <span>Error! Some additional information!</span>,
        }}
      />
    </Form>
  );
}
