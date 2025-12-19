"use client";

import { CodeBlockAppBar } from "@react-md/code/CodeBlockAppBar";
import {
  type PackageManager,
  usePackageManagerContext,
} from "@react-md/code/PackageManagerProvider";
import { useTabs } from "@react-md/core/tabs/useTabs";
import { type ReactElement, type ReactNode } from "react";

import { PackageManagerTabPanels } from "@/components/PackageManagerCodeBlock/PackageManagerTabPanels.js";
import { PackageManagerTabs } from "@/components/PackageManagerCodeBlock/PackageManagerTabs.js";

import { useTestFramework } from "./TestFrameworkProvider.js";
import { TestFrameworksToggle } from "./TestFrameworksToggle.js";
import { type TestFramework } from "./constants.js";

export interface TestFrameworkNpmCodeProps {
  frameworks: Record<TestFramework, Record<PackageManager, ReactNode>>;
}

export function TestFrameworkNpmCode({
  frameworks,
}: TestFrameworkNpmCodeProps): ReactElement {
  const { value } = useTestFramework();
  const { packageManager, packageManagers, setPackageManager } =
    usePackageManagerContext();
  const { getTabListProps, getTabProps, getTabPanelProps } = useTabs({
    tabs: packageManagers,
    activeTab: packageManager,
    setActiveTab: setPackageManager,
  });

  return (
    <>
      <CodeBlockAppBar justify="space-between">
        <PackageManagerTabs
          getTabProps={getTabProps}
          getTabListProps={getTabListProps}
          packageManagers={packageManagers}
        />
        <TestFrameworksToggle />
      </CodeBlockAppBar>
      <PackageManagerTabPanels
        managers={frameworks[value]}
        getTabPanelProps={getTabPanelProps}
        packageManagers={packageManagers}
      />
    </>
  );
}
