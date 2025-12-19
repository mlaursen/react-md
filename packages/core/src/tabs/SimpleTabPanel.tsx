import { cnb } from "cnbuilder";
import {
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";

import { DISPLAY_NONE_CLASS } from "../utils/isElementVisible.js";
import { type ProvidedTabPanelProps } from "./useTabs.js";

/**
 * @since 6.0.0
 */
export interface SimpleTabPanelProps
  extends
    Omit<HTMLAttributes<HTMLDivElement>, keyof ProvidedTabPanelProps>,
    ProvidedTabPanelProps {
  ref?: Ref<HTMLDivElement>;
  children: ReactNode;
}

/**
 * This component can be a replacement for the `Slide` component when animations
 * are not required for changing the active tab contents.
 *
 * This should generally be used along with the `SimpleTabPanels` component.
 *
 * @see {@link https://react-md.dev/components/tabs | Tabs Demos}
 * @see {@link https://react-md.dev/components/tabs#disable-tab-panel-transition|Disable Tab Panel Transition Demo}
 * @since 6.0.0
 */
export function SimpleTabPanel(props: SimpleTabPanelProps): ReactElement {
  const { ref, active, className, ...remaining } = props;

  return (
    <div
      ref={ref}
      {...remaining}
      className={cnb(!active && DISPLAY_NONE_CLASS, className)}
    />
  );
}
