import Link, { type LinkProps } from "next/link.js";
import { forwardRef, type AnchorHTMLAttributes } from "react";

export interface LinkUnstyledProps
  extends LinkProps,
    AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export const LinkUnstyled = forwardRef<HTMLAnchorElement, LinkUnstyledProps>(
  function LinkUnstyled(props, ref) {
    return <Link {...props} ref={ref} />;
  }
);
