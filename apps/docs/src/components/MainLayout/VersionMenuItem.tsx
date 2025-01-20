"use client";

import { ListItemLink } from "@react-md/core/list/ListItemLink";
import { type ReactElement } from "react";

export interface VersionMenuItemProps {
  version: `v${number}`;
  latest?: boolean;
}

export function VersionMenuItem(props: VersionMenuItemProps): ReactElement {
  const { version, latest } = props;

  let href: string;
  if (latest) {
    href = "https://react-md.dev";
  } else {
    switch (version) {
      case "v1":
        href = "https://mlaursen.github.io/react-md-v1-docs/";
        break;
      default:
        href = `https://${version}.react-md.dev`;
    }
  }

  return (
    <ListItemLink role="menuitem" href={href}>
      {version}
      {latest && " (latest)"}
    </ListItemLink>
  );
}
