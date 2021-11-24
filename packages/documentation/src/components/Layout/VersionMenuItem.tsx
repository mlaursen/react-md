import { forwardRef } from "react";
import { LinkSVGIcon } from "@react-md/material-icons";
import { MenuItemLink, MenuItemLinkProps } from "@react-md/menu";

import { EventName, sendAnalyticsEvent } from "utils/analytics";

export interface VersionMenuItemProps extends MenuItemLinkProps {
  small?: boolean;
  version: `v${string}` | "latest";
}

export default forwardRef<HTMLAnchorElement, VersionMenuItemProps>(
  function VersionMenuItem({ small, version, onClick, ...props }, ref) {
    let href: string;
    switch (version) {
      case "v1":
        href = "https://mlaursen.github.io/react-md-v1-docs/";
        break;
      case "latest":
        href = "https://react-md.dev";
        break;
      default:
        href = `https://${version}.react-md.dev`;
    }

    return (
      <MenuItemLink
        {...props}
        ref={ref}
        id={`version-${version}-link`}
        leftAddon={!small && <LinkSVGIcon />}
        href={href}
        onClick={(event) => {
          onClick?.(event);

          sendAnalyticsEvent({
            name: EventName.Version,
            version,
          });
        }}
      >
        {`${!small ? "react-md" : ""}@${version}`}
      </MenuItemLink>
    );
  }
);
