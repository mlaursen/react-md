import { createContext, useContext } from "react";
import { LayoutNavigationVisibility } from "./types";

/**
 * @private
 */
const noop = (name: string) => (): void => {
  if (process.env.NODE_ENV !== "production") {
    /* eslint-disable no-console */
    console.warn(
      "Uh oh, something went wrong. Somehow the `LayoutNavigationConfiguration` context has not been initialized. " +
        `This caused the "${name}" callback to do nothing.`
    );
  }
};

const context = createContext<LayoutNavigationVisibility>({
  // "mobile" first. ha, ha, ha
  layout: "temporary",
  showNav: noop("showNav"),
  hideNav: noop("hideNav"),
  isNavVisible: false,
  isFullHeight: false,
  isPersistent: false,
});

const { Provider } = context;

/**
 * @private
 */
export { Provider };

/**
 * A hook that provides the layout navigation context for use in custom `Layout`
 * components.
 *
 * @return the context that provides the handlers, visibility, and resolved
 * persistance of the main navigation
 */
export default function useNavigationVisibility(): LayoutNavigationVisibility {
  return useContext(context);
}
