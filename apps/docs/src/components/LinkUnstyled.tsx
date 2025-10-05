import Link, { type LinkProps } from "next/link.js";
import { type AnchorHTMLAttributes, forwardRef } from "react";

export interface LinkUnstyledProps
  extends LinkProps,
    AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export const LinkUnstyled = forwardRef<HTMLAnchorElement, LinkUnstyledProps>(
  function LinkUnstyled(props, ref) {
    if (props.href.endsWith(".html")) {
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      return <a {...props} ref={ref} />;
    }

    return <Link {...props} ref={ref} />;
  }
);
