import * as React from "react";

import { Markdown } from "components/Markdown";

import SassDocTitle from "./SassDocTitle";

export interface IDescriptionProps {
  children: string;
}

const Description: React.FunctionComponent<IDescriptionProps> = ({ children }) => {
  if (!children) {
    return null;
  }

  return (
    <React.Fragment>
      <SassDocTitle>Description</SassDocTitle>
      <Markdown markdown={children} />
    </React.Fragment>
  );
};

export default Description;
