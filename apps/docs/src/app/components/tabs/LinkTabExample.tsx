"use client";
import { Tab, TabList, useTabs } from "@react-md/core";
import { useEffect, useState, type ReactElement } from "react";

export default function LinkTabExample(): ReactElement {
  const activeTab = useActiveTab();
  const { getTabListProps, getTabProps } = useTabs({
    tabs,
    activeTab,
    setActiveTab: noop,
  });
  return (
    <>
      <TabList {...getTabListProps()}>
        {tabs.map((tab) => (
          <Tab key={tab} {...getTabProps(tab)} as="a" href={`#${tab}`}>
            {tab}
          </Tab>
        ))}
      </TabList>
    </>
  );
}

const tabs = ["tab-1", "tab-2", "tab-3"] as const;
type ValidTab = (typeof tabs)[number];

const noop = (): void => {
  // do nothing
};

function isValidTab(hash: string): hash is ValidTab {
  return tabs.includes(hash as ValidTab);
}

function useActiveTab(): ValidTab {
  const [activeTab, setActiveTab] = useState<ValidTab>(tabs[0]);
  useEffect(() => {
    const updateHash = (): void => {
      const hash = decodeURIComponent(window.location.hash.substring(1));
      const nextActiveTab = isValidTab(hash) ? hash : tabs[0];
      setActiveTab(nextActiveTab);
    };
    updateHash();

    window.addEventListener("hashchange", updateHash);
    return () => {
      window.removeEventListener("hashchange", updateHash);
    };
  }, []);

  return activeTab;
}
