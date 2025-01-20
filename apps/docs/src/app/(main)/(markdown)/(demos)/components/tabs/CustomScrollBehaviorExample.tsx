"use client";

import { Tab } from "@react-md/core/tabs/Tab";
// import { getTabListScrollToOptions } from "@react-md/core/tabs/getTabListScrollToOptions";
import { TabList } from "@react-md/core/tabs/TabList";
import { useTabs } from "@react-md/core/tabs/useTabs";
import { type ReactElement } from "react";

export default function CustomScrollBehaviorExample(): ReactElement {
  const { getTabProps, getTabListProps } = useTabs({ disableTransition });

  return (
    <>
      <TabList
        {...getTabListProps()}
        scrollButtons
        getScrollToOptions={(options) => {
          // the default implementation
          // return getTabListScrollToOptions(options);

          // or define custom behavior
          // Disclaimer: this is the default implementation
          const { isRTL, animate, vertical, increment, container } = options;
          const { scrollLeft, scrollTop, scrollWidth, scrollHeight } =
            container;
          const currentScroll = vertical ? scrollTop : scrollLeft;
          const scrollDistance = vertical ? scrollHeight : scrollWidth;
          const amount = (scrollDistance / 10) * (increment ? 1 : -1);
          const distance =
            currentScroll + amount * (vertical || !isRTL ? 1 : -1);

          return {
            left: vertical ? undefined : distance,
            top: vertical ? distance : undefined,
            behavior: animate ? "smooth" : "instant",
          };
        }}
      >
        {tabs.map((name, i) => (
          <Tab key={name} {...getTabProps(i)}>
            {name}
          </Tab>
        ))}
      </TabList>
    </>
  );
}

const tabs = Array.from({ length: 20 }, (_, i) => `Tab ${i + 1}`);
const disableTransition = true;
