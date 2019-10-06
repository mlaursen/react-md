import React, { FC, HTMLAttributes } from "react";
import Link, { LinkProps } from "next/link";

export interface LinkUnstyledProps
  extends Omit<LinkProps, "children" | "passHref" | "onError">,
    Omit<HTMLAttributes<HTMLAnchorElement>, "onError"> {
  href: string;
}

const LinkUnstyled: FC<LinkUnstyledProps> = ({
  prefetch,
  shallow,
  scroll,
  replace,
  href,
  as,
  children,
  ...props
}) => {
  if (href.startsWith("http")) {
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

LinkUnstyled.defaultProps = {
  scroll: false,
  prefetch: true,
};

export default LinkUnstyled;
