import type { ReactElement } from "react";
import { Children, cloneElement } from "react";
import cn from "classnames";

import type {
  CollapseElementProps,
  CollapseTransitionHookOptions,
} from "./useCollapseTransition";
import { useCollapseTransition } from "./useCollapseTransition";

/**
 * @typeParam E - An HTMLElement type used for the ref required for the
 * transition.
 * @remarks \@since 2.0.0
 * @remarks \@since 4.0.0 Updated for the new CSS Transition API.
 */
export interface CollapseProps<E extends HTMLElement>
  extends Omit<CollapseTransitionHookOptions<E>, "transitionIn"> {
  /**
   * The child element that should have a `ref` and the `style`, `className` and
   * `hidden` props cloned into using the `cloneElement` API. If the child is a
   * custom component, you **must** use `React.forwardRef` and pass the `ref`
   * and the other props for the transition to work correctly.
   */
  children: ReactElement<CollapseElementProps<E>>;

  /**
   * Boolean if the element should be collapsed.
   *
   * @see {@link CollapseTransitionHookOptions.transitionIn}
   */
  collapsed: boolean;
}

/**
 * This is a component implementation of the {@link useCollapseTransition} hook
 * that implements the `temporary` behavior. Since this component uses the
 * `React.cloneElement` to inject the `ref` and `className` into the `children`,
 * it is recommended to use the hook instead.
 *
 * @example
 * Simple Example
 * ```tsx
 * function Example(): ReactElement {
 *   const [collapsed, setCollapsed] = useState(true);
 *
 *   return (
 *     <>
 *       <Button onClick={() => setCollapsed(!collapsed)}>
 *         Toggle
 *       </Button>
 *       <Collapse collapsed={collapsed}>
 *         <div>
 *           Some content that should only be visible while not collapsed.
 *         </div>
 *       </Collapse>
 *     </>
 *   );
 * }
 * ```
 *
 * @see {@link useCollapseTransition} for additional examples
 * @typeParam E - An HTMLElement type used for the ref required for the
 * transition.
 * @remarks \@since 2.0.0
 * @remarks \@since 4.0.0 Updated for the new CSS Transition API.
 */
export function Collapse<E extends HTMLElement>({
  children,
  collapsed,
  className,
  ...options
}: CollapseProps<E>): ReactElement | null {
  const child = Children.only(children);
  const { elementProps, rendered } = useCollapseTransition({
    ...options,
    className: cn(child.props.className, className),
    transitionIn: !collapsed,
  });

  if (!rendered) {
    return null;
  }

  return cloneElement(children, elementProps);
}
