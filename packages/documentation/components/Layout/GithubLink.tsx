import React, { FC } from "react";
import { useActionClassName } from "@react-md/app-bar";
import { Tooltipped } from "@react-md/tooltip";

import GithubLinkOriginal from "components/GithubLink";

const GithubLink: FC = () => (
  <Tooltipped id="main-github-link" tooltip="View GitHub">
    <GithubLinkOriginal inherit className={useActionClassName()} />
  </Tooltipped>
);

export default GithubLink;
