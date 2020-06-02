import React, { FC } from "react";
import { Text } from "@react-md/typography";

import { CompiledExample } from "utils/sassdoc";

import Example from "./Example";

export interface ExamplesProps {
  baseId: string;
  examples: CompiledExample[] | undefined;
}

const Examples: FC<ExamplesProps> = ({ baseId, examples }) => {
  if (!examples) {
    return null;
  }

  return (
    <>
      <Text type="headline-4" margin="top">
        Examples
      </Text>
      {examples.map((example, i) => (
        <Example
          key={example.description}
          {...example}
          id={`${baseId}-example-${i + 1}-compiled`}
        />
      ))}
    </>
  );
};

export default Examples;
