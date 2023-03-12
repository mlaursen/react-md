import {
  box,
  Box,
  MaterialIcon,
  MaterialSymbol,
  Typography,
  useColorScheme,
} from "@react-md/core";
import { cnb } from "cnbuilder";
import { chunk } from "lodash";
import type { ReactElement, ReactNode } from "react";
import { useDeferredValue, useMemo } from "react";
import { VariableSizeList } from "react-window";

import styles from "./FullScreenVirtualizedList.module.scss";
import { IgnoreInvalidHeightStyle } from "./IgnoreInvalidHeightStyle";
import type { MaterialIconAndSymbolName } from "./metadata";
import { useMaterialStateContext } from "./useMaterialState";
import { useVirtualizedColumns } from "./useVirtualizedColumns";
import { useVirtualizedWindow } from "./useVirtualizedWindow";
import { getCategoryName, getIconsByCategory, isMaterialSymbol } from "./utils";
import { VirtualizedMatch } from "./VirtualizedMatch";

export function FullScreenVirtualizedList(): ReactElement {
  const { iconType, iconFamily, iconCategory, search } =
    useMaterialStateContext();
  const searchTerm = useDeferredValue(search.toLowerCase());

  const { colorSchemeMode } = useColorScheme();
  const { columns, containerRef, containerStyle, containerWidth } =
    useVirtualizedColumns();
  const iconsByCategory = getIconsByCategory({
    iconType,
    iconFamily,
    iconCategory,
  });
  const listProps = useVirtualizedWindow({
    columns,
    iconType,
    iconFamily,
    iconCategory,
    searchTerm,
  });

  // I'm using the VariableSizeList instead of VariableSizeGrid because I want
  // to leverage the `Box` component and the auto-sizing grid for each row. So
  // the way the list is setup is:
  // - each item in the list is a virtualized row where:
  //   - if it is a string, it is a specific icon category
  //   - otherwise, it is a list of icons to render
  const list = useMemo(() => {
    const available: (string | readonly MaterialIconAndSymbolName[])[] = [];

    // TODO: Need to start by best match when the search term exists?
    const sorted = Object.entries(iconsByCategory);
    sorted.sort(([a], [b]) => a.localeCompare(b));

    sorted.forEach(([category, icons]) => {
      const filtered = searchTerm
        ? icons.filter((name) => name.includes(searchTerm))
        : icons;

      if (filtered.length) {
        available.push(category);
        available.push(...chunk(filtered, columns));
      }
    });

    return available;
  }, [columns, iconsByCategory, searchTerm]);

  return (
    <div
      ref={containerRef}
      style={containerStyle}
      className={cnb(
        styles.container,
        colorSchemeMode === "dark" && styles.dark,
        colorSchemeMode === "system" && styles.system
      )}
    >
      <VariableSizeList
        {...listProps}
        width={containerWidth}
        itemSize={(index) => {
          if (typeof list[index] === "string") {
            return index === 0 ? 40 : 80;
          }

          return 160;
        }}
        itemCount={list.length}
        innerElementType={IgnoreInvalidHeightStyle}
      >
        {({ index, style }) => {
          const match = list[index];
          if (typeof match === "string") {
            return (
              <Typography
                style={style}
                type="subtitle-2"
                margin="none"
                textColor="secondary"
                className={box({ className: styles.category, align: "end" })}
              >
                {getCategoryName(match)}
              </Typography>
            );
          }

          return (
            <Box style={style} align="stretch" grid gridColumns={columns}>
              {match.map((iconName) => {
                let icon: ReactNode;
                if (isMaterialSymbol(iconName, iconType)) {
                  icon = <MaterialSymbol name={iconName} />;
                } else {
                  icon = <MaterialIcon name={iconName} />;
                }

                return (
                  <VirtualizedMatch
                    key={iconName}
                    name={iconName}
                    icon={icon}
                  />
                );
              })}
            </Box>
          );
        }}
      </VariableSizeList>
    </div>
  );
}
