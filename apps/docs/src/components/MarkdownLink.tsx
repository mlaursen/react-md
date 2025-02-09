import { link } from "@react-md/core/link/styles";
import { type ReactElement } from "react";

import { GITHUB_LINK_URL } from "@/constants/env.js";

import { GithubLink } from "./GithubLink.jsx";
import { LinkUnstyled, type LinkUnstyledProps } from "./LinkUnstyled.jsx";

export type MarkdownLinkProps = LinkUnstyledProps;

const SOURCE = "$SOURCE";

export function MarkdownLink(props: MarkdownLinkProps): ReactElement {
  const { href, children, ...remaining } = props;
  if (children === SOURCE) {
    return <GithubLink file={href} float {...remaining} />;
  }

  return (
    <LinkUnstyled
      {...remaining}
      href={href.replace("$GITHUB", GITHUB_LINK_URL)}
      className={link()}
    >
      {children}
    </LinkUnstyled>
  );
}
