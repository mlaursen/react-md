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
import { cnb } from "cnbuilder";
import { type AnchorHTMLAttributes, type ReactElement } from "react";
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
   * Set this to `"absolute"` to use absolute positioning to the right edge of
   * a `position: relative` container (normally a `LinkableHeading`)
   */
  position?: null | "absolute";
}

export function GithubLink(props: GithubLinkProps): ReactElement {
  const {
    file,
    href = file ? `${GITHUB_LINK_URL}/${file}` : GITHUB_URL,
    label = file ? "Source code" : "Github",
    position,
    className,
    disabled,
    theme,
    themeType,
    responsive,
    iconSize = position === "absolute" ? "small" : undefined,
    tooltipOptions,
    ...remaining
  } = props;

  const { tooltipProps, elementProps } = useTooltip({
    defaultPosition: file ? "left" : "below",
    ...tooltipOptions,
  });

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
          className: cnb(position === "absolute" && styles.absolute, className),
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
