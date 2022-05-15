import type { ReactElement } from "react";
import { Typography } from "@react-md/typography";

import type { CompiledExample } from "utils/sassdoc";

import Example from "./Example";

export interface ExamplesProps {
  baseId: string;
  examples: CompiledExample[] | undefined;
}

export default function Examples({
  baseId,
  examples,
}: ExamplesProps): ReactElement | null {
  if (!examples) {
    return null;
  }

  return (
    <>
      <Typography type="headline-4" margin="top">
        Examples
      </Typography>
      {examples.map((example, i) => (
        <Example
          key={`${example.type}-${example.description}`}
          {...example}
          id={`${baseId}-example-${i + 1}`}
        />
      ))}
    </>
  );
}
