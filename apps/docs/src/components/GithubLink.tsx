"use client";
import { GITHUB_LINK_URL, GITHUB_URL } from "@/constants/env.js";
import {
  button,
  type ButtonClassNameOptions,
} from "@react-md/core/button/buttonStyles";
import { Tooltip } from "@react-md/core/tooltip/Tooltip";
import {
  type TooltipOptions,
  useTooltip,
} from "@react-md/core/tooltip/useTooltip";
import { type AnchorHTMLAttributes, type ReactElement } from "react";
import { GithubIcon } from "./GithubIcon.jsx";
import { LinkUnstyled } from "./LinkUnstyled.jsx";

export interface GithubLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement>,
    ButtonClassNameOptions {
  href?: string;
  file?: string;
  /** @defaultValue `"Github"` */
  label?: string;
  tooltipOptions?: TooltipOptions<HTMLAnchorElement>;
}

export function GithubLink(props: GithubLinkProps): ReactElement {
  const {
    file,
    href = file ? `${GITHUB_LINK_URL}/${file}` : GITHUB_URL,
    label = "Github",
    className,
    disabled,
    theme,
    themeType,
    responsive,
    iconSize,
    tooltipOptions,
    ...remaining
  } = props;

  const { tooltipProps, elementProps } = useTooltip(tooltipOptions);

  return (
    <>
      <LinkUnstyled
        {...remaining}
        {...elementProps}
        aria-label={label}
        href={href}
        className={button({
          iconSize,
          disabled,
          theme,
          themeType,
          responsive,
          className,
          buttonType: "icon",
        })}
      >
        <GithubIcon />
      </LinkUnstyled>
      <Tooltip {...tooltipProps} textOverflow="nowrap">
        {label}
      </Tooltip>
    </>
  );
}
