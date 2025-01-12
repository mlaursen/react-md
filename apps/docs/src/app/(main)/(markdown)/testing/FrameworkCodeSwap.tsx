import { type ReactElement } from "react";
import TestFrameworkCodeBlock, {
  type TestFrameworkCodeBlockProps,
} from "./TestFrameworkCodeBlock.jsx";

export interface FrameworkCodeSwapProps
  extends Omit<TestFrameworkCodeBlockProps, "code"> {
  code: string;
  replacement?: {
    jest: string;
    vitest: string;
  };
}

export function FrameworkCodeSwap(props: FrameworkCodeSwapProps): ReactElement {
  const {
    code,
    replacement = { jest: "jest-globals", vitest: "vitest" },
    ...remaining
  } = props;
  return (
    <TestFrameworkCodeBlock
      {...remaining}
      code={{
        jest: code.replace(/{FRAMEWORK}/g, replacement.jest),
        vitest: code.replace(/{FRAMEWORK}/g, replacement.vitest),
      }}
    />
  );
}
