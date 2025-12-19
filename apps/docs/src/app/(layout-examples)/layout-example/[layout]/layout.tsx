import { type Metadata } from "next";
import { notFound } from "next/navigation.js";
import { type ComponentType, type ReactElement, type ReactNode } from "react";

import { pascalCase } from "@/utils/strings.js";

import { ExpandableLayoutExample } from "./ExpandableLayoutExample.js";
import { FullHeightExpandableLayoutExample } from "./FullHeightExpandableLayoutExample.js";
import { FullHeightLayoutExample } from "./FullHeightLayoutExample.js";
import { FullHeightResizableLayoutExample } from "./FullHeightResizableLayoutExample.js";
import { ResizableLayoutExample } from "./ResizableLayoutExample.js";
import { TemporaryLayoutExample } from "./TemporaryLayoutExample.js";
import {
  type ExampleLayoutProps,
  LAYOUT_TYPES,
  type LayoutType,
} from "./layouts.js";

const LAYOUTS = {
  temporary: TemporaryLayoutExample,
  expandable: ExpandableLayoutExample,
  "full-height": FullHeightLayoutExample,
  "full-height-expandable": FullHeightExpandableLayoutExample,
  resizable: ResizableLayoutExample,
  "full-height-resizable": FullHeightResizableLayoutExample,
} satisfies Record<LayoutType, ComponentType<ExampleLayoutProps>>;

export interface RouteParams {
  params: Promise<{ layout: string }>;
}

function isLayoutType(layout: string): layout is LayoutType {
  return Object.keys(LAYOUTS).includes(layout);
}

export interface RootLayoutProps extends RouteParams {
  children: ReactNode;
}

export default async function RootLayout(
  props: RootLayoutProps
): Promise<ReactElement> {
  const { children, params } = props;
  const { layout } = await params;
  if (!isLayoutType(layout)) {
    notFound();
  }

  const Layout = LAYOUTS[layout];
  if (!Layout) {
    notFound();
  }

  return <Layout layout={layout}>{children}</Layout>;
}

export async function generateStaticParams(): Promise<{ layout: string }[]> {
  return LAYOUT_TYPES.map((layout) => ({ layout }));
}

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
  const { layout } = await params;

  return {
    title: `react-md: ${pascalCase(layout, " ")} Layout Example`,
    description: `An example ${layout} layout for react-md.`,
  };
}
