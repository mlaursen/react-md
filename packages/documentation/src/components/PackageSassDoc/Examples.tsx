import * as React from "react";

import { ISassDocExample } from "types/sassdoc";
import Markdown from "components/Markdown";
import SassDocTitle from "./SassDocTitle";
import Example from "./Example";

export interface IExamplesProps {
  sassdocId: string;
  examples?: ISassDocExample[];
}

const Examples: React.SFC<IExamplesProps> = ({ sassdocId, examples }) => {
  if (!examples || !examples.length) {
    return null;
  }

  return (
    <React.Fragment>
      <SassDocTitle>Examples</SassDocTitle>
      {examples.map((example, key) => (
        <Example key={key} example={example} sassdocId={sassdocId} />
      ))}
    </React.Fragment>
  );
};

export default Examples;
