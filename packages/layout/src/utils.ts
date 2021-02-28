import { AppSize } from "@react-md/utils";

import {
  DEFAULT_DESKTOP_LAYOUT,
  DEFAULT_LANDSCAPE_TABLET_LAYOUT,
  DEFAULT_PHONE_LAYOUT,
  DEFAULT_TABLET_LAYOUT,
} from "./constants";
import { LayoutConfiguration, SupportedWideLayout } from "./types";

export interface GetLayoutOptions extends LayoutConfiguration {
  /**
   * The current app size which is used to determine which layout type to
   * return.
   */
  appSize: AppSize;
}

/**
 * Gets the current layout based on the app size and layout configuration.
 *
 * @returns The current layout type
 */
export function getLayoutType({
  appSize,
  phoneLayout = DEFAULT_PHONE_LAYOUT,
  tabletLayout = DEFAULT_TABLET_LAYOUT,
  landscapeTabletLayout = DEFAULT_LANDSCAPE_TABLET_LAYOUT,
  desktopLayout = DEFAULT_DESKTOP_LAYOUT,
  largeDesktopLayout = desktopLayout,
}: GetLayoutOptions): SupportedWideLayout {
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
 * @param layout - The layout to check against
 * @returns true if the current layout has a temporary navigation.
 */
export function isTemporaryLayout(layout: SupportedWideLayout): boolean {
  return layout === "temporary" || layout === "temporary-mini";
}

/**
 * Checks if the current `layout` is one of the toggleable types
 *
 * @param layout - The layout to check against
 * @returns true if the current layout is toggleable.
 */
export function isToggleableLayout(layout: SupportedWideLayout): boolean {
  return layout === "toggleable" || layout === "toggleable-mini";
}

/**
 * Checks if the current `layout` is `"clipped"`, `"floating"`, or
 * `"full-height"`.
 *
 * @param layout - The layout to check against
 * @returns true if the current layout is persistent.
 */
export function isPersistentLayout(layout: SupportedWideLayout): boolean {
  return (
    layout === "clipped" || layout === "floating" || layout === "full-height"
  );
}

/**
 * Checks if the current `layout` is the `"full-height"` variant.
 *
 * @param layout - The layout to check against
 * @returns true if the current layout is the full height variant.
 */
export function isFullHeightLayout(layout: SupportedWideLayout): boolean {
  return layout === "full-height";
}

/**
 * Checks if the current `layout` is either `"temporary-mini"` or
 * `"toggleable-mini"`.
 *
 * @param layout - The layout to check against
 * @returns true if the current layout is the mini variant.
 * @remarks \@since 2.7.0
 */
export function isMiniLayout(layout: SupportedWideLayout): boolean {
  return layout === "temporary-mini" || layout === "toggleable-mini";
}
