"use client";

import { useTypescriptEnabledContext } from "@react-md/code/TypescriptEnabledProvider";
import { type ReactElement, type ReactNode } from "react";

export interface StackBlitzFormProps {
  children: ReactNode;
  typescript: ReactNode;
  javascript: ReactNode;
}

export function StackBlitzForm({
  children,
  typescript,
  javascript,
}: StackBlitzFormProps): ReactElement {
  const { isTypescriptEnabled } = useTypescriptEnabledContext();
  const filePath = `src/components/App.${isTypescriptEnabled ? "t" : "j"}sx`;
  return (
    <form
      method="post"
      action={`https://stackblitz.com/run?file=${encodeURIComponent(filePath)}`}
      target="_blank"
    >
      {isTypescriptEnabled ? typescript : javascript}
      {children}
    </form>
  );
}
