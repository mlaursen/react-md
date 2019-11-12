import React, { FC } from "react";
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
import {
  TabConfig,
  TabPanel,
  TabPanels,
  Tabs,
  TabsManager,
} from "@react-md/tabs";
import { GridList, useAppSize } from "@react-md/utils";

const tabs: TabConfig[] = [
  { icon: <TimerSVGIcon />, children: "Recent" },
  { icon: <FavoriteSVGIcon />, children: "Favorites" },
];

const Header: FC = () => {
  const { isTablet } = useAppSize();

  return (
    <AppBar theme="default" prominent derived>
      <AppBar>
        <AppBarNav aria-label="Menu">
          <MenuSVGIcon />
        </AppBarNav>
        <AppBarTitle>My pictures</AppBarTitle>
        <AppBarAction first last aria-label="Options">
          <MoreVertSVGIcon />
        </AppBarAction>
      </AppBar>
      <Tabs align={isTablet ? "center" : "left"} />
    </AppBar>
  );
};

const Panels: FC = () => (
  <TabPanels>
    <TabPanel>
      <GridList maxCellSize={200} clone>
        {Array.from(new Array(10), (_, i) => (
          <MediaContainer key={i}>
            <img src={`https://picsum.photos/200?image=${i + 1}`} alt="" />
          </MediaContainer>
        ))}
      </GridList>
    </TabPanel>
    <TabPanel>
      <GridList maxCellSize={200} clone>
        {Array.from(new Array(22), (_, i) => (
          <MediaContainer key={i}>
            <img src={`https://picsum.photos/200?image=${i + 51}`} alt="" />
          </MediaContainer>
        ))}
      </GridList>
    </TabPanel>
  </TabPanels>
);

const SimpleTwoPageTab: FC = () => (
  <TabsManager stacked tabs={tabs} tabsId="simple-two-page-tabs">
    <Header />
    <Panels />
  </TabsManager>
);

export default SimpleTwoPageTab;
