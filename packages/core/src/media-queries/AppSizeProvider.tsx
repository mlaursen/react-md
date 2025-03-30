"use client";

import {
  type ReactElement,
  type ReactNode,
  createContext,
  useContext,
  useMemo,
} from "react";

import { useSsr } from "../SsrProvider.js";
import { useOrientation } from "../useOrientation.js";
import {
  type AppSize,
  type AppSizeQueries,
  DEFAULT_APP_SIZE,
  DEFAULT_DESKTOP_LARGE_MIN_WIDTH,
  DEFAULT_DESKTOP_MIN_WIDTH,
  DEFAULT_PHONE_MAX_WIDTH,
  DEFAULT_TABLET_MAX_WIDTH,
  DEFAULT_TABLET_MIN_WIDTH,
} from "./appSize.js";
import { useMediaQuery } from "./useMediaQuery.js";

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
 * @example Simple Example
 * ```tsx
 * import { useAppSize } from "@react-md/core/media-queries/AppSizeProvider";
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

/**
 * @since 6.0.0 Renamed from `AppSizeListenerProps`.
 * @since 6.0.0 Removed the `onChange` prop
 * @since 6.0.0 Renamed `defaultSize` to `ssrSize`
 */
export interface AppSizeProviderProps extends AppSizeQueries {
  /**
   * @defaultValue `DEFAULT_APP_SIZE`
   * @see {@link DEFAULT_APP_SIZE}
   * @since 6.0.0
   */
  ssrSize?: Readonly<AppSize>;
  children: ReactNode;
}

/**
 * **Client Component**
 *
 * This component should be mounted near the root of your app to determine the
 * current app size based on different media queries.
 *
 * @see {@link https://next.react-md.dev/components/core-providers | CoreProviders Demos}
 * @see {@link https://next.react-md.dev/components/app-size-provider | AppSizeProvider Demos}
 * @since 6.0.0 Renamed from `AppSizeListener`
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

  const ssr = useSsr();
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

  let value = appSize;
  if (ssr || typeof window === "undefined") {
    value = {
      __root: true,
      ...ssrSize,
    };
  }

  return <Provider value={value}>{children}</Provider>;
}
