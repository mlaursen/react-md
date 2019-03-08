import React, { FunctionComponent } from "react";
import cn from "classnames";
import { Omit } from "@react-md/utils";

import GithubSVGIcon from "icons/GithubSVGIcon";

import LinkButton, { ILinkButtonProps } from "./LinkButton";

import "./github-link.scss";
export interface IGithubLinkProps extends Omit<ILinkButtonProps, "href"> {
  href?: string;
}

type WithDefaultProps = IGithubLinkProps & { href: string };

const GithubLink: FunctionComponent<IGithubLinkProps> = ({
  className,
  ...props
}) => (
  <LinkButton
    {...props as WithDefaultProps}
    className={cn("github-link", className)}
  >
    <GithubSVGIcon />
  </LinkButton>
);
GithubLink.defaultProps = {
  href: "https://github.com/mlaursen/react-md",
  target: "_blank",
  theme: "clear",
  buttonType: "icon",
  tooltip: "Open in GitHub",
};

export default GithubLink;
