import type { GetStaticProps } from "next";
import type { ReactElement } from "react";
import type { ExampleConfiguration } from "src/components/Example";
import { Example } from "src/components/Example";
import { extractExamples } from "src/utils/examples";

import FlatButtons from "src/components/ButtonExamples/FlatButtons.mdx";

import * as Examples from "src/components/ButtonExamples/examples";

export interface ButtonProps {
  // examples: Record<string, ExampleConfiguration>;
  examples: readonly ExampleConfiguration[];
}

const examples = [] as const;

export default function Button(props: ButtonProps): ReactElement {
  // const { examples } = props;
  // console.log("examples:", examples);
  // console.log("Examples:", Examples);

  return (
    <>
      <FlatButtons />
      {Object.values(Examples).map((Component, i) => (
        <Component key={i} />
      ))}
      {examples.map((example) => (
        <Example {...example} key={example.title} />
      ))}
    </>
  );
}

// export const getStaticProps: GetStaticProps<ButtonProps> = async (context) => {
//   const result = await extractExamples("button");

//   return {
//     props: {
//       examples: [],
//     },
//   };
// };
