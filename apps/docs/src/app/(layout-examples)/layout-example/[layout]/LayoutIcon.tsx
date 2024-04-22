import { type SVGIconProps } from "@react-md/core/icon/SVGIcon";
import AllOutIcon from "@react-md/material-icons/AllOutIcon";
import DensityLargeIcon from "@react-md/material-icons/DensityLargeIcon";
import ExpandIcon from "@react-md/material-icons/ExpandIcon";
import FullscreenIcon from "@react-md/material-icons/FullscreenIcon";
import MenuOpenIcon from "@react-md/material-icons/MenuOpenIcon";
import OpenInFullIcon from "@react-md/material-icons/OpenInFullIcon";
import { type ComponentType, type ReactElement } from "react";
import { type LayoutType } from "./layouts.js";

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
  }

  return <Component {...remaining} />;
}
