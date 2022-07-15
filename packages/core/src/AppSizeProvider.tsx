import type { ReactElement, ReactNode } from "react";
import { createContext, useContext, useMemo } from "react";

import { useMediaQuery } from "./useMediaQuery";
import { useOrientation } from "./useOrientation";

export type QuerySize = number | string;

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

/** @internal */
interface AppSizeContext extends AppSize {
  __root: boolean;
}

const context = createContext<AppSizeContext>({
  __root: false,
  isPhone: false,
  isTablet: false,
  isDesktop: true,
  isLargeDesktop: false,
  isLandscape: true,
});
context.displayName = "AppSize";
const { Provider } = context;

/**
 * **Note**: The app size object returned by this hook will **not** be equal
 * between renders.
 *
 * @example
 * Simple Example
 * ```tsx
 * import { useAppSize } from "@react-md/core";
 *
 * function Example() {
 *   const { isPhone, isTablet, isDesktop, isLargeDesktop, isLandscape } =
 *     useAppSize()
 *
 *   // do something based on the app size
 *   return null;
 * }
 * ```
 *
 * @returns the current app size.
 * @throws "The `AppSizeProvider` has not been mounted."
 */
export function useAppSize(): Readonly<AppSize> {
  const { __root, ...appSize } = useContext(context);
  if (!__root) {
    throw new Error("The `AppSizeProvider` has not been mounted.");
  }

  return appSize;
}

export const DEFAULT_DESKTOP_MIN_WIDTH: QuerySize = `${1025 / 16}em`;
export const DEFAULT_TABLET_MIN_WIDTH: QuerySize = `${768 / 16}em`;
export const DEFAULT_TABLET_MAX_WIDTH: QuerySize = `${1024 / 16}em`;
export const DEFAULT_PHONE_MAX_WIDTH: QuerySize = `${767 / 16}em`;
export const DEFAULT_DESKTOP_LARGE_MIN_WIDTH: QuerySize = `${1280 / 16}em`;
export const DEFAULT_APP_SIZE_QUERIES: Readonly<AppSizeQueries> = {
  phoneMaxWidth: DEFAULT_PHONE_MAX_WIDTH,
  tabletMinWidth: DEFAULT_TABLET_MIN_WIDTH,
  tabletMaxWidth: DEFAULT_TABLET_MAX_WIDTH,
  desktopMinWidth: DEFAULT_DESKTOP_MIN_WIDTH,
  desktopLargeMinWidth: DEFAULT_DESKTOP_LARGE_MIN_WIDTH,
};

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

export interface AppSizeProviderProps extends AppSizeQueries {
  /**
   * @defaultValue `DEFAULT_APP_SIZE`
   * @see {@link DEFAULT_APP_SIZE}
   */
  ssrSize?: Readonly<AppSize>;
  children: ReactNode;
}

/**
 * This component should be mounted near the root of your app to determine the
 * current app size based on different media queries.
 */
export function AppSizeProvider(props: AppSizeProviderProps): ReactElement {
  const {
    ssrSize = DEFAULT_APP_SIZE,
    phoneMaxWidth = DEFAULT_PHONE_MAX_WIDTH,
    tabletMinWidth = DEFAULT_TABLET_MIN_WIDTH,
    tabletMaxWidth = DEFAULT_TABLET_MAX_WIDTH,
    desktopMinWidth = DEFAULT_DESKTOP_MIN_WIDTH,
    desktopLargeMinWidth = DEFAULT_DESKTOP_LARGE_MIN_WIDTH,
    children,
  } = props;
  const { __root } = useContext(context);
  if (__root) {
    throw new Error("The `AppSizeProvider` cannot be mounted multiple times.");
  }

  const matchesDesktop = useMediaQuery(
    `screen and (min-width: ${desktopMinWidth})`
  );
  const matchesLargeDesktop = useMediaQuery(
    `screen and (min-width: ${desktopLargeMinWidth})`
  );
  const matchesTablet = useMediaQuery(
    `screen and (min-width: ${tabletMinWidth}) and (max-width: ${tabletMaxWidth})`
  );
  const matchesPhone = useMediaQuery(
    `screen and (max-width: ${phoneMaxWidth})`
  );
  const isDesktop = matchesDesktop;
  const isTablet = !matchesDesktop && matchesTablet;
  const isPhone = !isTablet && !isDesktop && matchesPhone;
  const isLandscape = useOrientation().includes("landscape");
  const isLargeDesktop = matchesLargeDesktop;

  const appSize = useMemo<AppSizeContext>(
    () => ({
      __root: true,
      isPhone,
      isTablet,
      isDesktop,
      isLargeDesktop,
      isLandscape,
    }),
    [isDesktop, isLandscape, isLargeDesktop, isPhone, isTablet]
  );

  if (typeof window === "undefined") {
    return <Provider value={{ __root: true, ...ssrSize }}>{children}</Provider>;
  }

  return <Provider value={appSize}>{children}</Provider>;
}
