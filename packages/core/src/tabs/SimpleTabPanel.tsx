import { cnb } from "cnbuilder";
import { type HTMLAttributes, type ReactNode, forwardRef } from "react";

import { DISPLAY_NONE_CLASS } from "../utils/isElementVisible.js";
import { type ProvidedTabPanelProps } from "./useTabs.js";

/**
 * @since 6.0.0
 */
export interface SimpleTabPanelProps
  extends Omit<HTMLAttributes<HTMLDivElement>, keyof ProvidedTabPanelProps>,
    ProvidedTabPanelProps {
  children: ReactNode;
}

/**
 * This component can be a replacement for the `Slide` component when animations
 * are not required for changing the active tab contents.
 *
 * This should generally be used along with the `SimpleTabPanels` component.
 *
 * @since 6.0.0
 */
export const SimpleTabPanel = forwardRef<HTMLDivElement, SimpleTabPanelProps>(
  function SimpleTabPanel(props, ref) {
    const { active, className, ...remaining } = props;
    return (
      <div
        ref={ref}
        {...remaining}
        className={cnb(!active && DISPLAY_NONE_CLASS, className)}
      />
    );
  }
);
