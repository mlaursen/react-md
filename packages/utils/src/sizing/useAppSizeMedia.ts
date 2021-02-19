import { useEffect, useState } from "react";

import {
  DEFAULT_DESKTOP_LARGE_MIN_WIDTH,
  DEFAULT_DESKTOP_MIN_WIDTH,
  DEFAULT_PHONE_MAX_WIDTH,
  DEFAULT_TABLET_MAX_WIDTH,
  DEFAULT_TABLET_MIN_WIDTH,
  QuerySize,
} from "./constants";
import { useOrientation } from "./useOrientation";
import { useWidthMediaQuery } from "./useWidthMediaQuery";

/**
 * The current size for your application. This should work both server side and
 * client side, but you will have much better results client side.
 */
export interface AppSize {
  /**
   * Boolean if currently matching a phone by comparing the max width of the
   * device.
   */
  isPhone: boolean;

  /**
   * Boolean if currently matching a tablet by comparing the max width of the
   * device.
   */
  isTablet: boolean;

  /**
   * Boolean if currently matching a desktop screen by comparing the max width
   * of the device.
   */
  isDesktop: boolean;

  /**
   * Boolean if currently matching a large desktop screen by comparing the max
   * width of the device.
   */
  isLargeDesktop: boolean;

  /**
   * Boolean if the app is considered to be in landscape mode. This will just
   * verify that the window width is greater than the window height.
   *
   * NOTE: This might not be super accurate on Android devices since the soft
   * keyboard will change the dimensions of the viewport when it appears. It is
   * recommended to use the `useOrientation` hook as well if you'd like to get
   * the current orientation type.
   */
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
   * The max width for a tablet device. This should normally be `1px` less than
   * the `desktopMinWidth`, but it can be any value if needed. The tablet has a
   * range of min to max so that you can have a bit more control.
   */
  tabletMaxWidth?: QuerySize;

  /**
   * The min width for a desktop screen.
   */
  desktopMinWidth?: QuerySize;

  /**
   * The min width for a large desktop screen.
   */
  desktopLargeMinWidth?: QuerySize;

  /**
   * An optional default size to use for your app. This is really only helpful
   * when trying to do server side rendering or initial page render since the
   * default behavior is to check and update the size once mounted in the DOM.
   */
  defaultSize?: AppSize;
}

/**
 * This hook is used to determine the current application size based on the
 * provided query sizes. When you want to render your app server side, you will
 * need to provide a custom `defaultSize` that implements your logic to
 * determine the type of device requesting a page. Once the app has been
 * rendered in the DOM, this hook will attach event listeners to automatically
 * update the app size when the page is resized.
 *
 * @internal
 */
export function useAppSizeMedia({
  phoneMaxWidth = DEFAULT_PHONE_MAX_WIDTH,
  tabletMinWidth = DEFAULT_TABLET_MIN_WIDTH,
  tabletMaxWidth = DEFAULT_TABLET_MAX_WIDTH,
  desktopMinWidth = DEFAULT_DESKTOP_MIN_WIDTH,
  desktopLargeMinWidth = DEFAULT_DESKTOP_LARGE_MIN_WIDTH,
  defaultSize = DEFAULT_APP_SIZE,
}: AppSizeOptions = {}): AppSize {
  /* eslint-disable react-hooks/rules-of-hooks */
  // disabled since this is conditionally applied for SSR
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
  const isDesktop = matchesDesktop;
  const isTablet = !matchesDesktop && matchesTablet;
  const isPhone = !isTablet && !isDesktop && matchesPhone;
  const isLandscape = useOrientation().includes("landscape");
  const isLargeDesktop = matchesLargeDesktop;

  const [appSize, setAppSize] = useState(defaultSize);
  useEffect(() => {
    if (
      appSize.isPhone === isPhone &&
      appSize.isTablet === isTablet &&
      appSize.isDesktop === isDesktop &&
      appSize.isLargeDesktop === isLargeDesktop &&
      appSize.isLandscape === isLandscape
    ) {
      return;
    }

    // for some reason, it's sometimes possible to fail every single matchMedia
    // value when you are resizing the browser a lot. this is an "invalid" event
    // so skip it. It normally happens between 760px-768px
    if (!isPhone && !isTablet && !isDesktop && !isLargeDesktop) {
      return;
    }

    setAppSize({ isPhone, isTablet, isDesktop, isLargeDesktop, isLandscape });
  }, [isPhone, isTablet, isDesktop, isLargeDesktop, isLandscape, appSize]);

  return appSize;
}
