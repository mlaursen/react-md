import { link } from "@react-md/core/link/styles";
import { type ReactElement } from "react";
import { type FormattedSassDocItem } from "sassdoc-generator/types";

import { GITHUB_LINK_URL } from "@/constants/env.js";
import {
  SASSDOC_FUNCTIONS,
  SASSDOC_MIXINS,
  SASSDOC_VARIABLES,
} from "@/generated/sassdoc.js";
import { getSassDocLink, isFormattedVariableItem } from "@/utils/sassdoc.js";

import { GithubLink } from "./GithubLink.js";
import { LinkUnstyled, type LinkUnstyledProps } from "./LinkUnstyled.js";

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
    const forceMixin = href.startsWith("mixin#");
    const hrefWithoutForce = href.replace(/^mixin#/, "");
    // allow for stuff like: `[$SASSDOC](theme-get-var(primary-color))`
    const name = hrefWithoutForce.replace(/\(.+\)$/, "");
    const forceVariable = name.startsWith("$");

    const fn = SASSDOC_FUNCTIONS[name];
    const mixin = SASSDOC_MIXINS[name];
    const variable = SASSDOC_VARIABLES[name.replace(/^\$/, "")];
    let item: FormattedSassDocItem | undefined;
    if (forceVariable) {
      item = variable;
    } else if (forceMixin) {
      item = mixin;
    } else {
      item = mixin || fn || variable;
    }
    if (
      process.env.NODE_ENV !== "production" &&
      ((fn && mixin && !forceMixin) || (fn && variable) || (mixin && variable))
    ) {
      throw new Error(`${name} has multiple matches and should be updated.`);
    }

    if (item) {
      const prefix = !forceVariable && isFormattedVariableItem(item) ? "$" : "";
      children = `core.${prefix}${decodeURIComponent(hrefWithoutForce)}`;
      href = getSassDocLink(item);
    } else if (!item && process.env.NODE_ENV !== "production") {
      throw new Error(`Unable to find SassDoc item with name "${href}"`);
    }
  }

  return (
    <LinkUnstyled
      {...remaining}
      href={href.replace(GITHUB, GITHUB_LINK_URL)}
      className={link({ className: remaining.className })}
    >
      {children}
    </LinkUnstyled>
  );
}
