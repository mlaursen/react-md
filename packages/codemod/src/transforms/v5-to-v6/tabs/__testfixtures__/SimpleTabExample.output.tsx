import { ReactElement, ReactNode } from "react";
import { Slide, SlideContainer, Tab, TabList, TabProps, Typography, useTabs } from "react-md";

const tabs = ["Tab 1", "Tab 2", "Tab 3"];

export default function Demo(): ReactElement {
  const {
    getTabProps,
    getTabListProps,
    getTabPanelProps,
    getTabPanelsProps
  } = useTabs({
    baseId: "basic-usage-tabs"
  });

  return (
    <>
      <TabList {...getTabListProps()}>{tabs.map((tab, i) => {
          const tabProps = getTabProps(i);
          let children: ReactNode;
          let overrides: TabProps | undefined;

          if (typeof tab !== "string" && "children" in tab) {
            children = tab.children;

            const {
              children: _c,
              contentStyle: _cs,
              contentClassName: _ccn,
              ...stillValidProps
            } = tab;

            overrides = stillValidProps;
          } else {
            children = tab;
          }

          return <Tab {...tabProps} {...overrides} key={tabProps.id}>{children}</Tab>;
        })}</TabList>
      <SlideContainer {...getTabPanelsProps()}>
        <Slide {...getTabPanelProps(0)}>
          <Typography type="headline-4">Panel 1</Typography>
        </Slide>
        <Slide {...getTabPanelProps(1)}>
          <Typography type="headline-4">Panel 2</Typography>
        </Slide>
        <Slide {...getTabPanelProps(2)}>
          <Typography type="headline-4">Panel 3</Typography>
        </Slide>
      </SlideContainer>
    </>
  );
}
