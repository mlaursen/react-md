import { createContext, useContext } from "react";

export const InheritContext = createContext(false);

export interface AppBarColorInherit {
  /**
   * Boolean if this component should inherit the base color provided by the `AppBar`.
   * When this value is omitted, this will be enabled when the theme is not `"clear"` and
   * not `"default"`
   */
  inheritColor?: boolean;
}

/**
 * This is probably a bit overkill... but this is used so that all the AppBar child components
 * can automatically inherit the base color as needed within an AppBar. If the `inheritColor`
 * prop was provided to the component, that value will be used instead.
 *
 * @param inheritColor The prop inheritColor for the component
 * @return true if the color should be inherited.
 */
export function useInheritContext(inheritColor: boolean | undefined) {
  const inheritContext = useContext(InheritContext);
  return typeof inheritColor === "boolean" ? inheritColor : inheritContext;
}
