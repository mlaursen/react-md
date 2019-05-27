import React, { FC } from "react";
import { Tooltipped } from "@react-md/tooltip";

import GithubLinkOriginal from "components/GithubLink";
import { useActionClassName } from "@react-md/app-bar";

const GithubLink: FC = () => (
  <Tooltipped id="main-github-link" tooltip="View GitHub">
    <GithubLinkOriginal inherit className={useActionClassName()} />
  </Tooltipped>
);

export default GithubLink;
