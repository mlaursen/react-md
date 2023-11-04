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
import { CodeBlockHeader } from "./CodeBlockHeader.jsx";
import styles from "./PackageManagerCodeBlock.module.scss";

const CLASS_NAME = "language-sh";

export type PackageManagerCodeBlockProps = Record<PackageManager, string> & {
  lineWrap?: boolean;
};

export function PackageManagerCodeBlock(
  props: PackageManagerCodeBlockProps
): ReactElement {
  const { lineWrap, ...managers } = props;
  const { packageManager, setPackageManager } = usePackageManagerContext();
  const { getTabListProps, getTabProps, getTabPanelProps } = useTabs({
    tabs: PACKAGE_MANAGERS,
    activeTab: packageManager,
    setActiveTab: setPackageManager,
  });

  return (
    <>
      <CodeBlockHeader>
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
      </CodeBlockHeader>
      <CodeBlock className={CLASS_NAME} disableMarginTop lineWrap={lineWrap}>
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
                dangerouslySetInnerHTML={{ __html: managers[name] }}
              />
            </div>
          );
        })}
      </CodeBlock>
    </>
  );
}
