import {
  DialogContent,
  Slide,
  SlideContainer,
  Tab,
  TabList,
  dialogContent,
  useTabs,
} from "@react-md/core";
import { type ReactElement } from "react";
import { FontIconImportAndUsage } from "./FontIconImportAndUsage.jsx";
import { useMaterialIconsAndSymbols } from "./MaterialIconsAndSymbolsProvider.jsx";
import { MaterialSymbolStylesheets } from "./MaterialSymbolStylesheets.jsx";
import { MaterialSymbolUsage } from "./MaterialSymbolUsage.jsx";
import { SVGIconImportAndUsage } from "./SVGIconImportAndUsage.jsx";
import { isMaterialIconType } from "./searchParams.js";

export function HowToUseSheetContent(): ReactElement | null {
  const { selectedIconName, iconType } = useMaterialIconsAndSymbols();
  const { getTabListProps, getTabProps, getTabPanelProps, getTabPanelsProps } =
    useTabs();

  if (!selectedIconName) {
    return null;
  }

  if (isMaterialIconType(iconType)) {
    const isSvg = iconType === "icon";
    return (
      <DialogContent>
        {isSvg ? <SVGIconImportAndUsage /> : <FontIconImportAndUsage />}
      </DialogContent>
    );
  }

  return (
    <>
      <TabList {...getTabListProps()}>
        <Tab {...getTabProps(0)}>Usage</Tab>
        <Tab {...getTabProps(1)}>Stylesheet</Tab>
      </TabList>
      <SlideContainer {...getTabPanelsProps()} className={dialogContent()}>
        <Slide {...getTabPanelProps(0)} timeout={0}>
          <MaterialSymbolUsage />
        </Slide>
        <Slide {...getTabPanelProps(1)} timeout={0}>
          <MaterialSymbolStylesheets />
        </Slide>
      </SlideContainer>
    </>
  );
}
