import React, { FC, useState } from "react";
import { AppBar } from "@react-md/app-bar";
import { TabsManager, Tabs, TabPanel } from "@react-md/tabs";
import { useCrossFade, ENTER } from "@react-md/transition";

import Container from "./Container";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";

const tabs = ["Page 1", "Page 2", "Page 3"];

const CrossFadeHookExample: FC = () => {
  const [page, setPage] = useState(0);
  const [, transitionProps, dispatch] = useCrossFade({ appear: false });
  const onActiveIndexChange = (page: number): void => {
    dispatch(ENTER);
    setPage(page);
  };

  return (
    <TabsManager
      tabs={tabs}
      tabsId="cross-fade-hook"
      activeIndex={page}
      onActiveIndexChange={onActiveIndexChange}
    >
      <AppBar theme="default">
        <Tabs />
      </AppBar>
      <Container {...transitionProps}>
        {page === 0 && (
          <TabPanel>
            <Page1 />
          </TabPanel>
        )}
        {page === 1 && (
          <TabPanel>
            <Page2 />
          </TabPanel>
        )}
        {page === 2 && (
          <TabPanel>
            <Page3 />
          </TabPanel>
        )}
      </Container>
    </TabsManager>
  );
};

export default CrossFadeHookExample;
