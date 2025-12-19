import {
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";

import { type ProvidedTabPanelsProps } from "./useTabs.js";

/**
 * @since 6.0.0
 */
export interface SimpleTabPanelsProps
  extends
    HTMLAttributes<HTMLDivElement>,
    Omit<ProvidedTabPanelsProps<HTMLDivElement>, "ref"> {
  ref?: Ref<HTMLDivElement>;
  children: ReactNode;
}

/**
 * This component can be used as a replacement for the `SlideContainer` when
 * animations are not required for changing the active tab contents.
 *
 * This should be normally be used along with the `SimpleTabPanel` component.
 *
 * @see {@link https://react-md.dev/components/tabs | Tabs Demos}
 * @see {@link https://react-md.dev/components/tabs#disable-tab-panel-transition|Disable Tab Panel Transition Demo}
 * @since 6.0.0
 */
export function SimpleTabPanels(props: SimpleTabPanelsProps): ReactElement {
  const { ref, direction: _direction, ...remaining } = props;

  return <div ref={ref} {...remaining} />;
}
