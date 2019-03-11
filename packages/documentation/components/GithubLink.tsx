import React, { FunctionComponent } from "react";
import cn from "classnames";
import { Omit } from "@react-md/utils";

import { GITHUB_URL } from "constants/index";
import GithubSVGIcon from "icons/GithubSVGIcon";

import LinkButton, { LinkButtonProps } from "./LinkButton";

import "./github-link.scss";
export interface GithubLinkProps extends Omit<LinkButtonProps, "href"> {
  href?: string;
  suffix?: string;
}

type WithDefaultProps = GithubLinkProps & { href: string };

const GithubLink: FunctionComponent<GithubLinkProps> = providedProps => {
  const {
    className,
    href,
    suffix,
    ...props
  } = providedProps as WithDefaultProps;

  return (
    <LinkButton
      {...props}
      href={`${href}${suffix}`}
      className={cn("github-link", className)}
    >
      <GithubSVGIcon />
    </LinkButton>
  );
};
GithubLink.defaultProps = {
  href: GITHUB_URL,
  suffix: "",
  target: "_blank",
  theme: "clear",
  buttonType: "icon",
  tooltip: "Open in GitHub",
};

export default GithubLink;
