import { box } from "@react-md/core";
import { Form, Radio, useRadioGroup } from "@react-md/form";
import type { ReactElement } from "react";

export function WithFormMessageExample(): ReactElement {
  const { getRadioProps } = useRadioGroup({ name: "enabled" });

  return (
    <Form
      className={box({ disablePadding: true, stacked: true, align: "start" })}
    >
      <Radio
        label="Label"
        {...getRadioProps("a")}
        messageProps={{
          children: <span>Here is some help text!</span>,
        }}
      />
      <Radio
        label="Label"
        {...getRadioProps("b")}
        error
        messageProps={{
          error: true,
          children: <span>Error! Some additional information!</span>,
        }}
      />
      <Radio
        label="Label"
        {...getRadioProps("c")}
        stacked
        messageProps={{
          children: <span>Here is some help text!</span>,
        }}
      />
      <Radio
        label="Label"
        {...getRadioProps("d")}
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
