import { createContext, useContext } from "react";

/**
 * Boolean if the child components should inherit the color of the app bar.
 * @internal
 */
export const InheritContext = createContext(false);

export interface AppBarColorInherit {
  /**
   * Boolean if this component should inherit the base color provided by the
   * `AppBar`.  When this value is omitted, this will be enabled when the theme
   * is not `"clear"` and not `"default"`
   */
  inheritColor?: boolean;
}

/**
 * This is probably a bit overkill... but this is used so that all the AppBar
 * child components can automatically inherit the base color as needed within an
 * AppBar. If the `inheritColor` prop was provided to the component, that value
 * will be used instead.
 *
 * @param inheritColor - The prop inheritColor for the component
 * @returns true if the color should be inherited.
 * @internal
 */
export function useInheritContext(inheritColor: boolean | undefined): boolean {
  const inheritContext = useContext(InheritContext);
  return typeof inheritColor === "boolean" ? inheritColor : inheritContext;
}

/**
 * Boolean if there is a parent app bar. The theme colors will be inherited from
 * the parent app bar instead of the current app bar for these cases since
 * nested app bars usually happen with prominent toolbars and the root app bar
 * defines the theme.
 *
 * @internal
 */
export const ParentContext = createContext(false);

/**
 *
 * @internal
 */
export function useParentContext(): boolean {
  return useContext(ParentContext);
}

if (process.env.NODE_ENV !== "production") {
  InheritContext.displayName = "InheritColorContext";
  ParentContext.displayName = "ParentContext";
}
