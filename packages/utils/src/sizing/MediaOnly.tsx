import { FC, ReactElement } from "react";

import useAppSize from "./useAppSize";

export interface MediaOnlyProps {
  /**
   * The children to display.
   */
  children: ReactElement | null;

  /**
   * An optional fallback element to show when the media queries do not match.
   */
  fallback?: ReactElement | null;
}

type DefaultProps = Required<Pick<MediaOnlyProps, "fallback">>;
type WithDefaultProps = MediaOnlyProps & DefaultProps;

/**
 * A simple component that will render the children only when the app is
 * considered in mobile mode via the `AppSizeContext`. A mobile view will be
 * true for both phones and tablets.
 */
export const MobileOnly: FC<MediaOnlyProps> = (props) => {
  const { children, fallback } = props as WithDefaultProps;
  const { isPhone, isTablet } = useAppSize();
  if (isPhone || isTablet) {
    return children;
  }

  return fallback;
};

/**
 * A simple component that will render the children only when the app is
 * considered in phone mode via the `AppSizeContext`.
 */
export const PhoneOnly: FC<MediaOnlyProps> = (props) => {
  const { children, fallback } = props as WithDefaultProps;
  const { isPhone } = useAppSize();
  if (isPhone) {
    return children;
  }

  return fallback;
};

/**
 * A simple component that will render the children only when the app is
 * considered in tablet mode via the `AppSizeContext`.
 */
export const TabletOnly: FC<MediaOnlyProps> = (props) => {
  const { children, fallback } = props as WithDefaultProps;
  const { isTablet } = useAppSize();
  if (isTablet) {
    return children;
  }

  return fallback;
};

/**
 * A simple component that will render the children only when the app is
 * considered in desktop mode via the `AppSizeContext`.
 */
export const DesktopOnly: FC<MediaOnlyProps> = (props) => {
  const { children, fallback } = props as WithDefaultProps;
  const { isDesktop } = useAppSize();
  if (isDesktop) {
    return children;
  }

  return fallback;
};

const defaultProps: DefaultProps = {
  fallback: null,
};

MobileOnly.defaultProps = defaultProps;
PhoneOnly.defaultProps = defaultProps;
TabletOnly.defaultProps = defaultProps;
DesktopOnly.defaultProps = defaultProps;
