import React, {
  Children,
  cloneElement,
  createContext,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

/**
 * Note: unlike the `dir` DOM attribute, the `"auto"` value is not supported
 *
 * @remarks \@since 2.3.0
 */
export type WritingDirection = "ltr" | "rtl";

/**
 * @remarks \@since 2.3.0
 */
export interface WritingDirectionContext {
  /**
   * The current writing direction that is being inherited.
   */
  dir: WritingDirection;

  /**
   * Toggles the current writing direction for the first parent `Dir` component.
   */
  toggleDir(): void;
}

/**
 * @internal
 */
interface InheritableContext extends WritingDirectionContext {
  root: boolean;
}

const context = createContext<InheritableContext>({
  root: true,
  dir: "ltr",
  toggleDir: () => {
    throw new Error(
      "Tried to toggle the current writing direction without initializing the `Dir` component."
    );
  },
});
const { Provider } = context;

/**
 * Gets the writing direction context which provides access to the current `dir`
 * and a `toggleDir` function.
 *
 * @remarks \@since 2.3.0
 */
export function useDir(): WritingDirectionContext {
  const { root: _root, ...current } = useContext(context);
  return current;
}

/**
 * @remarks \@since 2.3.0
 */
export interface DirProps {
  /**
   * A single ReactElement child. If the `Dir` has a parent `Dir`, the child
   * will have the `dir` prop cloned into this element.
   */
  children: ReactElement;

  /**
   * The default writing direction for your app or a subtree. To change the
   * current writing direction, use the `useDir` hook to get access to the
   * current `dir` and the `toggleDir` function.
   */
  defaultDir?: WritingDirection | (() => WritingDirection);
}

/**
 * @remarks \@since 2.3.0
 */
export const DEFAULT_DIR = (): WritingDirection => {
  let dir: WritingDirection = "ltr";
  if (typeof document !== "undefined") {
    const rootDir = document.documentElement.getAttribute("dir");
    dir = rootDir === "rtl" ? "rtl" : "ltr";
  }

  return dir;
};

/**
 * The `Dir` component is used to handle the current writing direction within
 * your app as well as conditionally updating the writing direction for small
 * sections in your app. When this component is used for the first time near the
 * root of your React component tree, the current direction will be applied to
 * the root `<html>` element. Otherwise the current dir will be cloned into the
 * child element so it can be passed as a prop.
 *
 * ```tsx
 * // html element will be updated to have `dir="ltr"`
 * ReactDOM.render(<Dir><App /></Dir>, root)
 * ```
 *
 * ```tsx
 * // html element will be updated to have `dir="rtl"` while the `<span>` will
 * // now be `<span dir="ltr">`
 * ReactDOM.render(
 *   <Dir defaultDir="rtl">
 *     <Some>
 *       <Other>
 *         <Components>
 *           <Dir defaultDir="ltr">
 *             <span>Content</span>
 *           </Dir>
 *         </Components>
 *       </Other>
 *     </Some>
 *   </Dir>,
 *   root
 * );
 * ```
 *
 * Note: Since the `dir` is cloned into the child element, you need to make sure
 * that the child is either a DOM element or the `dir` prop is passed from your
 * custom component.
 *
 * @remarks \@since 2.3.0
 */
export function Dir({
  children,
  defaultDir = DEFAULT_DIR,
}: DirProps): ReactElement {
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
  if (!root) {
    child = cloneElement(child, { dir });
  }

  return <Provider value={value}>{child}</Provider>;
}

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  context.displayName = "WritingDirection";

  try {
    const PropTypes = require("prop-types");

    Dir.propTypes = {
      children: PropTypes.element.isRequired,
      defaultDir: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.oneOf(["ltr", "rtl"]),
      ]),
    };
  } catch (e) {}
}
