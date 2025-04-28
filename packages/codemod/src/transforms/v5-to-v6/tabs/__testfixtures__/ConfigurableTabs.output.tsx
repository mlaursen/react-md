import cn from "classnames";
import { ReactElement, ReactNode } from "react";
import { Slide, SlideContainer, Tab, TabList, TabProps, useTabs } from "react-md";

import styles from "./ConfigurableTabs.module.scss";
import ConfigurationForm from "./ConfigurationForm";
import PanelContent from "./PanelContent";
import useConfiguration from "./useConfiguration";

export default function Demo(): ReactElement {
  const { tabs, ...configuration } = useConfiguration();
  const {
    themed,
    padded,
    automatic,

    stacked,
    iconAfter,

    persistent,
    customTransition,
    disableTransition,
  } = configuration;

  const {
    getTabProps,
    getTabListProps,
    getTabPanelProps,
    getTabPanelsProps
  } = useTabs({
    baseId: "configurable-tabs",
    stacked: stacked,
    iconAfter: iconAfter,
    disableTransition: disableTransition || customTransition
  });

  return (
    <>
      <ConfigurationForm {...configuration} />
      <div className={styles.container}>
        <>
          <TabList
            {...getTabListProps()}
            activationMode={automatic ? "automatic" : "manual"}
            padded={padded}
            className={cn(styles.tabs, {
              [styles.themed]: themed,
            })}>{tabs.map((tab, i) => {
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
            {tabs.map((_, i) => (
              <Slide {...getTabPanelProps(i)} key={i} className={styles.content}>
                <PanelContent i={i} customTransition={customTransition} />
              </Slide>
            ))}
          </SlideContainer>
        </>
      </div>
    </>
  );
}
