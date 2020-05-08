import React, { FC, AnchorHTMLAttributes } from "react";
import Link, { LinkProps } from "next/link";

export interface LinkUnstyledProps
  extends Omit<LinkProps, "children" | "passHref" | "onError">,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "onError" | "href"> {}

const LinkUnstyled: FC<LinkUnstyledProps> = ({
  shallow,
  scroll,
  replace,
  href,
  as,
  children,
  ...props
}) => {
  if (typeof href === "string" && href.startsWith("http")) {
    return (
      <a {...props} href={href} rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link
      shallow={shallow}
      scroll={scroll}
      replace={replace}
      href={href}
      as={as}
    >
      <a {...props}>{children}</a>
    </Link>
  );
};

export default LinkUnstyled;
