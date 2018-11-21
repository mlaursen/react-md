import * as React from "react";
import { Throw } from "sassdoc";
import { Link } from "@react-md/link";

import SassDocTitle from "./SassDocTitle";

export interface IThrowsProps {
  throws?: Throw;
}

const Throws: React.FunctionComponent<IThrowsProps> = ({ throws }) => {
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
