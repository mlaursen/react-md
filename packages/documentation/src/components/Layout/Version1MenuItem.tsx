import React, { forwardRef } from "react";
import { LinkSVGIcon } from "@react-md/material-icons";
import { MenuItemLink, MenuItemLinkProps } from "@react-md/menu";

import { EventName, sendAnalyticsEvent } from "utils/analytics";

interface Props extends MenuItemLinkProps {
  small?: boolean;
}

export default forwardRef<HTMLAnchorElement, Props>(function Version1MenuItem(
  { small, onClick, ...props },
  ref
) {
  return (
    <MenuItemLink
      {...props}
      ref={ref}
      id="version-1-link"
      leftAddon={!small && <LinkSVGIcon />}
      href="https://mlaursen.github.io/react-md-v1-docs/"
      onClick={(event) => {
        if (onClick) {
          onClick(event);
        }

        sendAnalyticsEvent({
          name: EventName.Version,
          version: "v1",
        });
      }}
    >
      {`${!small ? "react-md" : ""}@v1`}
    </MenuItemLink>
  );
});
