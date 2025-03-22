import { link } from "@react-md/core/link/styles";
import { type ReactElement } from "react";

import { getSassDocLink } from "@/app/(main)/(markdown)/(apidocs)/sassdoc/[group]/utils.js";
import { GITHUB_LINK_URL } from "@/constants/env.js";
import {
  SASSDOC_FUNCTIONS,
  SASSDOC_MIXINS,
  SASSDOC_VARIABLES,
} from "@/generated/sassdoc.js";

import { GithubLink } from "./GithubLink.jsx";
import { LinkUnstyled, type LinkUnstyledProps } from "./LinkUnstyled.jsx";

export type MarkdownLinkProps = LinkUnstyledProps;

const GITHUB = "$GITHUB";
const SOURCE = "$SOURCE";
const SASSDOC = "$SASSDOC";

export function MarkdownLink(props: MarkdownLinkProps): ReactElement {
  const { href: propHref, children: propChildren, ...remaining } = props;

  let href = propHref;
  let children = propChildren;
  if (children === SOURCE) {
    return <GithubLink file={href} float {...remaining} />;
  }

  if (href.startsWith(GITHUB)) {
    return (
      <GithubLink href={href.replace(GITHUB, GITHUB_LINK_URL)} {...remaining}>
        {children}
      </GithubLink>
    );
  }

  if (children === SASSDOC) {
    // allow for stuff like: `[$SASSDOC](theme-get-var(primary-color))`
    const name = href.replace(/\(.+\)$/, "");
    const forceVariable = name.startsWith("$");

    const fn = SASSDOC_FUNCTIONS[name];
    const mixin = SASSDOC_MIXINS[name];
    const variable = SASSDOC_VARIABLES[name.replace(/^\$/, "")];
    const item = forceVariable ? variable : mixin || fn || variable;
    if (
      process.env.NODE_ENV !== "production" &&
      ((fn && mixin) || (fn && variable) || (mixin && variable))
    ) {
      throw new Error(`${name} has multiple matches and should be updated.`);
    }

    if (item) {
      const prefix =
        item.type === "mixin" || item.type === "function" ? "" : "$";
      children = `core.${prefix}${decodeURIComponent(href)}`;
      href = getSassDocLink(item);
    } else if (!item && process.env.NODE_ENV !== "production") {
      throw new Error(`Unable to find SassDoc item with name "${href}"`);
    }
  }

  return (
    <LinkUnstyled
      {...remaining}
      href={href.replace(GITHUB, GITHUB_LINK_URL)}
      className={link()}
    >
      {children}
    </LinkUnstyled>
  );
}
