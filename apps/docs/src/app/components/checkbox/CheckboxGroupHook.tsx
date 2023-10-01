/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Button, Checkbox, Form, box, useCheckboxGroup } from "@react-md/core";
import { type ReactElement } from "react";

const themes = ["none", "underline", "filled", "outline"] as const;

export default function CheckboxGroupHook(): ReactElement {
  const {
    getCheckboxProps,
    getIndeterminateProps,
    reset,
    checkedValues,
    setCheckedValues,
  } = useCheckboxGroup({
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
