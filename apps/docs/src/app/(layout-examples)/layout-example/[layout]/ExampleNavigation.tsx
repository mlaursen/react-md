"use client";
import { useSearchParams } from "next/navigation.js";
import { type ComponentType, type ReactElement } from "react";
import { ExampleCoreNavigation } from "./ExampleCoreNavigation.jsx";
import { ExampleListNavigation } from "./ExampleListNavigation.jsx";
import { ExampleTreeNavigation } from "./ExampleTreeNavigation.jsx";
import { type LayoutType } from "./layouts.js";
import { type NavigationType } from "./navTypes.js";

function getNavType(navType: string | null): NavigationType {
  return navType === "core" || navType === "list" || navType === "tree"
    ? navType
    : "core";
}

export interface ExampleNavigationProps {
  layout: LayoutType;
}

export function ExampleNavigation(props: ExampleNavigationProps): ReactElement {
  const { layout } = props;

  const searchParams = useSearchParams();
  const navType = getNavType(searchParams.get("navType"));

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
