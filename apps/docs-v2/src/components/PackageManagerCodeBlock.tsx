"use client";
import { CodeBlock } from "@react-md/code/CodeBlock";
import { CodeBlockAppBar } from "@react-md/code/CodeBlockAppBar";
import {
  usePackageManagerContext,
  type PackageManager,
} from "@react-md/code/PackageManagerProvider";
import { Tab } from "@react-md/core/tabs/Tab";
import { TabList } from "@react-md/core/tabs/TabList";
import { useTabs } from "@react-md/core/tabs/useTabs";
import { DISPLAY_NONE_CLASS } from "@react-md/core/utils/isElementVisible";
import { cnb } from "cnbuilder";
import { type ReactElement } from "react";
import styles from "./PackageManagerCodeBlock.module.scss";

const CLASS_NAME = "language-sh";

export interface PackageManagerCodeBlockProps {
  lineWrap?: boolean;
  managers: Record<PackageManager, string>;
}

export function PackageManagerCodeBlock(
  props: PackageManagerCodeBlockProps
): ReactElement {
  const { lineWrap, managers } = props;

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
        <TabList
          {...getTabListProps()}
          inline
          className={styles.tabs}
          disableTransition
        >
          {packageManagers.map((name) => (
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
      </CodeBlockAppBar>
      {packageManagers.map((name) => {
        const { active, ...panelProps } = getTabPanelProps(name);
        return (
          <div
            {...panelProps}
            key={name}
            className={cnb(!active && DISPLAY_NONE_CLASS)}
          >
            <CodeBlock
              lineWrap={lineWrap}
              className={CLASS_NAME}
              disableMarginTop
            >
              <code
                className={CLASS_NAME}
                dangerouslySetInnerHTML={{ __html: managers[name] }}
              />
            </CodeBlock>
          </div>
        );
      })}
    </>
  );
}
