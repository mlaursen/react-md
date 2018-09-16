import * as React from "react";
import { IExample } from "sassdoc";

import Markdown from "components/Markdown";
import SassDocTitle from "./SassDocTitle";

export interface IExamplesProps {
  examples?: IExample[];
}

const Examples: React.SFC<IExamplesProps> = ({ examples }) => {
  if (!examples || !examples.length) {
    return null;
  }

  return (
    <React.Fragment>
      <SassDocTitle>Examples</SassDocTitle>
      {examples.map(({ code, description, type }, key) => (
        <Markdown
          key={key}
          className="sassdoc__example"
          markdown={`##### ${description}\n\n\`\`\`${type}\n${code}\`\`\``}
        />
      ))}
    </React.Fragment>
  );
};

export default Examples;
