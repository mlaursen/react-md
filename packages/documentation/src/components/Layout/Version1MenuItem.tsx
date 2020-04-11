import React, { forwardRef } from "react";
import { LinkSVGIcon } from "@react-md/material-icons";
import { MenuItemLink, MenuItemLinkProps } from "@react-md/menu";

interface Props extends MenuItemLinkProps {
  small?: boolean;
}

export default forwardRef<HTMLAnchorElement, Props>(function Version1MenuItem(
  { small, ...props },
  ref
) {
  return (
    <MenuItemLink
      {...props}
      ref={ref}
      id="version-1-link"
      leftAddon={!small && <LinkSVGIcon />}
      href="https://react-md.dev/v1"
    >
      {`${!small ? "react-md" : ""}@v1`}
    </MenuItemLink>
  );
});
