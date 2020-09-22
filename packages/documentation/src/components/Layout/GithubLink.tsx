import React, { ReactElement } from "react";
import { useActionClassName } from "@react-md/app-bar";
import { MenuItemLink } from "@react-md/menu";
import { Tooltipped } from "@react-md/tooltip";

import GithubLinkOriginal from "components/GithubLink";
import { GITHUB_URL } from "constants/github";
import GithubSVGIcon from "icons/GithubSVGIcon";

export interface GithubLinkProps {
  as: "action" | "menuitem";
}

export default function GithubLink({ as }: GithubLinkProps): ReactElement {
  const className = useActionClassName();
  if (as === "menuitem") {
    return (
      <MenuItemLink
        id="main-github-link"
        href={GITHUB_URL}
        leftAddon={<GithubSVGIcon />}
      >
        View Github
      </MenuItemLink>
    );
  }
  return (
    <Tooltipped id="main-github-link" tooltip="View GitHub">
      <GithubLinkOriginal inherit className={className} />
    </Tooltipped>
  );
}
