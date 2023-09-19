"use client";
import { useAppSize } from "@react-md/core";
import type { ReactElement, ReactNode } from "react";

export interface MediaQueryProps {
  is?: "phone" | "tablet" | "desktop" | "large-desktop";
  atLeast?: "tablet" | "desktop";
  children: ReactNode;
}

// interface IsAtLeastProps {
//   atLeast: "tablet" | "desktop";
//   children: ReactNode;
// }

// interface IsProps {
//   is: "phone" | "tablet" | "desktop" | "large-desktop";
//   children: ReactNode;
// }

// type MediaQueryProps = Partial<IsAtLeastProps & IsProps> & {
//   children: ReactNode;
// };

export function MediaQuery(
  props: MediaQueryProps & {
    is: "phone" | "tablet" | "desktop" | "large-desktop";
    atLeast?: never;
  }
): ReactElement | null;
export function MediaQuery(
  props: MediaQueryProps & { is?: never; atLeast: "tablet" | "desktop" }
): ReactElement | null;
export function MediaQuery({
  children,
  is,
  atLeast,
}: MediaQueryProps): ReactElement | null {
  const { isPhone, isDesktop, isTablet, isLargeDesktop } = useAppSize();
  let matches = false;
  if (is) {
    switch (is) {
      case "phone":
        matches = isPhone;
        break;
      case "tablet":
        matches = isTablet;
        break;
      case "desktop":
        matches = isDesktop;
        break;
      case "large-desktop":
        matches = isLargeDesktop;
        break;
    }

    // if (is === "phone" && phone || is === "tablet" && isTablet || iv=")
  } else {
    switch (atLeast) {
      case "tablet":
        matches = isTablet || isDesktop || isLargeDesktop;
        break;
      case "desktop":
        matches = isDesktop || isLargeDesktop;
        break;
    }
  }

  return <>{matches && children}</>;
}
