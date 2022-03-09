import type { ReactElement } from "react";
import cn from "classnames";

import { GITHUB_URL } from "constants/github";
import GithubSVGIcon from "icons/GithubSVGIcon";
import type { LinkButtonProps } from "components/LinkButton";
import LinkButton from "components/LinkButton";

import styles from "./GithubLink.module.scss";

export interface GithubLinkProps extends Omit<LinkButtonProps, "href"> {
  href?: string;
  suffix?: string;
  inherit?: boolean;
}

export default function GithubLink({
  className,
  href,
  suffix,
  inherit,
  ...props
}: GithubLinkProps): ReactElement {
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
}

GithubLink.defaultProps = {
  "aria-label": "GitHub",
  href: GITHUB_URL,
  suffix: "",
  target: "_blank",
  theme: "clear",
  buttonType: "icon",
  inherit: false,
};
