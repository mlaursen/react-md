import { List } from "@react-md/core/list/List";
import { ListItemLink } from "@react-md/core/list/ListItemLink";
import { ListSubheader } from "@react-md/core/list/ListSubheader";
import BugReportIcon from "@react-md/material-icons/BugReportIcon";
import ColorLensIcon from "@react-md/material-icons/ColorLensIcon";
import DownloadIcon from "@react-md/material-icons/DownloadIcon";
import EditDocumentIcon from "@react-md/material-icons/EditDocumentIcon";
import LaunchIcon from "@react-md/material-icons/LaunchIcon";
import { type ReactElement, type ReactNode } from "react";

import { LinkUnstyled } from "../LinkUnstyled.jsx";

interface LinkConfig {
  href: string;
  leftAddon: ReactNode;
  children: ReactNode;
}

const RECOMMENDATIONS: readonly LinkConfig[] = [
  {
    href: "/getting-started/installation",
    leftAddon: <DownloadIcon />,
    children: "Installation",
  },
  {
    href: "/getting-started/example-projects",
    leftAddon: <LaunchIcon />,
    children: "Example Projects",
  },
  {
    href: "/customization/colors",
    leftAddon: <ColorLensIcon />,
    children: "Colors",
  },
  {
    href: "/customization/global-configuration",
    leftAddon: <EditDocumentIcon />,
    children: "Global Configuration",
  },
  {
    href: "/testing/recipes",
    leftAddon: <BugReportIcon />,
    children: "Testing Recipes",
  },
];

export function NotYetSearched(): ReactElement {
  return (
    <List dense>
      <ListSubheader>Try one of these pages</ListSubheader>
      {RECOMMENDATIONS.map((config) => (
        <ListItemLink key={config.href} {...config} as={LinkUnstyled} />
      ))}
    </List>
  );
}
