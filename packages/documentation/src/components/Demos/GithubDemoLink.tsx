import React, { ReactElement } from "react";
import { Tooltipped } from "@react-md/tooltip";

import GithubLink from "components/GithubLink";

export interface GithubDemoLinkProps {
  id: string;
  href: string;
}

export default function GithubDemoLink({
  id,
  href,
}: GithubDemoLinkProps): ReactElement {
  return (
    <Tooltipped id={id} tooltip="View source GitHub">
      <GithubLink href={href} />
    </Tooltipped>
  );
}
