import * as React from "react";
import { ResizeListener } from "@react-md/listeners";

export type DeviceDetect = () => boolean;

export type ApplicationSize =
  | "phone"
  | "tablet"
  | "desktop"
  | "portrait-phone"
  | "landscape-phone"
  | "portrait-tablet"
  | "landscape-tablet"
  | "desktop-tablet"
  | "desktop-phone";

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

export interface IAppSizeProps {
  isPhone?: DeviceDetect;
  isPortraitPhone?: DeviceDetect;
  isLandscapePhone?: DeviceDetect;
  isTablet?: DeviceDetect;
  isPortraitTablet?: DeviceDetect;
  isLandscapeTablet?: DeviceDetect;
  isDesktop?: DeviceDetect;
  tabletMinWidth?: number;
  desktopMinWidth?: number;
  defaultSize?: ApplicationSize;
  children?: (sizing: IAppSize) => React.ReactNode;
  onLayoutChange?: (sizing: IAppSize) => void;
}

export interface IAppSizeDefaultProps {
  defaultSize: ApplicationSize;
  tabletMinWidth: number;
  desktopMinWidth: number;
}

export type AppSizeWithDefaultProps = IAppSizeProps & IAppSizeDefaultProps;

export default class AppSize extends React.Component<IAppSizeProps, IAppSize> {
  public static defaultProps: IAppSizeDefaultProps = {
    defaultSize: "desktop",
    tabletMinWidth: 768,
    desktopMinWidth: 1025,
  };

  constructor(props: IAppSizeProps) {
    super(props);

    const { defaultSize } = props as AppSizeWithDefaultProps;
    const isPortraitPhone = defaultSize === "portrait-phone";
    const isLandscapePhone = defaultSize === "landscape-phone";
    const isPortraitTablet = defaultSize === "portrait-tablet";
    const isLandscapeTablet = defaultSize === "landscape-tablet";
    const isDesktopPhone = defaultSize === "desktop-phone";
    const isDesktopTablet = defaultSize === "desktop-tablet";
    this.state = {
      isPhone: defaultSize === "phone" || isPortraitPhone || isLandscapePhone,
      isTablet: defaultSize === "tablet" || isPortraitTablet || isLandscapeTablet,
      isDesktop: defaultSize === "desktop" || isDesktopPhone || isDesktopTablet,
      isPortraitPhone,
      isLandscapePhone,
      isPortraitTablet,
      isLandscapeTablet,
      isDesktopPhone,
      isDesktopTablet,
    };
  }

  public shouldComponentUpdate(nextProps: IAppSizeProps) {
    if (nextProps.children) {
      return true;
    }

    return false;
  }

  public render() {
    const { children } = this.props;
    const listener = <ResizeListener key="listener" onResize={this.handleResize} />;
    if (children) {
      return (
        <React.Fragment>
          {listener}
          {children(this.state)}
        </React.Fragment>
      );
    }

    return listener;
  }

  private handleResize = (event: Event) => {
    const { tabletMinWidth, desktopMinWidth } = this.props as AppSizeWithDefaultProps;
    const phoneMedia = `screen and (max-width: ${tabletMinWidth - 1}px)`;
    const tabletMedia = `screen and (min-width: ${tabletMinWidth}px) and (max-width: ${desktopMinWidth -
      1}px)`;
    const desktopMedia = `screen and (min-device-width: ${desktopMinWidth}px)`;

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
    const nextState: IAppSize = {
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

    // @ts-ignore
    if (Object.keys(nextState).some(key => this.state[key] !== nextState[key])) {
      if (this.props.onLayoutChange) {
        this.props.onLayoutChange(nextState);
      }

      this.setState(nextState);
    }
  };
}
