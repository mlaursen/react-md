import {
  Box,
  ResponsiveItemContainer,
  Slide,
  SlideContainer,
  Tab,
  TabList,
  useTabs,
} from "@react-md/core";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import TimerIcon from "@react-md/material-icons/TimerIcon";
import type { ReactElement } from "react";

import styles from "./TabsWithAnIcon.module.scss";

export function TabsWithAnIcon(): ReactElement {
  const { getTabProps, getTabListProps, getTabPanelProps, getTabPanelsProps } =
    useTabs();

  return (
    <div className={styles.container}>
      <TabList {...getTabListProps()}>
        <Tab {...getTabProps(0)} icon={<TimerIcon />} stacked>
          Recent
        </Tab>
        <Tab {...getTabProps(1)} icon={<FavoriteIcon />} stacked>
          Favorites
        </Tab>
      </TabList>
      <SlideContainer {...getTabPanelsProps()} className={styles.panels}>
        <Slide {...getTabPanelProps(0)}>
          <Box grid>
            {Array.from({ length: 9 }, (_, i) => (
              <ResponsiveItemContainer key={i}>
                <img src={`https://picsum.photos/200?image=${i + 1}`} alt="" />
              </ResponsiveItemContainer>
            ))}
          </Box>
        </Slide>
        <Slide {...getTabPanelProps(1)}>
          <Box grid>
            {Array.from({ length: 22 }, (_, i) => (
              <ResponsiveItemContainer key={i}>
                <img src={`https://picsum.photos/200?image=${i + 51}`} alt="" />
              </ResponsiveItemContainer>
            ))}
          </Box>
        </Slide>
      </SlideContainer>
    </div>
  );
}
