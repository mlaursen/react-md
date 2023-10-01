import { GITHUB_LINK_URL } from "@/constants/env.js";
import { link } from "@react-md/core";
import { type ReactElement } from "react";
import { LinkUnstyled, type LinkUnstyledProps } from "./LinkUnstyled.jsx";

export type MarkdownLinkProps = LinkUnstyledProps;

export function MarkdownLink(props: MarkdownLinkProps): ReactElement {
  const { href, ...remaining } = props;

  return (
    <LinkUnstyled
      {...remaining}
      href={href.replace("$GITHUB", GITHUB_LINK_URL)}
      className={link()}
    />
  );
}
