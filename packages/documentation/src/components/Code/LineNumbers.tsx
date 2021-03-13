/* eslint-disable react/no-array-index-key */
import React, { ReactElement } from "react";
import { bem } from "@react-md/utils";

export interface LineNumbersProps {
  code: string;
  enabled: boolean;
}

const block = bem("code");

export default function LineNumbers({
  code,
  enabled,
}: LineNumbersProps): ReactElement | null {
  if (!enabled) {
    return null;
  }

  const lines = (code.match(/\r?\n/g) || []).length;

  return (
    <span className={block("lines")}>
      {Array.from({ length: lines }).map((_, i) => (
        <span key={i} className={block("line-number")}>
          {i + 1}
        </span>
      ))}
    </span>
  );
}
