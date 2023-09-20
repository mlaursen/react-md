import { cnb } from "cnbuilder";
import { bem } from "../utils/bem.js";
import { tabIndicator } from "./tabIndicatorStyles.js";

const styles = bem("rmd-tablist");

/**
 * The supported types of alignments for the tabs.
 */
export type TabsAlignment = "left" | "center" | "right";

/**
 * @remarks \@since 6.0.0
 */
export interface TabListClassNameOptions {
  className?: string;
  align?: TabsAlignment;
  animate?: boolean;
  inline?: boolean;
  padded?: boolean;
  vertical?: boolean;
  scrollbar?: boolean;
  indicator?: boolean;
}

/**
 * @remarks \@since 6.0.0
 */
export function tabList(options: TabListClassNameOptions = {}): string {
  const {
    className,
    align = "left",
    padded,
    inline,
    vertical,
    scrollbar,
    animate = false,
    indicator = false,
  } = options;

  return cnb(
    styles({
      [align]: true,
      padded,
      vertical,
      "full-width": !inline,
      "no-scrollbar": !scrollbar,
    }),
    indicator && tabIndicator({ tablist: true, animate }),
    className
  );
}
