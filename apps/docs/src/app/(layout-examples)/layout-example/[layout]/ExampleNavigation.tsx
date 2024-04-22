"use client";
import { type ComponentType, type ReactElement } from "react";
import { ExampleCoreNavigation } from "./ExampleCoreNavigation.jsx";
import { ExampleListNavigation } from "./ExampleListNavigation.jsx";
import { ExampleTreeNavigation } from "./ExampleTreeNavigation.jsx";
import { type LayoutType } from "./layouts.js";
import { useNavType } from "./useNavType.js";

export interface ExampleNavigationProps {
  layout: LayoutType;
}

export function ExampleNavigation(props: ExampleNavigationProps): ReactElement {
  const { layout } = props;

  const navType = useNavType();

  let Navigation: ComponentType<ExampleNavigationProps>;
  switch (navType) {
    case "list":
      Navigation = ExampleListNavigation;
      break;
    case "core":
      Navigation = ExampleCoreNavigation;
      break;
    case "tree":
      Navigation = ExampleTreeNavigation;
      break;
    default:
      throw new Error("Invalid navigation type");
  }

  return <Navigation layout={layout} />;
}
