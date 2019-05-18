import React, { FunctionComponent } from "react";
import { bem } from "@react-md/theme";

export interface LineNumbersProps {
  code: string;
  enabled: boolean;
}

const block = bem("code");

const LineNumbers: FunctionComponent<LineNumbersProps> = ({
  code,
  enabled,
}) => {
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
