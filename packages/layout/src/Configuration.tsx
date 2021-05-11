import React, { ReactElement, ReactNode } from "react";
import { NestedDialogContextProvider } from "@react-md/dialog";
import { FormThemeOptions, FormThemeProvider } from "@react-md/form";
import { ConfigurableIcons, IconProvider } from "@react-md/icon";
import {
  DEFAULT_RIPPLE_CLASSNAMES,
  DEFAULT_RIPPLE_TIMEOUT,
  StatesConfig,
  StatesConfigProps,
} from "@react-md/states";
import {
  AppSizeListener,
  AppSizeListenerProps,
  AppSizeOptions,
  DEFAULT_APP_SIZE,
  DEFAULT_DESKTOP_LARGE_MIN_WIDTH,
  DEFAULT_DESKTOP_MIN_WIDTH,
  DEFAULT_DIR,
  DEFAULT_PHONE_MAX_WIDTH,
  DEFAULT_TABLET_MAX_WIDTH,
  DEFAULT_TABLET_MIN_WIDTH,
  Dir,
  HoverModeConfiguration,
  HoverModeProvider,
  UserInteractionModeListener,
  WritingDirection,
} from "@react-md/utils";

export interface ConfigurationProps extends AppSizeOptions, StatesConfigProps {
  /**
   * An optional function to call when the app gets resized based on media
   * queries. This is useful if you want to store the current app state in redux
   * if you can't always access this state with the `useAppSize` hook.
   */
  onAppResize?: AppSizeListenerProps["onChange"];

  /**
   * Boolean if the default tooltip hover mode should be disabled.
   *
   * @deprecated \@since 2.8.0 Use the {@link hoverMode} configuration object
   * instead.
   */
  disableTooltipHoverMode?: boolean;

  /**
   * The default delay before the tooltip hover mode is enabled.
   *
   * @deprecated \@since 2.8.0 Use the {@link hoverMode} configuration object
   * instead.
   */
  tooltipDefaultDelay?: number;

  /**
   * The delay before the tooltip should become visible.
   *
   * @deprecated \@since 2.8.0 Use the {@link hoverMode} configuration object
   * instead.
   */
  tooltipDelayTimeout?: number;

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
  disableTooltipHoverMode,
  tooltipDefaultDelay,
  tooltipDelayTimeout,
  hoverMode,
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
              <HoverModeProvider
                disabled={disableTooltipHoverMode}
                defaultVisibleInTime={tooltipDefaultDelay}
                deactivateTime={tooltipDelayTimeout}
                {...hoverMode}
              >
                <IconProvider {...icons}>
                  <FormThemeProvider {...formTheme}>
                    {children}
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

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");
    const querySize = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);

    Configuration.propTypes = {
      children: PropTypes.node.isRequired,
      onAppResize: PropTypes.func,
      phoneMaxWidth: querySize,
      tabletMinWidth: querySize,
      tabletMaxWidth: querySize,
      desktopMinWidth: querySize,
      desktopLargeMinWidth: querySize,
      defaultSize: PropTypes.shape({
        isPhone: PropTypes.bool.isRequired,
        isTablet: PropTypes.bool.isRequired,
        isDesktop: PropTypes.bool.isRequired,
        isLargeDesktop: PropTypes.bool.isRequired,
        isLandscape: PropTypes.bool.isRequired,
      }),
      rippleTimeout: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.shape({
          enter: PropTypes.number,
          exit: PropTypes.number,
        }),
      ]),
      rippleClassNames: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          enter: PropTypes.string,
          enterActive: PropTypes.string,
          enterDone: PropTypes.string,
          exit: PropTypes.string,
          exitActive: PropTypes.string,
        }),
      ]),
      disableRipple: PropTypes.bool,
      disableProgrammaticRipple: PropTypes.bool,
      tooltipDelayTimeout: PropTypes.number,
      tooltipDefaultDelay: PropTypes.number,
      disableTooltipHoverMode: PropTypes.bool,
      icons: PropTypes.shape({
        back: PropTypes.node,
        checkbox: PropTypes.node,
        expander: PropTypes.node,
        dropdown: PropTypes.node,
        download: PropTypes.node,
        forward: PropTypes.node,
        menu: PropTypes.node,
        radio: PropTypes.node,
        password: PropTypes.node,
        notification: PropTypes.node,
        sort: PropTypes.node,
      }),
      formTheme: PropTypes.shape({
        theme: PropTypes.oneOf(["none", "underline", "outline", "filled"]),
        underlineDirection: PropTypes.oneOf(["left", "center", "right"]),
      }),
      defaultDir: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.oneOf(["ltr", "rtl"]),
      ]),
    };
  } catch (e) {}
}
