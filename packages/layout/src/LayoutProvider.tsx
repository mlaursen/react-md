import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
  useRef,
  ReactElement,
} from "react";
import { useAppSize } from "@react-md/utils";

import {
  DEFAULT_DESKTOP_LAYOUT,
  DEFAULT_LANDSCAPE_TABLET_LAYOUT,
  DEFAULT_PHONE_LAYOUT,
  DEFAULT_TABLET_LAYOUT,
} from "./constants";
import { LayoutConfiguration, SupportedWideLayout } from "./types";
import { getLayoutType, isPersistentLayout, isToggleableLayout } from "./utils";

/**
 * @internal
 */
const notInitialized = (name: string) => (): void => {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== "production") {
    /* eslint-disable no-console */
    console.warn(
      "Uh oh, something went wrong. Somehow the `LayoutNavigationConfiguration` context has not been initialized. " +
        `This caused the "${name}" callback to do nothing.`
    );
  }
};

export interface LayoutContext {
  /**
   * The root `id` that was passed to the `Layout` component so that `id`s can
   * be generated for child components.
   */
  baseId: string;

  /**
   * The current layout that is being used based on the app's size.
   */
  layout: SupportedWideLayout;

  /**
   * Boolean if the navigation panel is currently visible. This will always be
   * `true` for persist layout types on desktop.
   */
  visible: boolean;

  /**
   * A function that will set the `visible` state to `true`.
   */
  showNav(): void;

  /**
   * A function that will set the `visible` state to `false`.
   */
  hideNav(): void;

  /**
   * Boolean if the layout is currently using a fixed app bar which can be
   * useful for determining specific scroll or layout behavior.
   *
   * @remarks \@since 2.8.3
   */
  fixedAppBar: boolean;
}

const context = createContext<LayoutContext>({
  baseId: "layout",
  layout: "temporary",
  visible: false,
  showNav: notInitialized("showNav"),
  hideNav: notInitialized("hideNav"),
  fixedAppBar: true,
});

/**
 * Gets the current layout state and configuration.
 */
export function useLayoutConfig(): LayoutContext {
  return useContext(context);
}

const { Provider } = context;

export interface LayoutProviderProps extends LayoutConfiguration {
  /**
   * The base id for the layout component. This is required since all the child
   * components use this to generate their ids.
   */
  baseId: string;

  /**
   * The children to render that can inherit the current layout.
   */
  children: ReactNode;

  /** {@inheritDoc LayoutContext.fixedAppBar} */
  fixedAppBar?: boolean;
}

/**
 * @remarks \@since 2.6.0
 * @internal
 */
function isToggleableVisible(
  behavior: boolean | "toggleable" | "toggleable-mini",
  layout: SupportedWideLayout
): boolean {
  return typeof behavior === "string"
    ? behavior === layout
    : behavior && isToggleableLayout(layout);
}

/**
 * Determines the current layout based on the `LayoutConfiguration` and hooks
 * into the `AppSizeListener` to update on resize. This also initializes the
 * `LayLayoutContext` so that a custom layout implementation can be used along
 * with the `useLayoutConfig()` hook and the multiple `Layout` components.
 */
export function LayoutProvider({
  baseId,
  phoneLayout = DEFAULT_PHONE_LAYOUT,
  tabletLayout = DEFAULT_TABLET_LAYOUT,
  landscapeTabletLayout = DEFAULT_LANDSCAPE_TABLET_LAYOUT,
  desktopLayout = DEFAULT_DESKTOP_LAYOUT,
  largeDesktopLayout,
  defaultToggleableVisible = false,
  fixedAppBar = true,
  children,
}: LayoutProviderProps): ReactElement {
  const appSize = useAppSize();
  const layout = getLayoutType({
    appSize,
    phoneLayout,
    tabletLayout,
    landscapeTabletLayout,
    desktopLayout,
    largeDesktopLayout,
  });

  const isPersistent = isPersistentLayout(layout);

  const { isDesktop } = appSize;
  const [visible, setVisible] = useState(
    (isPersistent && isDesktop) ||
      isToggleableVisible(defaultToggleableVisible, layout)
  );
  const prevLayout = useRef(layout);
  if (prevLayout.current !== layout) {
    prevLayout.current = layout;
    const nextVisible =
      isPersistent || isToggleableVisible(defaultToggleableVisible, layout);
    if (visible !== nextVisible) {
      setVisible(nextVisible);
    }
  }

  const showNav = useCallback(() => {
    setVisible(true);
  }, []);

  const hideNav = useCallback(() => {
    if (!isPersistentLayout(layout)) {
      setVisible(false);
    }
  }, [layout]);

  const value = useMemo(
    () => ({
      baseId,
      layout,
      visible,
      showNav,
      hideNav,
      fixedAppBar,
    }),
    [baseId, layout, visible, showNav, hideNav, fixedAppBar]
  );

  return <Provider value={value}>{children}</Provider>;
}

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    context.displayName = "Layout";

    const PropTypes = require("prop-types");
    const phoneLayouts = ["temporary", "temporary-mini"];
    const tabletLayouts = [...phoneLayouts, "toggleable", "toggleable-mini"];
    const wideLayouts = [
      ...tabletLayouts,
      "clipped",
      "floating",
      "full-height",
    ];

    LayoutProvider.propTypes = {
      baseId: PropTypes.string.isRequired,
      children: PropTypes.node.isRequired,
      phoneLayout: PropTypes.oneOf(phoneLayouts),
      tabletLayout: PropTypes.oneOf(tabletLayouts),
      landscapeTabletLayout: PropTypes.oneOf(wideLayouts),
      desktopLayout: PropTypes.oneOf(wideLayouts),
      largeDesktopLayout: PropTypes.oneOf(wideLayouts),
    };
  } catch (error) {}
}
