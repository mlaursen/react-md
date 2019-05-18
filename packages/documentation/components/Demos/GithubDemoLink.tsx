import React, { FunctionComponent } from "react";
import { Tooltipped } from "@react-md/tooltip";

import GithubLink from "components/GithubLink";

export interface GithubDemoLinkProps {
  id: string;
  href: string;
}

const GithubDemoLink: FunctionComponent<GithubDemoLinkProps> = ({
  id,
  href,
}) => (
  <Tooltipped id={id} tooltip="View on GitHub">
    <GithubLink href={href} />
  </Tooltipped>
);

export default GithubDemoLink;
