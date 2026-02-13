"use client";

import { useHorizontalLayoutTransition } from "@react-md/core/layout/useHorizontalLayoutTransition";
import { useAppSize } from "@react-md/core/media-queries/AppSizeProvider";
import { DEFAULT_SHEET_TIMEOUT } from "@react-md/core/sheet/styles";
import { useColorScheme } from "@react-md/core/theme/useColorScheme";
import { useHtmlClassName } from "@react-md/core/useHtmlClassName";
import { cnb } from "cnbuilder";
import { type ReactElement, useState } from "react";
import { List } from "react-window";

import styles from "./FullScreenVirtualizedList.module.scss";
import { useMaterialIconsAndSymbols } from "./MaterialIconsAndSymbolsProvider.js";
import { NoMatches } from "./NoMatches.js";
import { RenderVirtualizedRow } from "./RenderVirtualizedRow.js";
import { ReturnToTop } from "./ReturnToTop.js";
import { useVirtualizedColumns } from "./useVirtualizedColumns.js";
import { useVirtualizedWindow } from "./useVirtualizedWindow.js";

export function FullScreenVirtualizedList(): ReactElement {
  const { isDesktop } = useAppSize();
  const {
    iconType,
    iconFamily,
    iconCategory,
    search,
    filtersVisible,
    selectedIconName,
  } = useMaterialIconsAndSymbols();
  const { colorScheme } = useColorScheme();
  const { columns, containerRef, containerStyle } = useVirtualizedColumns();
  const { list, listProps, scrollToTop } = useVirtualizedWindow({
    search,
    columns,
    iconType,
    iconFamily,
    iconCategory,
    selectedIconName,
  });
  const isEmpty = list.length === 0;

  // apply to html so that the icons in the HowToUseSheet are also updated
  useHtmlClassName(
    cnb(
      colorScheme === "dark" && styles.dark,
      colorScheme === "system" && styles.system
    )
  );
  const { elementProps: filterPanelTransitionProps } =
    useHorizontalLayoutTransition({
      nodeRef: containerRef,
      className: cnb(styles.container, isEmpty && styles.empty),
      transitionIn: filtersVisible,
    });

  const [scrollToTopVisible, setScrollToTopVisible] = useState(false);
  const { elementProps: howToUseTransitionProps } =
    useHorizontalLayoutTransition({
      className: styles.grid,
      classNames: {
        enter: styles.gridEnter,
        enterActive: styles.gridOffset,
        enterDone: styles.gridOffset,
        exit: styles.gridExit,
      },
      timeout: isDesktop ? DEFAULT_SHEET_TIMEOUT : 0,
      transitionIn: !!selectedIconName,
    });

  return (
    <div {...howToUseTransitionProps} id="virtualized-grid-container">
      <div {...filterPanelTransitionProps} style={containerStyle}>
        {isEmpty && <NoMatches />}
        <ReturnToTop visible={scrollToTopVisible} scrollToTop={scrollToTop} />
        <List
          {...listProps}
          rowComponent={RenderVirtualizedRow}
          onRowsRendered={(visibleRows) => {
            setScrollToTopVisible(visibleRows.startIndex > 0);
          }}
        />
      </div>
    </div>
  );
}
