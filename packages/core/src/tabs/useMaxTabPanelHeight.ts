import { type CSSProperties, type Ref, useCallback, useState } from "react";

import { type UseStateInitializer } from "../types.js";
import { useResizeObserver } from "../useResizeObserver.js";
import { DISPLAY_NONE_CLASS } from "../utils/isElementVisible.js";
import {
  type ProvidedTabPanelsProps,
  type TabsImplementation,
} from "./useTabs.js";
import { getTabPanelRoleOnly } from "./utils.js";

/**
 * @since 6.0.0
 */
export interface MaxTabPanelHeightOptions<E extends HTMLElement> extends Pick<
  TabsImplementation,
  "getTabPanelsProps"
> {
  ref?: Ref<E>;
  style?: CSSProperties;

  /**
   * @defaultValue `undefined`
   */
  defaultHeight?: UseStateInitializer<string | number>;
}

/**
 * @since 6.0.0
 */
export interface ProvidedMaxTabPanelsHeightProps<
  E extends HTMLElement,
> extends ProvidedTabPanelsProps<E> {
  style: CSSProperties;
}

/**
 * @since 6.0.0
 */
export interface MaxTabPanelHeightImplementation<E extends HTMLElement> {
  getMaxTabPanelHeightProps: (
    style?: CSSProperties
  ) => ProvidedMaxTabPanelsHeightProps<E>;
}

/**
 * The `useMaxTabPanelHeight` hook can be used to enforce the tab panels to
 * have the same height so content does not shift below the tab panels by
 * calculating the height of all tabs and setting the height to the largest
 * value.
 *
 * If a maximum height should be used, set it through CSS and scrollbars will
 * appear in each tab panel.
 *
 * @example Main Usage
 * ```tsx
 * import { Tab } from "@react-md/core/tabs/Tab";
 * import { TabList } from "@react-md/core/tabs/TabList";
 * import { useMaxTabPanelHeight } from "@react-md/core/tabs/useMaxTabPanelHeight";
 * import { useTabs } from "@react-md/core/tabs/useTabs";
 * import { Slide } from "@react-md/core/transition/Slide";
 * import { SlideContainer } from "@react-md/core/transition/SlideContainer";
 * import { Typography } from "@react-md/core/typography/Typography";
 * import { type ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   const { getTabProps, getTabListProps, getTabPanelProps, getTabPanelsProps } =
 *     useTabs();
 *   const { getMaxTabPanelHeightProps } = useMaxTabPanelHeight({
 *     getTabPanelsProps,
 *   });
 *
 *   return (
 *     <>
 *       <TabList {...getTabListProps()}>
 *         <Tab {...getTabProps(0)}>Tab 1</Tab>
 *         <Tab {...getTabProps(1)}>Tab 2</Tab>
 *         <Tab {...getTabProps(2)}>Tab 3</Tab>
 *       </TabList>
 *       <SlideContainer {...getMaxTabPanelHeightProps()}>
 *         <Slide {...getTabPanelProps(0)}>
 *           <Tab1Content />
 *         </Slide>
 *         <Slide {...getTabPanelProps(1)}>
 *           <Tab2Content />
 *         </Slide>
 *         <Slide {...getTabPanelProps(2)}>
 *           <Tab3Content />
 *         </Slide>
 *       </SlideContainer>
 *     </>
 *   );
 * }
 * ```
 *
 * NOTE: This will **not work** when dynamically rendering the active tab panel
 * by enabling the `temporary` prop on the `Slide` or custom behavior.
 *
 * @since 6.0.0
 */
export function useMaxTabPanelHeight<E extends HTMLElement = HTMLDivElement>(
  options: MaxTabPanelHeightOptions<E>
): MaxTabPanelHeightImplementation<E> {
  const { ref, style, defaultHeight, getTabPanelsProps } = options;

  const [height, setHeight] = useState(defaultHeight);
  const panelRef = useResizeObserver({
    ref,
    onUpdate: useCallback((entry) => {
      const element = entry.target as HTMLElement;
      const { height } = element.style;
      element.style.height = "";
      const panels = getTabPanelRoleOnly(element);

      let maxHeight = 0;
      for (const panel of panels) {
        let { scrollHeight } = panel;
        if (panel.classList.contains(DISPLAY_NONE_CLASS)) {
          panel.classList.toggle(DISPLAY_NONE_CLASS);
          ({ scrollHeight } = panel);
          panel.classList.toggle(DISPLAY_NONE_CLASS);
        }

        maxHeight = Math.max(maxHeight, scrollHeight);
      }

      element.style.height = height;

      // don't set the height to 0 since it usually means a calculation issue
      setHeight((prevHeight) => (maxHeight <= 0 ? prevHeight : maxHeight));
    }, []),
  });

  return {
    getMaxTabPanelHeightProps: (moreStyle) => ({
      ...getTabPanelsProps(panelRef),
      style: {
        height,
        ...style,
        ...moreStyle,
      },
    }),
  };
}
