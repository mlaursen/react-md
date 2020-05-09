import React, { ChangeEventHandler } from "react";
import { useChecked, useChoice } from "@react-md/form";
import {
  FavoriteSVGIcon,
  NearMeSVGIcon,
  WatchLaterSVGIcon,
  FreeBreakfastSVGIcon,
  PlaceSVGIcon,
  MailSVGIcon,
  AddCircleSVGIcon,
  StarSVGIcon,
  PersonSVGIcon,
} from "@react-md/material-icons";
import LightbulbSVGIcon from "icons/LightbulbSVGIcon";
import { TabConfig } from "@react-md/tabs";

const ICONS = [
  <WatchLaterSVGIcon />,
  <NearMeSVGIcon />,
  <FavoriteSVGIcon />,
  <FreeBreakfastSVGIcon />,
  <LightbulbSVGIcon />,
  <PlaceSVGIcon />,
  <MailSVGIcon />,
  <AddCircleSVGIcon />,
  <StarSVGIcon />,
  <PersonSVGIcon />,
];

const NUMBERS = [
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
];

type IconBehavior = "none" | "include" | "only";
type TransitionBehavior = "enabled" | "disabled" | "custom";
type Handler = ChangeEventHandler<HTMLInputElement>;

export interface TabConfiguration {
  tabs: TabConfig[];

  // Tabs config
  themed: boolean;
  handleThemedChange: Handler;
  padded: boolean;
  handlePaddedChange: Handler;
  automatic: boolean;
  handleAutomaticChange: Handler;

  // Tab config
  noIcon: boolean;
  onlyIcon: boolean;
  includeIcon: boolean;
  handleIconChange: Handler;
  stacked: boolean;
  handleStackedChange: Handler;
  iconAfter: boolean;
  handleIconAfterChange: Handler;

  // TabPanel config
  persistent: boolean;
  handlePersistentChange: Handler;
  disableTransition: boolean;
  customTransition: boolean;
  handleTransitionChange: Handler;
}

export default function useConfiguration(): TabConfiguration {
  // Tabs config
  const [themed, handleThemedChange] = useChecked(false);
  const [padded, handlePaddedChange] = useChecked(false);
  const [automatic, handleAutomaticChange] = useChecked(false);

  // Tab config
  const [icons, handleIconChange] = useChoice<IconBehavior>("none");
  const [stacked, handleStackedChange] = useChecked(false);
  const [iconAfter, handleIconAfterChange] = useChecked(false);

  // TabPanel config
  const [persistent, handlePersistentChange] = useChecked(false);
  const [transition, handleTransitionChange, setTransition] = useChoice<
    TransitionBehavior
  >("enabled");
  const disableTransition = transition === "disabled";
  const customTransition = transition === "custom";
  if (customTransition && persistent) {
    setTransition("enabled");
  }

  const noIcon = icons === "none";
  const onlyIcon = icons === "only";
  const includeIcon = icons === "include";
  const tabs = Array.from(new Array(10), (_, i) => {
    const label = `Tab ${NUMBERS[i]}`;
    const icon = ICONS[i];

    return {
      "aria-label": onlyIcon ? label : undefined,
      children: onlyIcon ? icon : label,
      icon: includeIcon && icon,
    };
  });

  return {
    tabs,

    // Tabs config
    themed,
    handleThemedChange,
    padded,
    handlePaddedChange,
    automatic,
    handleAutomaticChange,

    // Tab config
    noIcon,
    onlyIcon,
    includeIcon,
    handleIconChange,
    stacked,
    handleStackedChange,
    iconAfter,
    handleIconAfterChange,

    // TabPanel config
    persistent,
    handlePersistentChange,
    disableTransition,
    customTransition,
    handleTransitionChange,
  };
}
