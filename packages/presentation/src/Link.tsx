import React, { FunctionComponent } from "react";
import { Link as ReactMDLink } from "@react-md/link";
import { Link as ReactRouterLink } from "react-router-dom";

const Link: FunctionComponent<any> = props => (
  <ReactMDLink {...props} component={ReactRouterLink} />
);

export default Link;
