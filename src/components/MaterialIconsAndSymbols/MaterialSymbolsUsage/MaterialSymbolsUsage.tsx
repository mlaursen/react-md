import { Slide, SlideContainer, Tab, TabList, useTabs } from "@react-md/core";
import type { ReactElement } from "react";

import { FormattedCodeBlock } from "src/components/Code/FormattedCodeBlock";
import { useMaterialIconsAndSymbols } from "../MaterialIconsAndSymbolsProvider";
import { AdditionalChanges } from "./AdditionalChanges";
import { IncludingStylesheet } from "./IncludingStylesheet";
import styles from "./MaterialSymbolsUsage.module.scss";
import { getSymbolCode } from "./utils";

export function MaterialSymbolsUsage(): ReactElement {
  const { getTabProps, getTabListProps, getTabPanelProps, getTabPanelsProps } =
    useTabs();
  const {
    selectedIconName,
    isFontFamilyChanged,
    isSymbolCustomizationChanged,
  } = useMaterialIconsAndSymbols();

  return (
    <>
      <TabList {...getTabListProps()}>
        <Tab {...getTabProps(0)}>Usage</Tab>
        <Tab {...getTabProps(1)}>Including Stylesheet</Tab>
      </TabList>
      <SlideContainer {...getTabPanelsProps()} className={styles.container}>
        <Slide {...getTabPanelProps(0)}>
          <FormattedCodeBlock language="tsx" lineWrap>
            {'import { MaterialSymbol } from "@react-md/core"'}
          </FormattedCodeBlock>
          <FormattedCodeBlock language="tsx" stripTrailingSemi lineWrap>
            {getSymbolCode(selectedIconName)}
          </FormattedCodeBlock>
          {(isSymbolCustomizationChanged || isFontFamilyChanged) && (
            <AdditionalChanges />
          )}
        </Slide>
        <Slide {...getTabPanelProps(1)}>
          <IncludingStylesheet />
        </Slide>
      </SlideContainer>
    </>
  );
}
