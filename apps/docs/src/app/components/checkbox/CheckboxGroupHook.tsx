/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Button, Checkbox, Form, box, useCheckboxGroup } from "react-md";
import { type ReactElement } from "react";

const themes = ["none", "underline", "filled", "outline"] as const;
type Theme = (typeof themes)[number];

export default function CheckboxGroupHook(): ReactElement {
  const {
    getCheckboxProps,
    getIndeterminateProps,
    reset,

    // a `ReadonlySet` of the current checked values
    checkedValues,

    // a `UseStateSetter` to manually control the state if needed
    setCheckedValues,
  } = useCheckboxGroup<Theme>({
    name: "themes",
    values: themes,
    // This is optional. Defaults to no checked items
    defaultCheckedValues: ["underline", "filled"],
  });

  return (
    <Form className={box({ stacked: true, align: "start" })} onReset={reset}>
      <Checkbox {...getIndeterminateProps()} label="All" />
      {themes.map((theme) => (
        <Checkbox {...getCheckboxProps(theme)} key={theme} label={theme} />
      ))}
      <Button type="reset">Reset</Button>
    </Form>
  );
}
