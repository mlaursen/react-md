import {
  DEFAULT_DESKTOP_LARGE_MIN_WIDTH,
  DEFAULT_DESKTOP_MIN_WIDTH,
  DEFAULT_PHONE_MAX_WIDTH,
  DEFAULT_TABLET_MAX_WIDTH,
  DEFAULT_TABLET_MIN_WIDTH,
  QuerySize,
} from "./constants";
import useOrientation from "./useOrientation";
import useWidthMediaQuery from "./useWidthMediaQuery";

export interface AppSize {
  isPhone: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
  isLandscape: boolean;
}

export const DEFAULT_APP_SIZE: AppSize = {
  isPhone: false,
  isTablet: false,
  isDesktop: true,
  isLargeDesktop: false,
  isLandscape: true,
};

export interface AppSizeOptions {
  /**
   * The max width to use for phones. This one is a max width unline the others
   * since everything from 0 to this value will be considered a phone.
   */
  phoneMaxWidth?: QuerySize;

  /**
   * The min width for a tablet device.
   */
  tabletMinWidth?: QuerySize;

  /**
   * The max width for a tablet device. This should normally be `1px` less than the
   * `desktopMinWidth`, but it can be any value if needed. The tablet has a range of
   * min to max so that you can have a bit more control.
   */
  tabletMaxWidth?: QuerySize;
  desktopMinWidth?: QuerySize;
  desktopLargeMinWidth?: QuerySize;
  defaultSize?: AppSize;
}

/**
 * This hook is used to determine the current application size based
 * on the provided query sizes.
 */
export default function useAppSize({
  phoneMaxWidth = DEFAULT_PHONE_MAX_WIDTH,
  tabletMinWidth = DEFAULT_TABLET_MIN_WIDTH,
  tabletMaxWidth = DEFAULT_TABLET_MAX_WIDTH,
  desktopMinWidth = DEFAULT_DESKTOP_MIN_WIDTH,
  desktopLargeMinWidth = DEFAULT_DESKTOP_LARGE_MIN_WIDTH,
  defaultSize = DEFAULT_APP_SIZE,
}: AppSizeOptions = {}): AppSize {
  if (typeof window === "undefined") {
    return defaultSize;
  }

  const matchesDesktop = useWidthMediaQuery({ min: desktopMinWidth });
  const matchesLargeDesktop = useWidthMediaQuery({ min: desktopLargeMinWidth });
  const matchesTablet = useWidthMediaQuery({
    min: tabletMinWidth,
    max: tabletMaxWidth,
  });
  const matchesPhone = useWidthMediaQuery({ max: phoneMaxWidth });
  const orientation = useOrientation();
  const isLandscape =
    orientation === "landscape-primary" ||
    orientation === "landscape-secondary";
  const isDesktop = matchesDesktop;
  const isTablet = !matchesDesktop && matchesTablet;
  const isPhone = !isTablet && !isDesktop && matchesPhone;

  return {
    isPhone,
    isTablet,
    isDesktop,
    isLargeDesktop: matchesLargeDesktop,
    isLandscape,
  };
}
