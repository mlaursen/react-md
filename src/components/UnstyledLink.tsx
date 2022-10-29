import type { LinkProps } from "next/link";
import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";
import { forwardRef } from "react";

export interface UnstyledLinkProps
  extends Omit<
      LinkProps,
      | "children"
      | "passHref"
      | "onError"
      | "as"
      | "onMouseEnter"
      | "onClick"
      | "onTouchStart"
      | "href"
    >,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "onError"> {
  href: string;
}

export const UnstyledLink = forwardRef<HTMLAnchorElement, UnstyledLinkProps>(
  function UnstyledLink(props, ref) {
    const { shallow, scroll, replace, href, children, ...remaining } = props;

    if (href.startsWith("http")) {
      return (
        <a {...remaining} ref={ref} href={href} rel="noopener noreferrer">
          {children}
        </a>
      );
    }

    return (
      <Link
        {...remaining}
        ref={ref}
        shallow={shallow}
        scroll={scroll}
        replace={replace}
        href={href}
      >
        {children}
      </Link>
    );
  }
);
