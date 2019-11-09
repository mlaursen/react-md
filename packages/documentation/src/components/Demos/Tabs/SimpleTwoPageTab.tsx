import React, { FC, Fragment, useState } from "react";
import {
  AppBar,
  AppBarAction,
  AppBarNav,
  AppBarTitle,
} from "@react-md/app-bar";
import {
  FavoriteSVGIcon,
  MenuSVGIcon,
  MoreVertSVGIcon,
  TimerSVGIcon,
} from "@react-md/material-icons";
import { MediaContainer } from "@react-md/media";
import { Tab, TabPanel, TabPanels, Tabs } from "@react-md/tabs";
import { useAppSize, GridList } from "@react-md/utils";

const SimpleTwoPageTab: FC = () => {
  const { isTablet } = useAppSize();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Fragment>
      <AppBar theme="default" prominent derived>
        <AppBar>
          <AppBarNav aria-label="Menu">
            <MenuSVGIcon />
          </AppBarNav>
          <AppBarTitle>My pets</AppBarTitle>
          <AppBarAction first last aria-label="Options">
            <MoreVertSVGIcon />
          </AppBarAction>
        </AppBar>
        <Tabs
          id="simple-two-page-tabs"
          activeIndex={activeIndex}
          onActiveIndexChange={setActiveIndex}
          align={isTablet ? "center" : "left"}
        >
          <Tab
            id="simple-two-page-tab-1"
            icon={<TimerSVGIcon />}
            active={activeIndex === 0}
            stacked
          >
            Recent
          </Tab>
          <Tab
            id="simple-two-page-tab-2"
            icon={<FavoriteSVGIcon />}
            active={activeIndex === 1}
            stacked
          >
            Recent
          </Tab>
        </Tabs>
      </AppBar>
      <TabPanels activeIndex={activeIndex}>
        <TabPanel
          id="simple-two-page-tab-1-panel"
          aria-labelledby="simple-two-page-1-panel"
        >
          <GridList maxCellSize={200} clone>
            {Array.from(new Array(10), (_, i) => (
              <MediaContainer key={i}>
                <img src={`https://picsum.photos/200?image=${i + 1}`} alt="" />
              </MediaContainer>
            ))}
          </GridList>
        </TabPanel>
        <TabPanel
          id="simple-two-page-tab-2-panel"
          aria-labelledby="simple-two-page-2-panel"
        >
          <GridList maxCellSize={200} clone>
            {Array.from(new Array(22), (_, i) => (
              <MediaContainer key={i}>
                <img src={`https://picsum.photos/200?image=${i + 51}`} alt="" />
              </MediaContainer>
            ))}
          </GridList>
        </TabPanel>
      </TabPanels>
    </Fragment>
  );
};

export default SimpleTwoPageTab;
