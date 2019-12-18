import React, { FC } from "react";
import cn from "classnames";
import { bem } from "@react-md/utils";

import { GITHUB_URL } from "constants/github";
import GithubSVGIcon from "icons/GithubSVGIcon";
import LinkButton, { LinkButtonProps } from "components/LinkButton";

import "./GithubLink.scss";

export interface GithubLinkProps extends Omit<LinkButtonProps, "href"> {
  href?: string;
  suffix?: string;
  inherit?: boolean;
}

type WithDefaultProps = GithubLinkProps & { href: string };

const block = bem("github-link");

const GithubLink: FC<GithubLinkProps> = providedProps => {
  const {
    className,
    href,
    suffix,
    inherit,
    ...props
  } = providedProps as WithDefaultProps;

  return (
    <LinkButton
      {...props}
      href={`${href}${suffix}`}
      className={cn(block({ inherit }), className)}
    >
      <GithubSVGIcon />
    </LinkButton>
  );
};

GithubLink.defaultProps = {
  "aria-label": "GitHub",
  href: GITHUB_URL,
  suffix: "",
  target: "_blank",
  theme: "clear",
  buttonType: "icon",
  inherit: false,
};

export default GithubLink;
