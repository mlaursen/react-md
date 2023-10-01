/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Checkbox, Form, box, useCheckboxGroup } from "@react-md/core";
import type { ReactElement } from "react";

const themes = ["none", "underline", "filled", "outline"] as const;

type Theme = (typeof themes)[number];

export default function StrictlyTypedUseCheckboxGroup(): ReactElement {
  const {
    getCheckboxProps,

    reset,
    checkedValues,
    setCheckedValues,
  } = useCheckboxGroup<Theme>({
    name: "themes",
    defaultCheckedValues: ["filled"],
  });
  // getCheckboxProps("invalid")
  // ^ This would throw a type error since it is not a `Theme`

  return (
    <Form className={box({ stacked: true, align: "start" })}>
      {themes.map((theme) => (
        <Checkbox {...getCheckboxProps(theme)} key={theme} label={theme} />
      ))}
    </Form>
  );
}
