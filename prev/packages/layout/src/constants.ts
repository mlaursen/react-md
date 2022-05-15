import type { CSSTransitionClassNames } from "@react-md/transition";
import type {
  SupportedPhoneLayout,
  SupportedTabletLayout,
  SupportedWideLayout,
} from "./types";

export const DEFAULT_PHONE_LAYOUT: SupportedPhoneLayout = "temporary";
export const DEFAULT_TABLET_LAYOUT: SupportedTabletLayout = "toggleable";
export const DEFAULT_LANDSCAPE_TABLET_LAYOUT: SupportedTabletLayout =
  "toggleable";
export const DEFAULT_DESKTOP_LAYOUT: SupportedWideLayout = "full-height";

export const DEFAULT_LAYOUT_MAIN_CLASSNAMES: Readonly<CSSTransitionClassNames> =
  {
    enter: "rmd-layout-transition--enter",
    enterActive: "rmd-layout-main--nav-offset",
    enterDone: "rmd-layout-main--nav-offset",
    exit: "rmd-layout-transition--exit",
  };

export const DEFAULT_LAYOUT_NAV_TOGGLE_CLASSNAMES: Readonly<CSSTransitionClassNames> =
  {
    enter: "rmd-layout-transition--enter",
    enterActive: "rmd-layout-nav-toggle--offset",
    enterDone: "rmd-layout-nav-toggle--offset",
    exit: "rmd-layout-transition--exit",
  };

/** @deprecated \@since 5.1.3 use `DEFAULT_LAYOUT_NAV_TOGGLE_CLASSNAMES` instead */
export const DEFFAULT_LAYOUT_NAV_TOGGLE_CLASSNAMES =
  DEFAULT_LAYOUT_NAV_TOGGLE_CLASSNAMES;
