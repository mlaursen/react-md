"use client";
import { type ReactElement, type ReactNode } from "react";
import { SsrProvider } from "./SsrProvider.js";
import { IconProvider, type ConfigurableIcons } from "./icon/IconProvider.js";
import { ElementInteractionProvider } from "./interaction/ElementInteractionProvider.js";
import { UserInteractionModeProvider } from "./interaction/UserInteractionModeProvider.js";
import { type ElementInteractionMode } from "./interaction/types.js";
import { AppSizeProvider } from "./media-queries/AppSizeProvider.js";
import {
  DEFAULT_APP_SIZE,
  DEFAULT_APP_SIZE_QUERIES,
  type AppSize,
  type AppSizeQueries,
} from "./media-queries/appSize.js";
import {
  PortalContainerProvider,
  type PortalContainer,
} from "./portal/PortalContainerProvider.js";
import {
  ColorSchemeProvider,
  type ColorSchemeMode,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type ColorSchemeProviderProps,
} from "./theme/ColorSchemeProvider.js";
import {
  DEFAULT_WRITING_DIRECTION,
  WritingDirection,
  type DefaultDir,
} from "./typography/WritingDirection.js";

/** @remarks \@since 6.0.0 */
export interface ReactMDCoreConfiguration {
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

  /**
   * @defaultValue `"ripple"`
   */
  elementInteractionMode?: ElementInteractionMode;

  /**
   * @see {@link ElementInteractionProviderProps.disableHigherContrast}
   * @defaultValue `false`
   */
  disableHigherContrast?: boolean;

  /** @see {@link PortalContainerProvider} */
  portalContainer?: PortalContainer;

  /**
   * @defaultValue `"ltr"`
   * @see {@link DEFAULT_WRITING_DIRECTION}
   */
  defaultDir?: DefaultDir;

  /**
   * @defaultValue `false`
   */
  ssr?: boolean;

  /** @see {@link ConfigurableIcons} for default values */
  icons?: ConfigurableIcons;

  /**
   * @see {@link ColorSchemeProviderProps.mode}
   * @defaultValue `"light"`
   */
  colorSchemeMode?: ColorSchemeMode;

  /**
   * @see {@link ColorSchemeProviderProps.localStorageKey}
   * @defaultValue `""`
   */
  colorSchemeModeKey?: string;

  /**
   * @see {@link ColorSchemeProviderProps.disableMetaTag}
   * @defaultValue `false`
   */
  disableColorSchemeMetaTag?: boolean;
}

/** @remarks \@since 6.0.0 */
export interface CoreProvidersProps extends ReactMDCoreConfiguration {
  children: ReactNode;
}

/**
 * **Client Component**
 *
 * @remarks \@since 6.0.0
 */
export function CoreProviders(props: CoreProvidersProps): ReactElement {
  const {
    ssr = false,
    ssrAppSize = DEFAULT_APP_SIZE,
    icons,
    appSizeQueries = DEFAULT_APP_SIZE_QUERIES,
    elementInteractionMode = "ripple",
    disableHigherContrast = false,
    defaultDir = DEFAULT_WRITING_DIRECTION,
    colorSchemeMode = "light",
    colorSchemeModeKey = "",
    disableColorSchemeMetaTag = false,
    portalContainer,
    children,
  } = props;
  return (
    <SsrProvider ssr={ssr}>
      <ColorSchemeProvider
        mode={colorSchemeMode}
        localStorageKey={colorSchemeModeKey}
        disableMetaTag={disableColorSchemeMetaTag}
      >
        <WritingDirection defaultDir={defaultDir}>
          <PortalContainerProvider container={portalContainer}>
            <UserInteractionModeProvider>
              <AppSizeProvider {...appSizeQueries} ssrSize={ssrAppSize}>
                <ElementInteractionProvider
                  mode={elementInteractionMode}
                  disableHigherContrast={disableHigherContrast}
                >
                  <IconProvider {...icons}>{children}</IconProvider>
                </ElementInteractionProvider>
              </AppSizeProvider>
            </UserInteractionModeProvider>
          </PortalContainerProvider>
        </WritingDirection>
      </ColorSchemeProvider>
    </SsrProvider>
  );
}
