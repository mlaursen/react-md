import React, { FC, forwardRef } from "react";
import { LinkSVGIcon } from "@react-md/material-icons";
import { MenuItemLink, MenuItemLinkProps } from "@react-md/menu";
import { WithForwardedRef } from "@react-md/utils";

interface Props extends MenuItemLinkProps {
  small?: boolean;
}

const Version1MenuItem: FC<Props & WithForwardedRef<HTMLAnchorElement>> = ({
  small,
  forwardedRef,
  ...props
}) => (
  <MenuItemLink
    {...props}
    id="version-1-link"
    ref={forwardedRef}
    leftIcon={!small && <LinkSVGIcon />}
    href="https://react-md.mlaursen.com"
  >
    {`${!small ? "react-md" : ""}@v1`}
  </MenuItemLink>
);

export default forwardRef<HTMLAnchorElement, Props>((props, ref) => (
  <Version1MenuItem {...props} forwardedRef={ref} />
));
