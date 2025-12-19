"use client";

import { CodeBlockAppBar } from "@react-md/code/CodeBlockAppBar";
import {
  type PackageManager,
  usePackageManagerContext,
} from "@react-md/code/PackageManagerProvider";
import { useTabs } from "@react-md/core/tabs/useTabs";
import { type ReactElement, type ReactNode } from "react";

import { PackageManagerTabPanels } from "./PackageManagerTabPanels.js";
import { PackageManagerTabs } from "./PackageManagerTabs.js";

export interface PackageManagerCodeBlockContainerProps {
  managers: Record<PackageManager, ReactNode>;
  className?: string;
}

export function PackageManagerCodeBlockContainer(
  props: PackageManagerCodeBlockContainerProps
): ReactElement {
  const { managers } = props;

  const { packageManager, packageManagers, setPackageManager } =
    usePackageManagerContext();
  const { getTabListProps, getTabProps, getTabPanelProps } = useTabs({
    tabs: packageManagers,
    activeTab: packageManager,
    setActiveTab: setPackageManager,
  });

  return (
    <>
      <CodeBlockAppBar>
        <PackageManagerTabs
          getTabProps={getTabProps}
          getTabListProps={getTabListProps}
          packageManagers={packageManagers}
        />
      </CodeBlockAppBar>
      <PackageManagerTabPanels
        managers={managers}
        packageManagers={packageManagers}
        getTabPanelProps={getTabPanelProps}
      />
    </>
  );
}
