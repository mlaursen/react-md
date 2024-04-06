"use client";
import { Tab, TabList, useTabs } from "react-md";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import SocialDistanceOutlinedIcon from "@react-md/material-icons/SocialDistanceOutlinedIcon";
import { type ReactElement } from "react";

export default function WithIconsExample(): ReactElement {
  const { getTabListProps, getTabProps } = useTabs();
  return (
    <>
      <TabList {...getTabListProps()}>
        <Tab icon={<FavoriteIcon />} {...getTabProps(0)}>
          Tab 1
        </Tab>
        <Tab
          icon={<SocialDistanceOutlinedIcon />}
          iconAfter
          {...getTabProps(1)}
        >
          Tab 2
        </Tab>
      </TabList>
      <TabList {...getTabListProps()}>
        <Tab icon={<FavoriteIcon />} stacked {...getTabProps(0)}>
          Tab 1
        </Tab>
        <Tab
          icon={<SocialDistanceOutlinedIcon />}
          iconAfter
          stacked
          {...getTabProps(1)}
        >
          Tab 2
        </Tab>
      </TabList>
    </>
  );
}
