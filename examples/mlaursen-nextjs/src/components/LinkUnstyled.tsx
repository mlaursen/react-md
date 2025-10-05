import Link, { type LinkProps } from "next/link.js";
import { type AnchorHTMLAttributes, type ReactNode } from "react";

export interface LinkUnstyledProps
  extends LinkProps,
    AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
}

export function LinkUnstyled(props: Readonly<LinkUnstyledProps>): ReactElement {
  if (props.href.startsWith("https://") || props.href.endsWith(".html")) {
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    return <a {...props} ref={ref} />;
  }

  return <Link {...props} ref={ref} />;
}
