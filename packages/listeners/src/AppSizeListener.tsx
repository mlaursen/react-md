import * as React from "react";

import { default as ResizeListener, IResizeListenerConfigProps, IResizeListenerDefaultProps } from "./ResizeListener";

/**
 * An enum of the available "app sizes" for react-md. The app sizes fall into two categories:
 * - base device size
 * - orientation with base device size
 *
 * If an orientation matches, the base device size media will also be considered a match.
 */
export enum AppSize {
  PHONE = "phone",
  TABLET = "tablet",
  DESKTOP = "desktop",
  PORTRAIT_PHONE = "portrait-phone",
  LANDSCAPE_PHONE = "landscape-phone",
  PORTRAIT_TABLET = "portrait-tablet",
  LANDSCAPE_TABLET = "landscape-tablet",
  DESKTOP_PHONE = "desktop-phone",
  DESKTOP_TABLET = "desktop-tablet",
}

export interface IAppSize {
  isPhone: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isPortraitPhone: boolean;
  isLandscapePhone: boolean;
  isPortraitTablet: boolean;
  isLandscapeTablet: boolean;
  isDesktopPhone: boolean;
  isDesktopTablet: boolean;
}

export interface IAppSizeListenerBaseProps extends IResizeListenerConfigProps {
  defaultSize?: AppSize | keyof AppSize;
  tabletMinWidth?: number;
  desktopMinWidth?: number;
  onResize?: (appSize: IAppSize) => void;
  children?: (appSize: IAppSize) => React.ReactNode;
  disableResizeOnMount?: boolean;
}

export interface IAppSizeListenerWithOnResizeProps extends IAppSizeListenerBaseProps {
  onResize: (appSize: IAppSize) => void;
}

export interface IAppSizeListenerWithChildrenProps extends IAppSizeListenerBaseProps {
  children: (appSize: IAppSize) => React.ReactNode;
}

export type IAppSizeListenerProps = IAppSizeListenerWithOnResizeProps | IAppSizeListenerWithChildrenProps;

export interface IDefaultAppSizeRequired {
  defaultSize: AppSize | keyof AppSize;
  disableResizeOnMount: boolean;
}

export interface IAppSizeMediaProps extends IDefaultAppSizeRequired {
  tabletMinWidth: number;
  desktopMinWidth: number;
}

export interface IAppSizeListenerDefaultProps extends IResizeListenerDefaultProps, IAppSizeMediaProps {}

export type AppSizeListenerWithDefaultProps = IAppSizeListenerProps & IAppSizeListenerDefaultProps;

export interface IAppSizeListenerState extends IAppSize {
  // just so I can do Object.keys(state).some easily
  [key: string]: boolean;
}

/**
 * The `AppSizeListener` component is used for listening to resize events on the page and then determining
 * what the "next" app size is. This comes with some reasonable defaults for determining phones, tablets,
 * and desktop based on min width. To help a bit more with some more complex layouts, there are also values
 * for portrait and landscape versions of the above.
 */
export default class AppSizeListener extends React.Component<IAppSizeListenerProps, IAppSize> {
  public static AppSize = AppSize;
  public static defaultProps: IAppSizeListenerDefaultProps = {
    defaultSize: AppSize.DESKTOP,
    tabletMinWidth: 768,
    desktopMinWidth: 1025,
    touchDelay: 300,
    disableResizeOnMount: false,
    disableTouchFixes: false,
    disableTouchKeyboardFixes: false,
    disableMountResizeTrigger: false,
  };

