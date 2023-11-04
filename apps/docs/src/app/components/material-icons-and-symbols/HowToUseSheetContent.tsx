import {
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

export function HowToUseSheetContent(): ReactElement | null {
  const { getTabListProps, getTabProps, getTabPanelProps, getTabPanelsProps } =
    useTabs();
  const { selectedIconName, iconType } = useMaterialIconsAndSymbols();

  if (!selectedIconName) {
    return null;
  }

  const isSymbol = iconType === "symbol";

  return (
    <>
      <TabList {...getTabListProps()}>
        <Tab {...getTabProps(0)}>{isSymbol ? "Usage" : "SVG Icon Usage"}</Tab>
        <Tab {...getTabProps(1)}>
          {isSymbol ? "Stylesheet" : "Font Icon Usage"}
        </Tab>
      </TabList>
      <SlideContainer {...getTabPanelsProps()} className={dialogContent()}>
        <Slide {...getTabPanelProps(0)} timeout={0}>
          {isSymbol && <MaterialSymbolUsage />}
          {!isSymbol && <SVGIconImportAndUsage />}
        </Slide>
        <Slide {...getTabPanelProps(1)} timeout={0}>
          {isSymbol && <MaterialSymbolStylesheets />}
          {!isSymbol && <FontIconImportAndUsage />}
        </Slide>
      </SlideContainer>
    </>
  );
}
