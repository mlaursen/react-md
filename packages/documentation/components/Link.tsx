import React, { FunctionComponent, ReactNode } from "react";
import NextLink, { LinkProps } from "next/link";
import Router from "next/router";
import { Link as RMDLink } from "@react-md/link";
import { Omit } from "@react-md/utils";

import useLinkPrefetch from "hooks/useLinkPrefetch";

export interface ILinkProps extends Omit<LinkProps, "children"> {
  className?: string;
  children: ReactNode;
  href: string;
}

const Link: FunctionComponent<ILinkProps> = ({
  children,
  className,
  prefetch,
  ...props
}) => {
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
