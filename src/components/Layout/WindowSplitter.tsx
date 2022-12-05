import {
  parseCssLengthUnit,
  useCSSVariables,
  useHtmlClassName,
  useWindowSplitter,
} from "@react-md/core";
import {
  isFullHeightLayout,
  isToggleableLayout,
  useLayoutConfig,
} from "@react-md/layout";
import { cnb } from "cnbuilder";
import type { ReactElement } from "react";
import { useMemo } from "react";

import styles from "./WindowSplitter.module.scss";

export function WindowSplitter(): ReactElement {
  const { layout, hideNav } = useLayoutConfig();
  const toggleable = isToggleableLayout(layout);
  const fullHeight = isFullHeightLayout(layout) || toggleable;

  // TODO: The `value` should be the total distance dragged instead of the
  // current percentage. This should also update the `min` and `max` to be
  // min/max draggable distance in px
  const { value, dragging, splitterProps } = useWindowSplitter({
    min: 4,
    max: 60,
    defaultValue: () =>
      (parseCssLengthUnit({ value: "16rem" }) / window.innerWidth) * 100,
    onKeyDown(event) {
      if (event.key === "Enter" && toggleable) {
        event.stopPropagation();
        hideNav();
      }
    },
    localStorageKey: "navWidth",
  });

  useCSSVariables(
    useMemo(
      () => [
        {
          name: "--rmd-layout-nav-width",
          value: `${Math.round(window.innerWidth * (value / 100))}px`,
        },
      ],
      [value]
    )
  );
  useHtmlClassName(cnb(dragging && styles.dragging));

  return (
    <button
      {...splitterProps}
      aria-label="Resize Navigation"
      aria-controls="layout-nav-container"
      type="button"
      className={cnb(styles.separator, fullHeight && styles.fullHeight)}
    />
  );
}
