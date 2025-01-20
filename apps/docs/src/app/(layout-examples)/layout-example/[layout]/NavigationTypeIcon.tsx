import { type SVGIconProps } from "@react-md/core/icon/SVGIcon";
import ForestIcon from "@react-md/material-icons/ForestIcon";
import ListIcon from "@react-md/material-icons/ListIcon";
import StyleIcon from "@react-md/material-icons/StyleIcon";
import { type ComponentType, type ReactElement } from "react";

import { type NavigationType } from "./navTypes.js";

export interface NavigationTypeIconProps extends SVGIconProps {
  navType: NavigationType;
}

export function NavigationTypeIcon(
  props: NavigationTypeIconProps
): ReactElement {
  const { navType, ...remaining } = props;

  let Component: ComponentType<SVGIconProps>;
  switch (navType) {
    case "list":
      Component = ListIcon;
      break;
    case "core":
      Component = StyleIcon;
      break;
    case "tree":
      Component = ForestIcon;
      break;
  }

  return <Component {...remaining} />;
}
