/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
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
  });

  useCSSVariables(
    useMemo(
      () => [
        {
          name: "--rmd-layout-nav-width",
          value: `${window.innerWidth * (value / 100)}px`,
        },
      ],
      [value]
    )
  );
  useHtmlClassName(cnb(dragging && styles.dragging));

  return (
    <span
      {...splitterProps}
      aria-label="Resize Navigation"
      aria-controls="layout-nav-container"
      className={cnb(styles.separator, fullHeight && styles.fullHeight)}
    />
  );
}
