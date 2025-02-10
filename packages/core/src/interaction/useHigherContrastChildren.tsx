import { Children, type ReactNode } from "react";

import { INTERACTION_CONFIG } from "./config.js";

/**
 * This hook is used to wrap any `number` and `string` children with a `<span>`
 * so that the ripple/hover/focus background colors do not cause the text to
 * become dimmed.
 *
 * If the {@link INTERACTION_CONFIG.higherContrast} is set to `false`, this hook
 * will just return the `children` unmodified.
 *
 * Note: This should generally be used with the {@link useElementInteraction}
 * hook.
 *
 * @example Simple Example
 * ```tsx
 * import { useElementInteraction } from "@react-md/core/interaction/useElementInteraction";
 * import { useHigherContrastChildren, } from "@react-md/core/interaction/useHigherContrastChildren";
 * import {
 *   type ButtonHTMLAttributes,
 *   type ReactElement,
 *   type ReactNode,
 * } from "react";
 *
 * function Example(props: ButtonHTMLAttributes<HTMLButtonElement>): ReactElement {
 *   const {
 *     children: propChildren,
 *     disabled = false,
 *     onClick,
 *     onKeyDown,
 *     onKeyUp,
 *     onMouseDown,
 *     onMouseUp,
 *     onMouseLeave,
 *     onTouchStart,
 *     onTouchEnd,
 *     onTouchMove,
 *     ...remaining
 *   } = props;
 *   const { pressedClassName, ripples, handlers } =
 *     useElementInteraction({
 *       disabled,
 *       onClick,
 *       onKeyDown,
 *       onKeyUp,
 *       onMouseDown,
 *       onMouseUp,
 *       onMouseLeave,
 *       onTouchStart,
 *       onTouchEnd,
 *       onTouchMove,
 *     });
 *
 *   const children = useHigherContrastChildren(propChildren)
 *
 *   return (
 *     <button {...remaining} {...handlers} className={pressedClassName}>
 *       {children}
 *       {ripples}
 *     </button>
 *   );
 * }
 * ```
 *
 * @param children - The children to conditionally wrap in spans.
 * @param disable - Manually disable this functionality even if the higher
 * contrast mode is enabled. This is really used within `ListItem`s so there
 * aren't unneeded `<span>`s for string/number children when there are addons.
 * @returns the children to render
 * @since 6.0.0
 * @internal
 */
export function useHigherContrastChildren(
  children: ReactNode,
  disable = false
): ReactNode {
  if (!INTERACTION_CONFIG.higherContrast || disable) {
    return children;
  }

  // Note: This will fail if the child is wrapped in a Fragment, but that use
  // case doesn't matter to me
  return Children.map(children, (child) => {
    const t = typeof child;
    if (t === "string" || t === "number") {
      return <span>{child}</span>;
    }

    return child;
  });
}
