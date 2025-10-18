export type QuerySize = number | `${number}${string}`;

/** @defaultValue `47.9375em` */
export const DEFAULT_PHONE_MAX_WIDTH = `${767 / 16}em` satisfies QuerySize;

/** @defaultValue `48em` */
export const DEFAULT_TABLET_MIN_WIDTH = `${768 / 16}em` satisfies QuerySize;

/** @defaultValue `64em` */
export const DEFAULT_TABLET_MAX_WIDTH = `${1024 / 16}em` satisfies QuerySize;

/** @defaultValue `64.0625em` */
export const DEFAULT_DESKTOP_MIN_WIDTH = `${1025 / 16}em` satisfies QuerySize;

/** @defaultValue `80em` */
export const DEFAULT_DESKTOP_LARGE_MIN_WIDTH = `${
  1280 / 16
}em` satisfies QuerySize;

export interface AppSizeQueries {
  /**
   * The max width to use for phones. This one is a max width unlike the others
   * since everything from 0 to this value will be considered a phone.
   *
   * @defaultValue `47.9375em`
   * @see {@link DEFAULT_PHONE_MAX_WIDTH}
   */
  phoneMaxWidth?: QuerySize;

  /**
   * The min width for a tablet device.
   *
   * @defaultValue `48em`
   * @see {@link DEFAULT_TABLET_MIN_WIDTH}
   */
  tabletMinWidth?: QuerySize;

  /**
   * The max width for a tablet device. This should normally be `1px` less than
   * the `desktopMinWidth`, but it can be any value if needed. The tablet has a
   * range of min to max so that you can have a bit more control.
   *
   * @defaultValue `64em`
   * @see {@link DEFAULT_TABLET_MAX_WIDTH}
   */
  tabletMaxWidth?: QuerySize;

  /**
   * The min width for a desktop screen.
   *
   * @defaultValue `64.0625em`
   * @see {@link DEFAULT_DESKTOP_MIN_WIDTH}
   */
  desktopMinWidth?: QuerySize;

  /**
   * The min width for a large (1440p, 4k, etc) desktop screen.
   *
   * @defaultValue `80em`
   * @see {@link DEFAULT_DESKTOP_LARGE_MIN_WIDTH}
   */
  desktopLargeMinWidth?: QuerySize;
}

/**
 * @deprecated Use `MEDIA_QUERY_CONFIG` instead.
 */
export const DEFAULT_APP_SIZE_QUERIES: Readonly<AppSizeQueries> = {
  phoneMaxWidth: DEFAULT_PHONE_MAX_WIDTH,
  tabletMinWidth: DEFAULT_TABLET_MIN_WIDTH,
  tabletMaxWidth: DEFAULT_TABLET_MAX_WIDTH,
  desktopMinWidth: DEFAULT_DESKTOP_MIN_WIDTH,
  desktopLargeMinWidth: DEFAULT_DESKTOP_LARGE_MIN_WIDTH,
};

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
