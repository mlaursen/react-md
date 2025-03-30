"use client";

import { type ReactElement, type ReactNode } from "react";

import { SsrProvider } from "./SsrProvider.js";
import { UserInteractionModeProvider } from "./interaction/UserInteractionModeProvider.js";
import { AppSizeProvider } from "./media-queries/AppSizeProvider.js";
import {
  type AppSize,
  type AppSizeQueries,
  DEFAULT_APP_SIZE,
  DEFAULT_APP_SIZE_QUERIES,
} from "./media-queries/appSize.js";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { type MenuConfigurationProvider } from "./menu/MenuConfigurationProvider.js";
import {
  type PortalContainer,
  PortalContainerProvider,
} from "./portal/PortalContainerProvider.js";
import { type Snackbar } from "./snackbar/Snackbar.js";
import { type LocalStorageColorSchemeProvider } from "./theme/LocalStorageColorSchemeProvider.js";
import { type ThemeProvider } from "./theme/ThemeProvider.js";
import { type useColorSchemeProvider } from "./theme/useColorSchemeProvider.js";
import { type TooltipHoverModeProvider } from "./tooltip/TooltipHoverModeProvider.js";
import { type WritingDirectionProvider } from "./typography/WritingDirectionProvider.js";

/* eslint-enable @typescript-eslint/no-unused-vars */

/** @since 6.0.0 */
export interface ReactMDCoreConfiguration {
  /**
   * Set this to `true` if you are using SSR. This will update some hook
   * behavior so that you will not have mismatched initial state between server
   * and client and correctly rehydrate after initial render.
   *
   * @defaultValue `false`
   */
  ssr?: boolean;

  /**
   * @defaultValue `DEFAULT_APP_SIZE`
   * @see {@link DEFAULT_APP_SIZE}
   */
  ssrAppSize?: Readonly<AppSize>;

  /**
   * @defaultValue `DEFAULT_APP_SIZE_QUERIES`
   * @see {@link DEFAULT_APP_SIZE_QUERIES}
   */
  appSizeQueries?: Readonly<AppSizeQueries>;

  /** @see {@link PortalContainerProvider} */
  portalContainer?: PortalContainer;
}

/** @since 6.0.0 */
export interface CoreProvidersProps extends ReactMDCoreConfiguration {
  children: ReactNode;
}

/**
 * **Client Component**
 *
 * This is a convenience wrapper for initializing providers for react-md. This
 * includes configuration for:
 *
 * - {@link SsrProvider}
 * - {@link PortalContainerProvider}
 * - {@link AppSizeProvider}
 * - {@link UserInteractionModeProvider}
 *
 * This does not include every provider within `react-md` to help decrease the
 * bundle size for unused features. Here are some other providers that might be
 * useful to initialize near the root of your app:
 *
 * - {@link MenuConfigurationProvider} - If you want to render menus as sheets
 *   on phones or other configuration.
 * - {@link LocalStorageColorSchemeProvider}/{@link useColorSchemeProvider} - If
 *   you want to allow the user to select a light, dark, or system theme
 * - {@link WritingDirectionProvider} - If you need dynamic support for ltr and
 *   rtl languages
 * - {@link ThemeProvider} - If you allow the user to dynamically configure the
 *   `react-md` theme
 * - {@link TooltipHoverModeProvider} - If you want tooltips to appear
 *   immediately for a time after another tooltip has become visible. You can
 *   also configure the global visible delay.
 * - {@link Snackbar} - This isn't a provider but this is how you can display
 *   alerts in your app
 *
 * @see {@link https://next.react-md.dev/components/core-providers | CoreProviders Demos}
 * @since 6.0.0
 */
export function CoreProviders(props: CoreProvidersProps): ReactElement {
  const {
    ssr = false,
    ssrAppSize = DEFAULT_APP_SIZE,
    appSizeQueries = DEFAULT_APP_SIZE_QUERIES,
    portalContainer,
    children,
  } = props;
  return (
    <SsrProvider ssr={ssr}>
      <PortalContainerProvider container={portalContainer}>
        <UserInteractionModeProvider>
          <AppSizeProvider {...appSizeQueries} ssrSize={ssrAppSize}>
            {children}
          </AppSizeProvider>
        </UserInteractionModeProvider>
      </PortalContainerProvider>
    </SsrProvider>
  );
}
