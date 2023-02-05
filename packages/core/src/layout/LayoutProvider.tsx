import type { ReactElement, ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { AppBarPosition } from "../app-bar";
import { useAppSize } from "../AppSizeProvider";
import { useEnsuredId } from "../useEnsuredId";
import {
  DEFAULT_DESKTOP_LAYOUT,
  DEFAULT_LANDSCAPE_TABLET_LAYOUT,
  DEFAULT_PHONE_LAYOUT,
  DEFAULT_TABLET_LAYOUT,
} from "./constants";
import type { LayoutConfiguration, SupportedWideLayout } from "./types";
import {
  getLayoutType,
  isMiniLayout,
  isPersistentLayout,
  isToggleableLayout,
} from "./utils";

/** @internal */
const noop = (): void => {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== "production") {
    throw new Error("The `LayoutProvider` has not been mounted.");
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
   * @remarks
   * \@since 2.8.3
   * \@since 6.0.0 Changed to be a type union of position types
   */
  appBarPosition: AppBarPosition;

  /**
   * Boolean if one of the layout types are mini. This is mostly used internally
   * to prevent the `<main>` element from unmounting (and losing state) for
   * non-fixed app bar layouts.
   *
   * @remarks \@since 2.9.1
   */
  isMiniable: boolean;
}

const context = createContext<LayoutContext>({
  baseId: "layout",
  layout: "temporary",
  visible: false,
  showNav: noop,
  hideNav: noop,
  appBarPosition: "fixed",
  isMiniable: false,
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
   *
   * @remarks \@since 6.0.0 This prop is optional
   * @defaultValue `layout-${useId()}`
   */
  baseId?: string;

  /**
   * The children to render that can inherit the current layout.
   */
  children: ReactNode;

  /**
   * @see {@link LayoutContext.appBarPosition}
   * @defaultValue `true`
   */
  appBarPosition?: AppBarPosition;
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
export function LayoutProvider(props: LayoutProviderProps): ReactElement {
  const {
    baseId: propBaseId,
    phoneLayout = DEFAULT_PHONE_LAYOUT,
    tabletLayout = DEFAULT_TABLET_LAYOUT,
    landscapeTabletLayout = DEFAULT_LANDSCAPE_TABLET_LAYOUT,
    desktopLayout = DEFAULT_DESKTOP_LAYOUT,
    largeDesktopLayout = desktopLayout,
    defaultToggleableVisible = false,
    appBarPosition = "fixed",
    children,
  } = props;
  const appSize = useAppSize();
  const layout = getLayoutType({
    appSize,
    phoneLayout,
    tabletLayout,
    landscapeTabletLayout,
    desktopLayout,
    largeDesktopLayout,
  });
  const isMiniable = [
    phoneLayout,
    tabletLayout,
    landscapeTabletLayout,
    desktopLayout,
    largeDesktopLayout,
  ].some((layout) => !!layout && isMiniLayout(layout));
  const baseId = useEnsuredId(propBaseId, "layout");

  const { isDesktop, isLargeDesktop } = appSize;
  const [visible, setVisible] = useState(
    (isPersistentLayout(layout) && (isDesktop || isLargeDesktop)) ||
      isToggleableVisible(defaultToggleableVisible, layout)
  );

  useEffect(() => {
    setVisible(
      isPersistentLayout(layout) ||
        isToggleableVisible(defaultToggleableVisible, layout)
    );
  }, [defaultToggleableVisible, layout]);

  const showNav = useCallback(() => {
    setVisible(true);
  }, []);

  const hideNav = useCallback(() => {
    if (!isPersistentLayout(layout)) {
      setVisible(false);
    }
  }, [layout]);

  const value = useMemo<LayoutContext>(
    () => ({
      baseId,
      layout,
      visible,
      showNav,
      hideNav,
      appBarPosition,
      isMiniable,
    }),
    [baseId, layout, visible, showNav, hideNav, appBarPosition, isMiniable]
  );

  return <Provider value={value}>{children}</Provider>;
}
