import { AppSize } from "@react-md/utils";
import { LayoutConfiguration, SupportedWideLayout } from "./types";

export const DEFAULT_PHONE_LAYOUT = "temporary";
export const DEFAULT_TABLET_LAYOUT = "toggleable";
export const DEFAULT_LANDSCAPE_TABLET_LAYOUT = "full-height";
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
export default function getLayout({
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
