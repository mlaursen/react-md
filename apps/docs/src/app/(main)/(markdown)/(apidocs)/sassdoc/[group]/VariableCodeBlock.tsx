"use client";

import { Switch } from "@react-md/core/form/Switch";
import { useToggle } from "@react-md/core/useToggle";
import { type ReactElement } from "react";

import { MarkdownCode } from "@/components/MarkdownCode.jsx";

export interface VariableCodeBlockProps {
  code: string;
  compiled: string;
}

export function VariableCodeBlock({
  code,
  compiled,
}: VariableCodeBlockProps): ReactElement {
  const { toggled: checked, toggle } = useToggle();
  const visibleCode = checked ? compiled : code;
  return (
    <>
      <Switch
        label="Default Compiled Value"
        checked={checked}
        onChange={toggle}
      />
      <MarkdownCode language="scss">{visibleCode}</MarkdownCode>
    </>
  );
}
