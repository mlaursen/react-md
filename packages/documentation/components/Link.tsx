import React, { FunctionComponent, ReactNode } from "react";
import NextLink, { LinkProps } from "next/link";
import { Link as RMDLink } from "@react-md/link";
import { Omit } from "@react-md/utils";

export interface ILinkProps extends Omit<LinkProps, "children"> {
  className?: string;
  children: ReactNode;
}

const Link: FunctionComponent<ILinkProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <NextLink {...props}>
      <RMDLink className={className}>{children}</RMDLink>
    </NextLink>
  );
};

Link.defaultProps = {
  prefetch: true,
  passHref: true,
};

export default Link;
