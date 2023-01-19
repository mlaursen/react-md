import {
  isFullHeightLayout,
  isPersistentLayout,
  isTemporaryLayout,
  isToggleableLayout,
  useCSSVariables,
  useLayoutConfig,
  useWindowSplitter,
  WindowSplitter,
} from "@react-md/core";
import { cnb } from "cnbuilder";
import type { ReactElement } from "react";
import { useMemo } from "react";

import styles from "./NavWindowSplitter.module.scss";

export function NavWindowSplitter(): ReactElement | null {
  const { layout, hideNav, visible } = useLayoutConfig();
  const toggleable = isToggleableLayout(layout);
  const fullHeight = isFullHeightLayout(layout) || toggleable;
  const { value, dragging, splitterProps } = useWindowSplitter({
    min: 96,
    max: 600,
    defaultValue: 256,
    onKeyDown(event) {
      if (event.key === "Enter" && toggleable) {
        event.stopPropagation();
        hideNav();
      }
    },
    localStorageKey: "navWidth",
  });
  useCSSVariables(
    useMemo(() => {
      if (isTemporaryLayout(layout)) {
        return [];
      }

      return [
        {
          name: "--rmd-layout-nav-width",
          value: `${value}px`,
        },
      ];
    }, [layout, value])
  );

  if (
    !isPersistentLayout(layout) &&
    (!visible || !isToggleableLayout(layout))
  ) {
    return null;
  }

  return (
    <WindowSplitter
      aria-label="Resize Navigation"
      aria-controls="layout-nav-container"
      {...splitterProps}
      dragging={dragging}
      className={cnb(styles.splitter, !fullHeight && styles.offset)}
    />
  );
}
