import React, { FC, ReactNode } from "react";
import { NestedDialogContextProvider } from "@react-md/dialog";
import { IconProvider, ConfigurableIcons } from "@react-md/icon";
import {
  StatesConfigProps,
  RIPPLE_TIMEOUT,
  RIPPLE_CLASS_NAMES,
  StatesConfig,
} from "@react-md/states";
import { TooltipHoverModeConfig } from "@react-md/tooltip";
import { TransitionConfiguration } from "@react-md/transition";
import {
  AppSizeListener,
  AppSizeListenerProps,
  AppSizeOptions,
  DEFAULT_APP_SIZE,
  DEFAULT_TABLET_MIN_WIDTH,
  DEFAULT_PHONE_MAX_WIDTH,
  DEFAULT_TABLET_MAX_WIDTH,
  DEFAULT_DESKTOP_MIN_WIDTH,
  DEFAULT_DESKTOP_LARGE_MIN_WIDTH,
  InteractionModeListener,
} from "@react-md/utils";

export interface ConfigurationProps extends AppSizeOptions, StatesConfigProps {
  /**
   * An optional function to call when the app gets resized based on media queries.
   * This is useful if you want to store the current app state in redux if you can't
   * always access this state with the `useAppSize` hook.
   */
  onAppResize?: AppSizeListenerProps["onChange"];

  /**
   * Boolean if the default tooltip hover mode should be disabled.
   */
  disableTooltipHoverMode?: boolean;

  /**
   * The default delay before the tooltip hover mode is enabled.
   */
  tooltipDefaultDelay?: number;

  /**
   * The delay before the tooltip should become visible.
   */
  tooltipDelayTimeout?: number;

  /**
   * The children that should gain this configuration. This is required
   * since there's really no reason to use this component if you don't
   * have children that consume the React context.
   */
  children: ReactNode;

  /**
   * An object of all the configurable icons that you want to override throughout
   * react-md.
   */
  icons?: ConfigurableIcons;
}

export type ConfigurationDefaultProps = Required<
  Pick<
    ConfigurationProps,
    | "phoneMaxWidth"
    | "tabletMinWidth"
    | "tabletMaxWidth"
    | "desktopMinWidth"
    | "desktopLargeMinWidth"
    | "defaultSize"
    | "disableRipple"
    | "disableProgrammaticRipple"
    | "rippleTimeout"
    | "rippleClassNames"
    | "disableTooltipHoverMode"
    | "tooltipDefaultDelay"
    | "tooltipDelayTimeout"
  >
>;
type WithDefaultProps = ConfigurationProps & ConfigurationDefaultProps;

/**
 * This component allows you to quickly configure different functionality within
 * `react-md` in one place with reasonable defaults.
 */
const Configuration: FC<ConfigurationProps> = providedProps => {
  const {
    defaultSize,
    onAppResize,
    phoneMaxWidth,
    tabletMinWidth,
    tabletMaxWidth,
    desktopLargeMinWidth,
    disableRipple,
    disableProgrammaticRipple,
    rippleTimeout,
    rippleClassNames,
    children,
    disableTooltipHoverMode,
    tooltipDefaultDelay,
    tooltipDelayTimeout,
    icons,
  } = providedProps as WithDefaultProps;

  return (
    <AppSizeListener
      defaultSize={defaultSize}
      onChange={onAppResize}
      phoneMaxWidth={phoneMaxWidth}
      tabletMinWidth={tabletMinWidth}
      tabletMaxWidth={tabletMaxWidth}
      desktopLargeMinWidth={desktopLargeMinWidth}
    >
      <NestedDialogContextProvider>
        <TransitionConfiguration>
          <InteractionModeListener>
            <StatesConfig
              disableRipple={disableRipple}
              disableProgrammaticRipple={disableProgrammaticRipple}
              rippleTimeout={rippleTimeout}
              rippleClassNames={rippleClassNames}
            >
              <TooltipHoverModeConfig
                enabled={!disableTooltipHoverMode}
                defaultDelay={tooltipDefaultDelay}
                delayTimeout={tooltipDelayTimeout}
              >
                <IconProvider {...icons}>{children}</IconProvider>
              </TooltipHoverModeConfig>
            </StatesConfig>
          </InteractionModeListener>
        </TransitionConfiguration>
      </NestedDialogContextProvider>
    </AppSizeListener>
  );
};

const defaultProps: ConfigurationDefaultProps = {
  phoneMaxWidth: DEFAULT_PHONE_MAX_WIDTH,
  tabletMinWidth: DEFAULT_TABLET_MIN_WIDTH,
  tabletMaxWidth: DEFAULT_TABLET_MAX_WIDTH,
  desktopMinWidth: DEFAULT_DESKTOP_MIN_WIDTH,
  desktopLargeMinWidth: DEFAULT_DESKTOP_LARGE_MIN_WIDTH,
  defaultSize: DEFAULT_APP_SIZE,
  rippleTimeout: RIPPLE_TIMEOUT,
  rippleClassNames: RIPPLE_CLASS_NAMES,
  disableRipple: false,
  disableProgrammaticRipple: false,
  disableTooltipHoverMode: false,
  tooltipDefaultDelay: 1000,
  tooltipDelayTimeout: 1000,
};

Configuration.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  let PropTypes;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
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
      }),
    };
  }
}

export default Configuration;
