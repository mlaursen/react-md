"use client";
import { GITHUB_URL } from "@/constants/env.js";
import { GithubIcon } from "@/icons/GithubIcon.jsx";
import { Tooltip, button, useTooltip } from "@react-md/core";
import { type ReactElement } from "react";
import { LinkUnstyled } from "./LinkUnstyled.jsx";

export function GithubLink(): ReactElement {
  const { tooltipProps, elementProps } = useTooltip();
  return (
    <>
      <LinkUnstyled
        {...elementProps}
        aria-label="Github"
        href={GITHUB_URL}
        className={button({ buttonType: "icon" })}
      >
        <GithubIcon />
      </LinkUnstyled>
      <Tooltip {...tooltipProps}>Github</Tooltip>
    </>
  );
}
