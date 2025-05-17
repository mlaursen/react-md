"use client";

import { useAppSize } from "@react-md/core/media-queries/AppSizeProvider";
import { Sheet } from "@react-md/core/sheet/Sheet";
import { NullSuspense } from "@react-md/core/suspense/NullSuspense";
import { cnb } from "cnbuilder";
import dynamic from "next/dynamic.js";
import { type ReactElement } from "react";

import { DesktopOnly } from "./DesktopOnly.jsx";
import styles from "./HowToUseSheet.module.scss";
import { HowToUseSheetContent } from "./HowToUseSheetContent.jsx";
import { HowToUseSheetHeader } from "./HowToUseSheetHeader.jsx";
import { useMaterialIconsAndSymbols } from "./MaterialIconsAndSymbolsProvider.jsx";

const ResizeHowToUseSheet = dynamic(
  () =>
    import("./ResizeHowToUseSheet.jsx").then((mod) => mod.ResizeHowToUseSheet),
  {
    ssr: false,
  }
);

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
      <NullSuspense>
        <DesktopOnly>
          <ResizeHowToUseSheet />
        </DesktopOnly>
      </NullSuspense>
      <HowToUseSheetHeader />
      <HowToUseSheetContent />
    </Sheet>
  );
}
