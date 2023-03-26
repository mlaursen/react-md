import {
  box,
  Box,
  DEFAULT_SHEET_TIMEOUT,
  MaterialIcon,
  MaterialSymbol,
  Typography,
  useColorScheme,
  useTransition,
} from "@react-md/core";
import { cnb } from "cnbuilder";
import type { ReactElement, ReactNode } from "react";
import { VariableSizeList } from "react-window";

import styles from "./FullScreenVirtualizedList.module.scss";
import { HowToUseSheet } from "./HowToUseSheet";
import { IgnoreInvalidHeightStyle } from "./IgnoreInvalidHeightStyle";
import { useMaterialIconsAndSymbols } from "./MaterialIconsAndSymbolsProvider";
import { MaterialSymbolCustomizationSheet } from "./MaterialSymbolCustomizationSheet";
import { useVirtualizedColumns } from "./useVirtualizedColumns";
import { useVirtualizedWindow } from "./useVirtualizedWindow";
import { getCategoryName, isMaterialSymbol } from "./utils";
import { VirtualizedMatch } from "./VirtualizedMatch";

export function FullScreenVirtualizedList(): ReactElement {
  const {
    iconType,
    iconFamily,
    iconCategory,
    search,
    fill,
    weight,
    grade,
    opticalSize,
    howToUseVisible,
  } = useMaterialIconsAndSymbols();

  const { colorSchemeMode } = useColorScheme();
  const { columns, containerRef, containerStyle, containerWidth } =
    useVirtualizedColumns();
  const { list, listProps } = useVirtualizedWindow({
    search,
    columns,
    iconType,
    iconFamily,
    iconCategory,
  });

  const { ref, stage } = useTransition({
    nodeRef: containerRef,
    timeout: DEFAULT_SHEET_TIMEOUT,
    transitionIn: howToUseVisible,
  });

  return (
    <div className={styles.grid}>
      <div
        ref={ref}
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
                  className={box({
                    className: styles.category,
                    align: "end",
                  })}
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
                    icon = (
                      <MaterialSymbol
                        name={iconName}
                        fill={fill}
                        weight={weight}
                        grade={grade}
                        opticalSize={opticalSize}
                      />
                    );
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
      <MaterialSymbolCustomizationSheet />
      <HowToUseSheet stage={stage} />
    </div>
  );
}
