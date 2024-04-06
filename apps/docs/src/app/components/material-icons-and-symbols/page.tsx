import { ReturnToTop } from "@/components/ReturnToTop.jsx";
import { NoSsr } from "react-md";
import { type ReactElement } from "react";
import { FiltersSheet } from "./FiltersSheet.jsx";
import { FullScreenVirtualizedList } from "./FullScreenVirtualizedList.jsx";
import { HowToUseSheet } from "./HowToUseSheet.jsx";
import { MaterialIconsAndSymbolsProvider } from "./MaterialIconsAndSymbolsProvider.jsx";
import { SearchAndFilters } from "./SearchAndFilters.jsx";
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
