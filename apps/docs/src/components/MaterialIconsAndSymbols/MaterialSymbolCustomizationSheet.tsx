import { Sheet, useAppSize } from "@react-md/core";
import type { ReactElement } from "react";

import { useMaterialIconsAndSymbols } from "./MaterialIconsAndSymbolsProvider";
import { MaterialSymbolCustomization } from "./MaterialSymbolCustomization";
import styles from "./MaterialSymbolCustomizationSheet.module.scss";

const noop = (): void => {
  // do nothing
};
const alwaysTrue = (): boolean => true;

export function MaterialSymbolCustomizationSheet(): ReactElement {
  const { iconType } = useMaterialIconsAndSymbols();
  const { isPhone } = useAppSize();

  return (
    <Sheet
      aria-labelledby="symbol-customization"
      onRequestClose={noop}
      position="right"
      visible={iconType === "symbol" && !isPhone}
      className={styles.sheet}
      horizontalSize="static"
      disablePortal
      disableOverlay
      disableScrollLock
      disableTransition
      isFocusTypeDisabled={alwaysTrue}
    >
      <MaterialSymbolCustomization />
    </Sheet>
  );
}
