/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Button, Checkbox, Form, box, useCheckboxGroup } from "@react-md/core";
import type { ReactElement } from "react";

const themes = ["none", "underline", "filled", "outline"] as const;

export default function UsingTheUseCheckboxGroupHook(): ReactElement {
  const {
    getCheckboxProps,

    reset,
    // a ReadonlySet of the checked values
    checkedValues,

    // A UseStateSetter that can be used to manually control the state if needed
    setCheckedValues,
  } = useCheckboxGroup({
    name: "themes",

    // an optional list of values to be checked by default. This will also
    // be used when the reset function is called
    // defaultCheckedValues: []
  });

  return (
    <Form className={box({ stacked: true, align: "start" })} onReset={reset}>
      {themes.map((theme) => (
        <Checkbox {...getCheckboxProps(theme)} key={theme} label={theme} />
      ))}
      <Button type="reset" theme="warning" themeType="contained">
        Reset
      </Button>
    </Form>
  );
}
