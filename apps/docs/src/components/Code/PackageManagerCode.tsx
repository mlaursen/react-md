"use client";
import {
  PACKAGE_MANAGERS,
  usePackageManagerContext,
  type PackageManager,
} from "@/providers/PackageManagerProvider.jsx";
import { DISPLAY_NONE_CLASS, Tab, TabList, useTabs } from "@react-md/core";
import { cnb } from "cnbuilder";
import { type ReactElement } from "react";
import { CodeBlock } from "./CodeBlock.jsx";
import styles from "./PackageManagerCode.module.scss";

const CLASS_NAME = "language-sh";

export type PackageManagerCodeProps = Record<PackageManager, string>;

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
    <CodeBlock
      className={CLASS_NAME}
      header={
        <TabList
          {...getTabListProps()}
          inline
          className={styles.tabs}
          disableTransition
        >
          {PACKAGE_MANAGERS.map((name) => (
            <Tab
              key={name}
              {...getTabProps(name)}
              className={styles.tab}
              activeIndicator
            >
              {name}
            </Tab>
          ))}
        </TabList>
      }
    >
      {PACKAGE_MANAGERS.map((name) => {
        const { active, ...panelProps } = getTabPanelProps(name);
        return (
          <div
            {...panelProps}
            key={name}
            className={cnb(!active && DISPLAY_NONE_CLASS)}
          >
            <code
              className={CLASS_NAME}
              dangerouslySetInnerHTML={{ __html: props[name] }}
            />
          </div>
        );
      })}
    </CodeBlock>
  );
}
