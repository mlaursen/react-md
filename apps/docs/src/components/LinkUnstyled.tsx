import Link, { type LinkProps } from "next/link.js";
import { forwardRef } from "react";

export interface LinkUnstyledProps extends LinkProps {
  href: string;
}

export const LinkUnstyled = forwardRef<HTMLAnchorElement, LinkUnstyledProps>(
  function LinkUnstyled(props, ref) {
    return <Link {...props} ref={ref} />;
  }
);
