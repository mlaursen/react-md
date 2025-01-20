"use client";

import { type ReactElement, type ReactNode } from "react";

import { useTestFramework } from "./TestFrameworkProvider.jsx";
import { type TestFramework } from "./constants.js";

export interface RenderFrameworkProps {
  frameworks: Record<TestFramework, ReactNode>;
}

export function RenderFramework(props: RenderFrameworkProps): ReactElement {
  const { frameworks } = props;
  const { value } = useTestFramework();

  return <>{frameworks[value]}</>;
}
