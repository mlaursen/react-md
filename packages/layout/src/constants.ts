import { CSSTransitionClassNames } from "react-transition-group/CSSTransition";
import {
  SupportedPhoneLayout,
  SupportedTabletLayout,
  SupportedWideLayout,
} from "./types";

export const DEFAULT_PHONE_LAYOUT: SupportedPhoneLayout = "temporary";
export const DEFAULT_TABLET_LAYOUT: SupportedTabletLayout = "toggleable";
export const DEFAULT_LANDSCAPE_TABLET_LAYOUT: SupportedTabletLayout =
  "toggleable";
export const DEFAULT_DESKTOP_LAYOUT: SupportedWideLayout = "full-height";

export const DEFAULT_LAYOUT_MAIN_CLASSNAMES: CSSTransitionClassNames = {
  enter: "rmd-layout-transition--enter",
  enterActive: "rmd-layout-main--nav-offset",
  enterDone: "rmd-layout-main--nav-offset",
  exit: "rmd-layout-transition--exit",
};

export const DEFFAULT_LAYOUT_NAV_TOGGLE_CLASSNAMES: CSSTransitionClassNames = {
  enter: "rmd-layout-transition--enter",
  enterActive: "rmd-layout-nav-toggle--offset",
  enterDone: "rmd-layout-nav-toggle--offset",
  exit: "rmd-layout-transition--exit",
};
