import { Children } from "react";
import type { ReactNode } from "react";
import { useElementInteractionContext } from "./ElementInteractionProvider";

/**
 * This hook is used to wrap any `number` and `string` children with a `<span>`
 * so that the ripple/hover/focus background colors do not cause the text to
 * become dimmed.
 *
 * If the {@link ElementInteractionProviderProps.disableHigherContrast} is set
 * to `true`, this hook will just return the `children` unmodified.
 *
 * Note: This should generally be used with the {@link useElementInteraction}
 * hook.
 *
 * @example
 * Simple Example
 * ```tsx
 * import {
 *   RippleContainer,
 *   useElementInteraction,
 *   useHigherContrastChildren,
 * } from "@react-md/core";
 * import type { ButtonHTMLAttributes, ReactElement, ReactNode } from "react";
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
 *   const { pressedClassName, rippleContainerProps, handlers } =
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
 *       <RippleContainer {...rippleContainerProps} />
 *     </button>
 *   );
 * }
 * ```
 *
 * @param propChildren - The children to conditionally wrap in spans.
 * @param disable - Manually disable this functionality even if the higher
 * contrast mode is enabled. This is really used within `ListItem`s so there
 * aren't unneeded `<span>`s for string/number children when there are addons.
 * @returns the children to render
 * @remarks \@since 6.0.0
 * @internal
 */
export function useHigherContrastChildren(
  propChildren: ReactNode,
  disable = false
): ReactNode {
  const { higherContrast } = useElementInteractionContext();
  if (!higherContrast || disable) {
    return propChildren;
  }

  // Note: This will fail if the child is wrapped in a Fragment, but that use
  // case doesn't matter to me
  return Children.map(propChildren, (child) => {
    const t = typeof child;
    if (t === "string" || t === "number") {
      return <span>{child}</span>;
    }

    return child;
  });
}
