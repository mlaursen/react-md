import React, { FC } from "react";
import cn from "classnames";

import { GITHUB_URL } from "constants/github";
import GithubSVGIcon from "icons/GithubSVGIcon";
import LinkButton, { LinkButtonProps } from "components/LinkButton";

import styles from "./GithubLink.module.scss";

export interface GithubLinkProps extends Omit<LinkButtonProps, "href"> {
  href?: string;
  suffix?: string;
  inherit?: boolean;
}

type WithDefaultProps = GithubLinkProps & { href: string };

const GithubLink: FC<GithubLinkProps> = (providedProps) => {
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
      className={cn(
        styles.link,
        {
          [styles.inherit]: inherit,
        },
        className
      )}
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
