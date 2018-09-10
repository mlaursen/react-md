import * as React from "react";
import { Link } from "@react-md/link";

import { Throw } from "types/sassdoc";

import SassDocTitle from "./SassDocTitle";

export interface IThrowsProps {
  throws?: Throw;
}

const Throws: React.SFC<IThrowsProps> = ({ throws }) => {
  if (!throws || !throws.length) {
    return null;
  }

  return (
    <React.Fragment>
      <SassDocTitle>Throws:</SassDocTitle>
      <code className="sassdoc__throw">{`"${throws.join("")}"`}</code>
    </React.Fragment>
  );
};

export default Throws;
