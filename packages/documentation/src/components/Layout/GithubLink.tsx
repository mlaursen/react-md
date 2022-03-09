import { ReactElement } from "react";
import { useActionClassName } from "@react-md/app-bar";
import { MenuItemLink } from "@react-md/menu";
import { Tooltip, useTooltip } from "@react-md/tooltip";

import GithubLinkOriginal from "components/GithubLink";
import { GITHUB_URL } from "constants/github";
import GithubSVGIcon from "icons/GithubSVGIcon";

export interface GithubLinkProps {
  as: "action" | "menuitem";
}

export default function GithubLink({ as }: GithubLinkProps): ReactElement {
  const className = useActionClassName();
  const { elementProps, tooltipProps } = useTooltip({
    baseId: "main-github-link",
  });

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
    <>
      <GithubLinkOriginal {...elementProps} inherit className={className} />
      <Tooltip {...tooltipProps}>View GitHub</Tooltip>
    </>
  );
}
