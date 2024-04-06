import { GITHUB_URL } from "@/constants/env.js";
import { button } from "@react-md/core/button/buttonStyles";
import { Tooltip } from "@react-md/core/tooltip/Tooltip";
import { useTooltip } from "@react-md/core/tooltip/useTooltip";
import { type ReactElement } from "react";
import { GithubIcon } from "./GithubIcon.jsx";
import { LinkUnstyled } from "./LinkUnstyled.jsx";

export interface GithubLinkProps {
  href?: string;
}

export function GithubLink(props: GithubLinkProps): ReactElement {
  const { href = GITHUB_URL } = props;

  const { tooltipProps, elementProps } = useTooltip<HTMLAnchorElement>();

  return (
    <>
      <LinkUnstyled
        {...elementProps}
        aria-label="Github"
        href={href}
        className={button({ buttonType: "icon" })}
      >
        <GithubIcon />
      </LinkUnstyled>
      <Tooltip {...tooltipProps} textOverflow="nowrap">
        Github
      </Tooltip>
    </>
  );
}
