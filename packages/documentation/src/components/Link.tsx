import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link as ReactMDLink, ILinkProps } from "@react-md/link";

const Link: React.SFC<ILinkProps> = props => <ReactMDLink {...props} component={RouterLink} />;
export default Link;
