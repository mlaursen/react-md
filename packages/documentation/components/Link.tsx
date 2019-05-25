import React, { FC, ReactNode } from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { Link as RMDLink } from "@react-md/link";
import { Omit } from "@react-md/utils";

import useLinkPrefetch from "hooks/useLinkPrefetch";

export interface LinkProps extends Omit<NextLinkProps, "children"> {
  className?: string;
  children: ReactNode;
  href: string;
}

const Link: FC<LinkProps> = ({ children, className, prefetch, ...props }) => {
  const { href } = props;
  const handlers = useLinkPrefetch({ href, disabled: !prefetch });

  return (
    <NextLink {...props}>
      <RMDLink {...handlers} className={className}>
        {children}
      </RMDLink>
    </NextLink>
  );
};

Link.defaultProps = {
  prefetch: true,
  passHref: true,
  scroll: false,
};

export default Link;
