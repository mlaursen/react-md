import type { ReactElement, ReactNode } from "react";
import { NestedDialogContextProvider } from "@react-md/dialog";
import type { FormThemeOptions } from "@react-md/form";
import { FormThemeProvider } from "@react-md/form";
import type { ConfigurableIcons } from "@react-md/icon";
import { IconProvider } from "@react-md/icon";
import type { MenuConfiguration } from "@react-md/menu";
import { MenuConfigurationProvider } from "@react-md/menu";
import type { StatesConfigProps } from "@react-md/states";
import {
  DEFAULT_RIPPLE_CLASSNAMES,
  DEFAULT_RIPPLE_TIMEOUT,
  StatesConfig,
} from "@react-md/states";
import type {
  AppSizeListenerProps,
  AppSizeOptions,
  HoverModeConfiguration,
  WritingDirection,
} from "@react-md/utils";
import {
  AppSizeListener,
  DEFAULT_APP_SIZE,
  DEFAULT_DESKTOP_LARGE_MIN_WIDTH,
  DEFAULT_DESKTOP_MIN_WIDTH,
  DEFAULT_DIR,
  DEFAULT_PHONE_MAX_WIDTH,
  DEFAULT_TABLET_MAX_WIDTH,
  DEFAULT_TABLET_MIN_WIDTH,
  Dir,
  HoverModeProvider,
  UserInteractionModeListener,
} from "@react-md/utils";

export interface ConfigurationProps extends AppSizeOptions, StatesConfigProps {
  /**
   * An optional function to call when the app gets resized based on media
   * queries. This is useful if you want to store the current app state in redux
   * if you can't always access this state with the `useAppSize` hook.
   */
  onAppResize?: AppSizeListenerProps["onChange"];

  /**
   * The children that should gain this configuration. This is required since
   * there's really no reason to use this component if you don't have children
   * that consume the React context.
   */
  children: ReactNode;

  /**
   * An object of all the configurable icons that you want to override
   * throughout react-md.
   */
  icons?: ConfigurableIcons;

  /**
   * An object of any overrides for the `FormThemeProvider`.
   */
  formTheme?: FormThemeOptions;

  /**
   * The current writing direction for your app. This defaults to `"ltr"` but
   * should be changed to `"rtl"` if using a language that is read from right to
   * left.
   *
   * @remarks \@since 2.3.0
   */
  defaultDir?: WritingDirection | (() => WritingDirection);

  /**
   * @see {@link HoverModeConfiguration}
   * @remarks \@since 2.8.0
   */
  hoverMode?: HoverModeConfiguration;

  /**
   * @see {@link MenuConfiguration}
   * @remarks \@since 5.0.0
   */
  menuConfiguration?: Readonly<MenuConfiguration>;
}

/**
 * This component allows you to quickly configure different functionality within
 * `react-md` in one place with reasonable defaults.
 */
export function Configuration({
  onAppResize,
  children,
  icons,
  formTheme,
  defaultDir = DEFAULT_DIR,
  phoneMaxWidth = DEFAULT_PHONE_MAX_WIDTH,
  tabletMinWidth = DEFAULT_TABLET_MIN_WIDTH,
  tabletMaxWidth = DEFAULT_TABLET_MAX_WIDTH,
  desktopMinWidth = DEFAULT_DESKTOP_MIN_WIDTH,
  desktopLargeMinWidth = DEFAULT_DESKTOP_LARGE_MIN_WIDTH,
  defaultSize = DEFAULT_APP_SIZE,
  rippleTimeout = DEFAULT_RIPPLE_TIMEOUT,
  rippleClassNames = DEFAULT_RIPPLE_CLASSNAMES,
  disableRipple = false,
  disableProgrammaticRipple = false,
  hoverMode,
  menuConfiguration,
}: ConfigurationProps): ReactElement {
  return (
    <Dir defaultDir={defaultDir}>
      <AppSizeListener
        defaultSize={defaultSize}
        onChange={onAppResize}
        phoneMaxWidth={phoneMaxWidth}
        tabletMinWidth={tabletMinWidth}
        tabletMaxWidth={tabletMaxWidth}
        desktopMinWidth={desktopMinWidth}
        desktopLargeMinWidth={desktopLargeMinWidth}
      >
        <NestedDialogContextProvider>
          <UserInteractionModeListener>
            <StatesConfig
              disableRipple={disableRipple}
              disableProgrammaticRipple={disableProgrammaticRipple}
              rippleTimeout={rippleTimeout}
              rippleClassNames={rippleClassNames}
            >
              <HoverModeProvider {...hoverMode}>
                <IconProvider {...icons}>
                  <FormThemeProvider {...formTheme}>
                    <MenuConfigurationProvider {...menuConfiguration}>
                      {children}
                    </MenuConfigurationProvider>
                  </FormThemeProvider>
                </IconProvider>
              </HoverModeProvider>
            </StatesConfig>
          </UserInteractionModeListener>
        </NestedDialogContextProvider>
      </AppSizeListener>
    </Dir>
  );
}
