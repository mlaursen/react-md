import { useState, useEffect, useCallback } from "react";
import { useAppSizeContext } from "@react-md/utils";

import getLayout from "./getLayout";
import { LayoutConfiguration } from "./types";

/**
 * @private
 */
interface ReturnValue {
  showNav: () => void;
  hideNav: () => void;
  isNavVisible: boolean;
  isFullHeight: boolean;
  isPersistent: boolean;
}

/**
 *
 * @private
 */
export default function useLayout({
  phoneLayout,
  tabletLayout,
  landscapeTabletLayout,
  desktopLayout,
  largeDesktopLayout,
}: LayoutConfiguration): ReturnValue {
  const appSize = useAppSizeContext();
  const layout = getLayout({
    appSize,
    phoneLayout,
    tabletLayout,
    landscapeTabletLayout,
    desktopLayout,
    largeDesktopLayout,
  });

  const { isDesktop } = appSize;
  const isFullHeight = layout === "full-height";
  const isPersistent =
    isFullHeight || layout === "clipped" || layout === "floating";

  const [visible, setVisible] = useState(isPersistent && isDesktop);

  useEffect(() => {
    if (visible !== isPersistent) {
      setVisible(isPersistent);
    }

    // only want this to be fired when the layout changes to ensure that
    // the visiiblity is updated
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPersistent]);

  const showNav = useCallback(() => {
    setVisible(true);
  }, []);

  const hideNav = useCallback(() => {
    setVisible(false);
  }, []);

  return {
    showNav,
    hideNav,
    isNavVisible: visible,
    isFullHeight,
    isPersistent,
  };
}
