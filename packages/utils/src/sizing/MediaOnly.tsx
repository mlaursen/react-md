import { ReactElement } from "react";

import { useAppSize } from "./useAppSize";

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

/**
 * A simple component that will render the children only when the app is
 * considered in mobile mode via the `AppSizeContext`. A mobile view will be
 * true for both phones and tablets.
 */
export function MobileOnly({
  children,
  fallback = null,
}: MediaOnlyProps): ReactElement | null {
  const { isPhone, isTablet } = useAppSize();
  if (isPhone || isTablet) {
    return children;
  }

  return fallback;
}

/**
 * A simple component that will render the children only when the app is
 * considered in phone mode via the `AppSizeContext`.
 */
export function PhoneOnly({
  children,
  fallback = null,
}: MediaOnlyProps): ReactElement | null {
  const { isPhone } = useAppSize();
  if (isPhone) {
    return children;
  }

  return fallback;
}

/**
 * A simple component that will render the children only when the app is
 * considered in tablet mode via the `AppSizeContext`.
 */
export function TabletOnly({
  children,
  fallback = null,
}: MediaOnlyProps): ReactElement | null {
  const { isTablet } = useAppSize();
  if (isTablet) {
    return children;
  }

  return fallback;
}

/**
 * A simple component that will render the children only when the app is
 * considered in desktop mode via the `AppSizeContext`.
 */
export function DesktopOnly({
  children,
  fallback = null,
}: MediaOnlyProps): ReactElement | null {
  const { isDesktop } = useAppSize();
  if (isDesktop) {
    return children;
  }

  return fallback;
}
