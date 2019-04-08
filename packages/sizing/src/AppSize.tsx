import React, {
  createContext,
  FunctionComponent,
  ReactNode,
  useContext,
  useRef,
} from "react";
import useAppSize, {
  AppSize,
  AppSizeOptions,
  DEFAULT_APP_SIZE,
} from "./useAppSize";
import {
  DEFAULT_PHONE_MAX_WIDTH,
  DEFAULT_TABLET_MIN_WIDTH,
  DEFAULT_TABLET_MAX_WIDTH,
  DEFAULT_DESKTOP_MIN_WIDTH,
  DEFAULT_DESKTOP_LARGE_MIN_WIDTH,
} from "./constants";

export const AppSizeContext = createContext<AppSize>(DEFAULT_APP_SIZE);

/**
 * A helper hook to get the current app size context.
 */
export function useAppSizeContext() {
  return useContext(AppSizeContext);
}

export interface AppSizeListenerProps extends AppSizeOptions {
  children: ReactNode;

  /**
   * An change handler for the app size. This will be called each time the app size
   * changes based on a window resize event and will be provided the
   * next size and the previous size.
   */
  onChange?: (nextSize: AppSize, lastSize: AppSize) => void;
}

type DefaultProps = Required<
  Pick<
    AppSizeListenerProps,
    | "phoneMaxWidth"
    | "tabletMinWidth"
    | "tabletMaxWidth"
    | "desktopMinWidth"
    | "desktopLargeMinWidth"
    | "defaultSize"
  >
>;

type WithDefaultProps = AppSizeListenerProps & DefaultProps;

/**
 * This component should be mounted near the top of your app as it will keep track
 * of the current app size based on the provided breakpoint widths.
 */
export const AppSizeListener: FunctionComponent<
  AppSizeListenerProps
> = providedProps => {
  const {
    children,
    onChange,
    defaultSize,
    phoneMaxWidth,
    tabletMinWidth,
    tabletMaxWidth,
    desktopMinWidth,
    desktopLargeMinWidth,
  } = providedProps as WithDefaultProps;

  const lastValue = useRef(defaultSize);
  const value = useAppSize({
    phoneMaxWidth,
    tabletMaxWidth,
    tabletMinWidth,
    desktopMinWidth,
    desktopLargeMinWidth,
    defaultSize,
  });

  if (lastValue.current !== value) {
    if (onChange) {
      onChange(value, lastValue.current);
    }

    lastValue.current = value;
  }

  return (
    <AppSizeContext.Provider value={value}>{children}</AppSizeContext.Provider>
  );
};

const defaultProps: DefaultProps = {
  phoneMaxWidth: DEFAULT_PHONE_MAX_WIDTH,
  tabletMinWidth: DEFAULT_TABLET_MIN_WIDTH,
  tabletMaxWidth: DEFAULT_TABLET_MAX_WIDTH,
  desktopMinWidth: DEFAULT_DESKTOP_MIN_WIDTH,
  desktopLargeMinWidth: DEFAULT_DESKTOP_LARGE_MIN_WIDTH,
  defaultSize: DEFAULT_APP_SIZE,
};

AppSizeListener.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    const querySize = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);

    AppSizeListener.propTypes = {
      children: PropTypes.node.isRequired,
      onChange: PropTypes.func,
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
    };
  }
}
