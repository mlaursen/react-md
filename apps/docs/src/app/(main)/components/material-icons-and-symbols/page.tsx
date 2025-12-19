import { NoSsr } from "@react-md/core/NoSsr";
import { type ReactElement } from "react";

import { ReturnToTop } from "@/components/ReturnToTop.js";

import { FiltersSheet } from "./FiltersSheet.js";
import { FullScreenVirtualizedList } from "./FullScreenVirtualizedList.js";
import { HowToUseSheet } from "./HowToUseSheet.js";
import { MaterialIconsAndSymbolsProvider } from "./MaterialIconsAndSymbolsProvider.js";
import { SearchAndFilters } from "./SearchAndFilters.js";
import styles from "./page.module.scss";

export default function MaterialIconsAndSymbolsPage(): ReactElement {
  return (
    <>
      <MaterialIconsAndSymbolsProvider>
        <SearchAndFilters />
        <ReturnToTop />
        <NoSsr>
          <FullScreenVirtualizedList />
        </NoSsr>
        <FiltersSheet className={styles.sheet} />
        <HowToUseSheet className={styles.sheet} />
      </MaterialIconsAndSymbolsProvider>
    </>
  );
}
