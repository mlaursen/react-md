import * as React from "react";
import { Text } from "@react-md/typography";

import SassDocTitle from "./SassDocTitle";

export interface ITypeProps {
  children: React.ReactNode;
}

const Type: React.SFC<ITypeProps> = ({ children }) => (
  <React.Fragment>
    <SassDocTitle>Type</SassDocTitle>
    <SassDocTitle type="subtitle-1" className="sassdoc__type">{children}</SassDocTitle>
  </React.Fragment>
);

export default Type;
