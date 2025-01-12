import { type PackageManager } from "@react-md/code/PackageManagerProvider";
import { type ProvidedTabPanelProps } from "@react-md/core/tabs/useTabs";
import { DISPLAY_NONE_CLASS } from "@react-md/core/utils/isElementVisible";
import { cnb } from "cnbuilder";
import { type ReactElement, type ReactNode } from "react";

export interface PackageManagerTabPanelsProps {
  managers: Record<PackageManager, ReactNode>;
  packageManagers: readonly PackageManager[];
  getTabPanelProps: (manager: PackageManager) => ProvidedTabPanelProps;
}

export function PackageManagerTabPanels(
  props: PackageManagerTabPanelsProps
): ReactElement {
  const { managers, packageManagers, getTabPanelProps } = props;
  return (
    <>
      {packageManagers.map((name) => {
        const { active, ...panelProps } = getTabPanelProps(name);
        return (
          <div
            {...panelProps}
            key={name}
            className={cnb(!active && DISPLAY_NONE_CLASS)}
          >
            {managers[name]}
          </div>
        );
      })}
    </>
  );
}
