import { useCallback, useEffect, useState } from "react";
import { AppSize, useAppSize } from "@react-md/utils";

import {
  LayoutConfiguration,
  LayoutNavigationVisibility,
  SupportedWideLayout,
} from "./types";

export const DEFAULT_PHONE_LAYOUT = "temporary";
export const DEFAULT_TABLET_LAYOUT = "toggleable";
export const DEFAULT_LANDSCAPE_TABLET_LAYOUT = "toggleable";
export const DEFAULT_DESKTOP_LAYOUT = "full-height";

interface Options extends LayoutConfiguration {
  appSize: AppSize;
}

/**
 * Gets the current layout based on the app size and layout configuration.
 *
 * @private
 * @return The current layout type
 */
export function getLayout({
  appSize,
  phoneLayout = DEFAULT_PHONE_LAYOUT,
  tabletLayout = DEFAULT_TABLET_LAYOUT,
  landscapeTabletLayout = DEFAULT_LANDSCAPE_TABLET_LAYOUT,
  desktopLayout = DEFAULT_DESKTOP_LAYOUT,
  largeDesktopLayout = desktopLayout,
}: Options): SupportedWideLayout {
  const { isPhone, isTablet, isLargeDesktop, isLandscape } = appSize;
  if (isPhone) {
    return phoneLayout;
  }

  if (isTablet) {
    return isLandscape ? landscapeTabletLayout : tabletLayout;
  }

  if (isLargeDesktop) {
    return largeDesktopLayout;
  }

  return desktopLayout;
}

/**
 * Checks if the current `layout` is one of the temporary types
 *
 * @param layout The layout to check against
 * @return true if the current layout has a temporary navigation.
 */
export function isTemporaryLayout(layout: SupportedWideLayout): boolean {
  return layout === "temporary" || layout === "temporary-mini";
}

/**
 * Checks if the current `layout` is one of the toggleable types
 *
 * @param layout The layout to check against
 * @return true if the current layout is toggleable.
 */
export function isToggleableLayout(layout: SupportedWideLayout): boolean {
  return layout === "toggleable" || layout === "toggleable-mini";
}

/**
 * Checks if the current `layout` is `"clipped"`, `"floating"`, or `"full-height"`.
 *
 * @param layout The layout to check against
 * @return true if the current layout is persistent.
 */
export function isPersistentLayout(layout: SupportedWideLayout): boolean {
  return (
    layout === "clipped" || layout === "floating" || layout === "full-height"
  );
}

/**
 * Checks if the current `layout` can be rendered inline with the rest of the content.
 *
 * @param layout The layout to check against
 * @return true if the current layout has the main navigation rendered inline
 * with the rest of the content.
 */
export function isInlineLayout(layout: SupportedWideLayout): boolean {
  return isToggleableLayout(layout) || isPersistentLayout(layout);
}

/**
 * Checks if the current `layout` is the `"full-height"` variant.
 *
 * @param layout The layout to check against
 * @return true if the current layout is the full height variant.
 */
export function isFullHeightLayout(layout: SupportedWideLayout): boolean {
  return layout === "full-height";
}

/**
 *
 * @private
 */
export default function useLayout({
  phoneLayout,
  tabletLayout,
  landscapeTabletLayout,
  desktopLayout,
  largeDesktopLayout,
}: LayoutConfiguration): LayoutNavigationVisibility {
  const appSize = useAppSize();
  const layout = getLayout({
    appSize,
    phoneLayout,
    tabletLayout,
    landscapeTabletLayout,
    desktopLayout,
    largeDesktopLayout,
  });

  const { isDesktop } = appSize;
  const isFullHeight = layout === "full-height";
  const isPersistent = isPersistentLayout(layout);

  const [visible, setVisible] = useState(isPersistent && isDesktop);

  useEffect(() => {
    if (visible !== isPersistent) {
      setVisible(isPersistent);
    }

    // only want this to be fired when the layout changes to ensure that
    // the visiiblity is updated
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPersistent]);

  const showNav = useCallback(() => {
    setVisible(true);
  }, []);

  const hideNav = useCallback(() => {
    setVisible(false);
  }, []);

  return {
    showNav,
    hideNav,
    layout,
    isNavVisible: visible,
    isFullHeight,
    isPersistent,
  };
}
