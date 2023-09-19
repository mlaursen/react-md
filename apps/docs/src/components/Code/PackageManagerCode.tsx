"use client";
import { DISPLAY_NONE_CLASS, Tab, TabList, useTabs } from "@react-md/core";
import { cnb } from "cnbuilder";
import { type ReactElement } from "react";
import {
  PACKAGE_MANAGERS,
  usePackageManagerContext,
  type PackageManager,
} from "../RootProviders/PackageManagerProvider.jsx";
import { CodeBlock } from "./CodeBlock.jsx";

export type PackageManagerCodeProps = Record<PackageManager, ReactElement>;

export function PackageManagerCode(
  props: PackageManagerCodeProps
): ReactElement {
  const { packageManager, setPackageManager } = usePackageManagerContext();
  const { getTabListProps, getTabProps, getTabPanelProps } = useTabs({
    tabs: PACKAGE_MANAGERS,
    activeTab: packageManager,
    setActiveTab: setPackageManager,
  });

  return (
    <div>
      <TabList
        {...getTabListProps()}
        disableTransition
        style={{ display: "inline-flex", width: "auto" }}
      >
        {PACKAGE_MANAGERS.map((name) => (
          <Tab key={name} {...getTabProps(name)}>
            {name}
          </Tab>
        ))}
      </TabList>
      <div>
        {PACKAGE_MANAGERS.map((name) => {
          const { active, ...panelProps } = getTabPanelProps(name);
          return (
            <div
              key={name}
              {...panelProps}
              className={cnb(!active && DISPLAY_NONE_CLASS)}
            >
              <CodeBlock className="language-shell">{props[name]}</CodeBlock>
            </div>
          );
        })}
      </div>
    </div>
  );
}
