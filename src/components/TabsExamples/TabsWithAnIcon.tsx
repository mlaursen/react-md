import { Box, Slide, SlideContainer } from "@react-md/core";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import TimerIcon from "@react-md/material-icons/TimerIcon";
import { Tab, TabList, useTabs } from "@react-md/tabs";
import { VisualMediaContainer } from "@react-md/visual-media";
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
              <VisualMediaContainer key={i}>
                <img src={`https://picsum.photos/200?image=${i + 1}`} alt="" />
              </VisualMediaContainer>
            ))}
          </Box>
        </Slide>
        <Slide {...getTabPanelProps(1)}>
          <Box grid>
            {Array.from({ length: 22 }, (_, i) => (
              <VisualMediaContainer key={i}>
                <img src={`https://picsum.photos/200?image=${i + 51}`} alt="" />
              </VisualMediaContainer>
            ))}
          </Box>
        </Slide>
      </SlideContainer>
    </div>
  );
}
