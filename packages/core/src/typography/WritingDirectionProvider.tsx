"use client";
import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { type UseStateInitializer } from "../types.js";

/**
 * Note: unlike the `dir` DOM attribute, the `"auto"` value is not supported.
 *
 * @since 6.0.0
 */
export type Dir = "ltr" | "rtl";

/** @since 6.0.0 */
export type DefaultDir = UseStateInitializer<Dir>;

/** @since 2.3.0 */
export interface WritingDirectionContext {
  /**
   * The current writing direction that is being inherited.
   */
  dir: Dir;

  /**
   * Toggles the current writing direction for the first parent `Dir` component.
   */
  toggleDir(): void;
}

/** @internal */
interface InheritableContext extends WritingDirectionContext {
  root: boolean;
}

const context = createContext<InheritableContext>({
  root: true,
  dir: "ltr",
  toggleDir: () => {
    if (process.env.NODE_ENV !== "production") {
      throw new Error(
        "Tried to toggle the current writing direction without initializing the `Dir` component."
      );
    }
  },
});
context.displayName = "WritingDirection";
const { Provider } = context;

/**
 * Gets the writing direction context which provides access to the current `dir`
 * and a `toggleDir` function.
 *
 * @example Manually Changing the Writing Direction
 * ```tsx
 * import { useDir } from "@react-md/core";
 *
 * function Example() {
 *   const { dir, toggleDir } = useDir();
 *
 *   return (
 *     <>
 *       <p>{`The current dir is: "${dir}"`}</p>
 *       <button type="button" onClick={toggleDir}>Toggle</button>
 *     </>
 *   );
 * }
 * ```
 *
 * @since 6.0.0
 */
export function useDir(): Readonly<WritingDirectionContext> {
  const { root: _root, ...current } = useContext(context);
  return current;
}

/** @since 6.0.0 */
export interface WritingDirectionProviderProps {
  /**
   * A single ReactElement child. If the `WritingDirection` has a parent
   * `WritingDirection`, the child will have the `dir` prop cloned into this
   * element.
   */
  children: ReactElement<{ dir?: Dir }> | ReactNode;

  /**
   * The default writing direction for your app or a subtree. To change the
   * current writing direction, use the `useDir` hook to get access to the
   * current `dir` and the `toggleDir` function.
   *
   * @defaultValue `"ltr"`
   * @see {@link DEFAULT_WRITING_DIRECTION}
   */
  defaultDir?: DefaultDir;
}

/**
 * In the browser, this will default to the `<html>`'s `dir` value if one
 * exists. If the `dir` attribute does not exist, it will default to `"ltr"`.
 *
 * In node environments, this will default to `"ltr"`.
 *
 * @since 6.0.0 Renamed from `DEFAULT_DIR`
 */
export const DEFAULT_WRITING_DIRECTION = (): Dir => {
  let dir: Dir = "ltr";
  if (typeof document !== "undefined") {
    const rootDir = document.documentElement.getAttribute("dir");
    dir = rootDir === "rtl" ? "rtl" : "ltr";
  }

  return dir;
};

/**
 * **Client Component**
 *
 * The `WritingDirection` component is used to handle the current writing
 * direction within your app as well as conditionally updating the writing
 * direction for small sections in your app. When this component is used for the
 * first time near the root of your React component tree, the current direction
 * will be applied to the root `<html>` element. Otherwise the current dir will
 * be cloned into the child element so it can be passed as a prop.
 *
 * Note: Since the `dir` is cloned into the child element, you need to make sure
 * that the child is either a DOM element or the `dir` prop is passed from your
 * custom component.
 *
 * @example Root Setup
 * ```tsx
 * import { createRoot } from "react-dom/client";
 * import { WritingDirection } from "@react-md/core";
 * import App from "./App.js":
 *
 * const container = document.getElementById("root");
 * const root = createRoot(container);
 *
 * root.render(
 *   <WritingDirection>
 *     <App />
 *   </WritingDirection>
 * );
 * ```
 *
 * @example Supporting RTL Languages
 * ```tsx
 * import { createRoot } from "react-dom/client";
 * import { WritingDirection } from "@react-md/core";
 * import type { Dir } from "@react-md/core";
 * import App from "./App.js":
 *
 * const container = document.getElementById("root");
 * const root = createRoot(container);
 *
 * // see https://meta.wikimedia.org/wiki/Template:List_of_language_names_ordered_by_code
 * const SUPPORTED_RTL_LANGUAGES = [
 *   "ar",
 *   "arc",
 *   "ckb",
 *   "dv",
 *   "fa",
 *   "ha",
 *   "he",
 *   "khw",
 *   "ks",
 *   "ps",
 *   "sd",
 *   "ur",
 *   "uz_AF",
 *   "ti",
 * ];
 *
 * const defaultDir = (): Dir => {
 *   if (SUPPORTED_RTL_LANGUAGES.includes(navigator.language)) {
 *     return "rtl"
 *   }
 *
 *   return "ltr";
 * }
 *
 * root.render(
 *   <WritingDirection defaultDir={defaultDir}>
 *     <App />
 *   </WritingDirection>
 * );
 * ```
 *
 * @since 6.0.0 Renamed from `Dir`
 */
export function WritingDirectionProvider(
  props: WritingDirectionProviderProps
): ReactElement {
  const { children, defaultDir = DEFAULT_WRITING_DIRECTION } = props;
  const { root } = useContext(context);
  const [dir, setDir] = useState(defaultDir);
  useEffect(() => {
    if (!root || typeof document === "undefined") {
      return;
    }

    document.documentElement.setAttribute("dir", dir);

    return () => {
      document.documentElement.removeAttribute("dir");
    };
  }, [dir, root]);

  const toggleDir = useCallback(() => {
    setDir((prevDir) => (prevDir === "ltr" ? "rtl" : "ltr"));
  }, []);

  const value = useMemo<InheritableContext>(
    () => ({ root: false, dir, toggleDir }),
    [dir, toggleDir]
  );
  let child = Children.only(children);
  if (!root && isValidElement<{ dir: Dir }>(child)) {
    child = cloneElement(child, { dir });
  }

  return <Provider value={value}>{child}</Provider>;
}
