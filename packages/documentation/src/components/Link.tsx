import React, { FC, ReactNode } from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { Link as RMDLink } from "@react-md/link";

export interface LinkProps extends Omit<NextLinkProps, "children"> {
  id?: string;
  className?: string;
  children: ReactNode;
  href: string;
}

const Link: FC<LinkProps> = ({
  children,
  shallow,
  scroll,
  replace,
  as,
  href,
  passHref,
  ...props
}) => {
  if (href.startsWith("http")) {
    return (
      <RMDLink {...props} href={href}>
        {children}
      </RMDLink>
    );
  }

  return (
    <NextLink
      shallow={shallow}
      scroll={scroll}
      replace={replace}
      href={href}
      as={as}
      passHref={passHref}
    >
      <RMDLink {...props}>{children}</RMDLink>
    </NextLink>
  );
};

Link.defaultProps = {
  passHref: true,
  scroll: false,
};

export default Link;
