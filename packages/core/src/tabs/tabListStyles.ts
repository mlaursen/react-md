import { cnb } from "cnbuilder";

import { bem } from "../utils/bem.js";
import { tabIndicator } from "./tabIndicatorStyles.js";

const styles = bem("rmd-tablist");

/**
 * The supported types of alignments for the tabs.
 */
export type TabsAlignment = "left" | "center" | "right";

/**
 * @since 6.0.0
 */
export interface TabListClassNameOptions {
  className?: string;

  /** @defaultValue `"left"` */
  align?: TabsAlignment;

  /** @defaultValue `false` */
  animate?: boolean;

  /** @defaultValue `false` */
  inline?: boolean;

  /** @defaultValue `false` */
  padded?: boolean;

  /** @defaultValue `false` */
  vertical?: boolean;

  /** @defaultValue `false` */
  scrollbar?: boolean;

  /** @defaultValue `false` */
  indicator?: boolean;

  /** @defaultValue `false` */
  fullWidthTabs?: boolean;
}

/**
 * @since 6.0.0
 */
export function tabList(options: TabListClassNameOptions = {}): string {
  const {
    className,
    align = "left",
    padded,
    inline,
    vertical,
    scrollbar,
    animate,
    indicator,
    fullWidthTabs,
  } = options;

  return cnb(
    styles({
      [align]: true,
      padded,
      vertical,
      "full-width": !inline,
      "full-width-tabs": fullWidthTabs,
      "no-scrollbar": !scrollbar,
    }),
    indicator && tabIndicator({ tablist: true, animate, vertical }),
    className
  );
}
