"use client";
import { PackageManagerTabPanels } from "@/components/PackageManagerCodeBlock/PackageManagerTabPanels.jsx";
import { PackageManagerTabs } from "@/components/PackageManagerCodeBlock/PackageManagerTabs.jsx";
import { CodeBlockAppBar } from "@react-md/code/CodeBlockAppBar";
import {
  usePackageManagerContext,
  type PackageManager,
} from "@react-md/code/PackageManagerProvider";
import { useTabs } from "@react-md/core/tabs/useTabs";
import { type ReactElement, type ReactNode } from "react";
import { type TestFramework } from "./constants.js";
import { useTestFramework } from "./TestFrameworkProvider.jsx";
import { TestFrameworksToggle } from "./TestFrameworksToggle.jsx";

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
