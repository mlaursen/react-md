"use client";
import { Sheet, useAppSize } from "react-md";
import { cnb } from "cnbuilder";
import { type ReactElement } from "react";
import styles from "./HowToUseSheet.module.scss";
import { HowToUseSheetContent } from "./HowToUseSheetContent.jsx";
import { HowToUseSheetHeader } from "./HowToUseSheetHeader.jsx";
import { useMaterialIconsAndSymbols } from "./MaterialIconsAndSymbolsProvider.jsx";

export interface HowToUseSheetProps {
  className: string;
}

export function HowToUseSheet(props: HowToUseSheetProps): ReactElement {
  const { className } = props;
  const { isDesktop } = useAppSize();
  const { selectedIconName, deselectIcon } = useMaterialIconsAndSymbols();
  return (
    <Sheet
      aria-label="How to use icon"
      className={cnb(className, styles.sheet)}
      visible={!!selectedIconName}
      onRequestClose={deselectIcon}
      position="right"
      temporary
      disablePortal
      disableOverlay={isDesktop}
      disableScrollLock={isDesktop}
    >
      <HowToUseSheetHeader />
      <HowToUseSheetContent />
    </Sheet>
  );
}
