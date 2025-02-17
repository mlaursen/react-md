"use client";

import {
  type ButtonClassNameOptions,
  button,
} from "@react-md/core/button/buttonStyles";
import { Tooltip } from "@react-md/core/tooltip/Tooltip";
import {
  type TooltipOptions,
  useTooltip,
} from "@react-md/core/tooltip/useTooltip";
import { cnb } from "cnbuilder";
import { type AnchorHTMLAttributes, type ReactElement } from "react";

import { GITHUB_LINK_URL, GITHUB_URL } from "@/constants/env.js";

import { GithubIcon } from "./GithubIcon.jsx";
import styles from "./GithubLink.module.scss";
import { LinkUnstyled } from "./LinkUnstyled.jsx";

export interface GithubLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement>,
    ButtonClassNameOptions {
  file?: string;

  /** @defaultValue ``file ? `${GITHUB_LINK_URL}/${file}` : GITHUB_URL`` */
  href?: string;

  /** @defaultValue `file ? "Source code" : "Github"` */
  label?: string;

  /**
   * @defaultValue `{ defaultPosition: file ? "left" : "below", ...tooltipOptions }`
   */
  tooltipOptions?: TooltipOptions<HTMLAnchorElement>;

  /**
   * Set this to `true` to `float: right` to right align in headings (normally
   * a `LinkableHeading`).
   */
  float?: boolean;
}

export function GithubLink(props: GithubLinkProps): ReactElement {
  const {
    file,
    href = file ? `${GITHUB_LINK_URL}/${file}` : GITHUB_URL,
    label = file ? "Source code" : "Github",
    float,
    className,
    disabled,
    theme,
    themeType,
    responsive,
    iconSize = float ? "small" : undefined,
    children = <GithubIcon />,
    buttonType = typeof children === "string" ? "text" : "icon",
    tooltipOptions,
    ...remaining
  } = props;

  const { tooltipProps, elementProps } = useTooltip({
    defaultPosition: file ? "left" : "below",
    disabled: buttonType !== "icon",
    ...tooltipOptions,
  });

  return (
    <>
      <LinkUnstyled
        {...remaining}
        {...elementProps}
        aria-label={label}
        href={href}
        className={cnb(
          buttonType !== "text" &&
            button({
              iconSize,
              disabled,
              theme,
              themeType,
              responsive,
              buttonType,
            }),
          float && styles.float,
          className
        )}
      >
        {children}
      </LinkUnstyled>
      <Tooltip {...tooltipProps} textOverflow="nowrap">
        {label}
      </Tooltip>
    </>
  );
}
