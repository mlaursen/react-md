import type { ReactElement, ReactNode } from "react";
import type { LinkProps as NextLinkProps } from "next/link";
import NextLink from "next/link";
import { Link as RMDLink } from "@react-md/link";

export interface LinkProps extends Omit<NextLinkProps, "as" | "children"> {
  id?: string;
  className?: string;
  children: ReactNode;
  href: string;
}

export default function Link({
  children,
  shallow,
  scroll,
  replace,
  href,
  passHref,
  ...props
}: LinkProps): ReactElement {
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
      passHref={passHref}
    >
      <RMDLink {...props}>{children}</RMDLink>
    </NextLink>
  );
}

Link.defaultProps = {
  passHref: true,
};
