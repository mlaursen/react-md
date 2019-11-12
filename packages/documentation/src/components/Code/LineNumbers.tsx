/* eslint-disable react/no-array-index-key */
import React, { FC } from "react";
import { bem } from "@react-md/utils";

export interface LineNumbersProps {
  code: string;
  enabled: boolean;
}

const block = bem("code");

const LineNumbers: FC<LineNumbersProps> = ({ code, enabled }) => {
  if (!enabled) {
    return null;
  }

  const lines = (code.match(/\r?\n/g) || []).length;

  return (
    <span className={block("lines")}>
      {Array.from(new Array(lines)).map((_, i) => (
        <span key={i} className={block("line-number")}>
          {i + 1}
        </span>
      ))}
    </span>
  );
};

export default LineNumbers;