  /**
   * A simple util that will be able to create your initial state based on a default size. This is mostly used
   * internally within the component, but it is exported in case it is helpful to generate a default redux
   * state.
   *
   * Example:
   * ```ts
   * import { createStore } from "redux";
   * import { AppSizeListener, IAppSize } from "@react-md/listeners";
   *
   * export const RESIZED_APP = "RESIZED_APP";
   * export function resizeApp(appSize: IAppSize) {
   *   return { type: RESIZED_APP, payload: appSize };
   * }
   *
   * export const INITIAL_STATE = AppSizeListener.createDefaultState();
   * export function appSize(state = INITIAL_STATE), action) {
   *   switch(action.type) {
   *     case RESIZED_APP:
   *       return action.payload as IAppSize;
   *     default:
   *       return state;
   *   }
   * }
   * ```
   */
  public static createDefaultState(props: IDefaultAppSizeRequired = AppSizeListener.defaultProps): IAppSize {
    const { defaultSize } = props;
    const isPortraitPhone = defaultSize === AppSize.PORTRAIT_PHONE;
    const isLandscapePhone = defaultSize === AppSize.LANDSCAPE_PHONE;
    const isPortraitTablet = defaultSize === AppSize.PORTRAIT_TABLET;
    const isLandscapeTablet = defaultSize === AppSize.LANDSCAPE_TABLET;
    const isDesktopPhone = defaultSize === AppSize.DESKTOP_PHONE;
    const isDesktopTablet = defaultSize === AppSize.DESKTOP_TABLET;

    return {
      isPhone: isPortraitPhone || isLandscapePhone || defaultSize === AppSize.PORTRAIT_PHONE,
      isTablet: isPortraitTablet || isLandscapeTablet || defaultSize === AppSize.TABLET,
      isDesktop: isDesktopPhone || isDesktopTablet || defaultSize === AppSize.DESKTOP,
      isPortraitPhone,
      isLandscapePhone,
      isPortraitTablet,
      isLandscapeTablet,
      isDesktopPhone,
      isDesktopTablet,
    };
  }

  /**
   * This helper function attempt to run media queries to determine the next state. If the `window` is
   * not defined, `AppSizeListener.createDefaultState` will be used as a fallback instead.
   */
  public static createStateFromQueries(props: IAppSizeMediaProps = AppSizeListener.defaultProps): IAppSize {
    if (typeof window === "undefined") {
      return AppSizeListener.createDefaultState(props);
    }

    const { tabletMinWidth, desktopMinWidth } = props as AppSizeListenerWithDefaultProps;

    const phoneMedia = `screen and (max-width: ${tabletMinWidth - 1}px)`;
    const tabletMedia = `screen and (min-width: ${tabletMinWidth}px) and (max-width: ${desktopMinWidth - 1}px)`;
    const desktopMedia = `screen and (min-width: ${desktopMinWidth}px)`;

    const matchesTablet = window.matchMedia(tabletMedia).matches;

    const portrait = window.innerHeight > window.innerWidth;
    const isDesktop = window.matchMedia(desktopMedia).matches;
    const isTablet = !isDesktop && matchesTablet;
    const isPhone = !isDesktop && !isTablet;
    const isPortraitPhone = isPhone && portrait;
    const isLandscapePhone = isPhone && !portrait;
    const isPortraitTablet = isTablet && portrait;
    const isLandscapeTablet = isTablet && !portrait;
    const isDesktopPhone = isDesktop && window.matchMedia(phoneMedia).matches;
    const isDesktopTablet = isDesktop && matchesTablet;
    return {
      isPhone,
      isTablet,
      isDesktop,
      isPortraitPhone,
      isLandscapePhone,
      isPortraitTablet,
      isLandscapeTablet,
      isDesktopPhone,
      isDesktopTablet,
    };
  }

  private calledOnce: boolean;
  constructor(props: IAppSizeListenerProps) {
    super(props);

    this.state = AppSizeListener.createStateFromQueries(props as AppSizeListenerWithDefaultProps);
    this.calledOnce = false;
  }

  public shouldComponentUpdate(nextProps: IAppSizeListenerProps, nextState: IAppSizeListenerState) {
    return !!nextProps.children;
  }

  public render() {
    const { defaultSize, tabletMinWidth, desktopMinWidth, onResize, children, ...props } = this
      .props as AppSizeListenerWithDefaultProps;

    const listener = <ResizeListener key="listener" {...props} onResize={this.handleResize} />;
    if (typeof children !== "function") {
      return listener;
    }

    return (
      <React.Fragment>
        {listener}
        {children(this.state)}
      </React.Fragment>
    );
  }

  private handleResize = () => {
    const props = this.props as AppSizeListenerWithDefaultProps;
    const { onResize, disableResizeOnMount } = props;
    const nextState = AppSizeListener.createStateFromQueries(props) as IAppSizeListenerState;

    if (!this.calledOnce && !disableResizeOnMount && onResize) {
      onResize(nextState);
    } else if (Object.keys(nextState).some(key => (this.state as IAppSizeListenerState)[key] !== nextState[key])) {
      if (this.props.onResize) {
        this.props.onResize(nextState);
      }

      this.setState(nextState);
    }

    this.calledOnce = true;
  };
}
