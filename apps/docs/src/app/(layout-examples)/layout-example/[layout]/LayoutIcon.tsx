import ForestIcon from "@react-md/material-icons/ForestIcon";
import AllOutIcon from "node_modules/@react-md/material-icons/src/AllOutIcon.jsx";
import DensityLargeIcon from "node_modules/@react-md/material-icons/src/DensityLargeIcon.jsx";
import ExpandIcon from "node_modules/@react-md/material-icons/src/ExpandIcon.jsx";
import FullscreenIcon from "node_modules/@react-md/material-icons/src/FullscreenIcon.jsx";
import MenuOpenIcon from "node_modules/@react-md/material-icons/src/MenuOpenIcon.jsx";
import OpenInFullIcon from "node_modules/@react-md/material-icons/src/OpenInFullIcon.jsx";
import { type ComponentType, type ReactElement } from "react";
import { type LayoutType } from "./layouts.js";
import { type SVGIconProps } from "@react-md/core/icon/SVGIcon";

export interface LayoutIconProps extends SVGIconProps {
  layout: LayoutType;
}

export function LayoutIcon(props: LayoutIconProps): ReactElement {
  const { layout, ...remaining } = props;
  let Component: ComponentType<SVGIconProps>;
  switch (layout) {
    case "temporary":
      Component = MenuOpenIcon;
      break;
    case "expandable":
      Component = ExpandIcon;
      break;
    case "resizable":
      Component = OpenInFullIcon;
      break;
    case "full-height":
      Component = FullscreenIcon;
      break;
    case "full-height-expandable":
      Component = DensityLargeIcon;
      break;
    case "full-height-resizable":
      Component = AllOutIcon;
      break;
    case "tree":
      Component = ForestIcon;
      break;
  }

  return <Component {...remaining} />;
}
