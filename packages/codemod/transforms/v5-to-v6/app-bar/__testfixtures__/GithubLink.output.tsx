import type { ReactElement } from "react";
import { MenuItemLink, Tooltip, useTooltip } from "react-md";

import GithubLinkOriginal from "components/GithubLink";
import { GITHUB_URL } from "constants/github";
import GithubSVGIcon from "icons/GithubSVGIcon";

export interface GithubLinkProps {
  as: "action" | "menuitem";
}

export default function GithubLink({ as }: GithubLinkProps): ReactElement {
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
      <GithubLinkOriginal {...elementProps} inherit />
      <Tooltip {...tooltipProps}>View GitHub</Tooltip>
    </>
  );
}
