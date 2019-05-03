import { createContext, useContext, useEffect } from "react";
import {
  AppSize,
  useAppSizeContext as useAppSizeContextRMD,
} from "@react-md/sizing";
import { useToggle } from "@react-md/utils";

export const DefaultSize = createContext<AppSize>({
  isPhone: false,
  isTablet: false,
  isDesktop: true,
  isLargeDesktop: true,
  isLandscape: true,
});

let listener = false;

/**
 * This is a pretty bad hack to be honest... Since we can't guarentee that the
 * server side app size detection is correct for desktop and large desktops,
 * this is a way to make sure the initial SSR is used for hydration and will
 * re-render afterwords with the correct sizes. If this isn't done, the entire
 * app will be unmounted and broken.
 *
 * Some side notes:
 * - switching from Fragment to a <span> for some components made it so the
 *   entire app wasn't unmounted. I guess it stops unmounting at the last
 *   parent node.
 * - I might need to rethink the whole app size stuff for SSR since this
 *   is a terrible workaround
 */
export default function useAppSizeContext() {
  const defaultSize = useContext(DefaultSize);
  const currentSize = useAppSizeContextRMD();
  const { toggle, toggled } = useToggle(false);
  useEffect(() => {
    if (typeof window === "undefined" || listener) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      listener = true;
      toggle();
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return toggled ? currentSize : defaultSize;
}
