import type { ReactElement, ReactNode } from "react";
import { useMemo } from "react";
import type { ActiveDescendantContext } from "./activeDescendantContext";
import { ActiveDescendantContextProvider } from "./activeDescendantContext";

/**
 * @internal
 * @remarks \@since 5.0.0
 */
export interface ActiveDescendantMovementProviderProps
  extends ActiveDescendantContext {
  children: ReactNode;
}

/**
 * This component should be used with the {@link KeyboardMovementProvider}
 * component to implement custom keyboard focusable behavior using
 * `aria-activedescendant`.
 *
 * @example
 * Base Example
 * ```tsx
 * function Descendant({ id, children, ...props }: HTMLAttributes<HTMLDivElement>): ReactElement {
 *   const { ref, active } = useActiveDescendant({ id });
 *   return (
 *     <div
 *       {...props}
 *       id={id}
 *       ref={ref}
 *       role="option"
 *       tabIndex={-1}
 *       className={active ? "active" : undefined}
 *     >
 *       {children}
 *     </div>
 *   );
 * }
 *
 * function CustomFocus(): ReactElement {
 *   const { providerProps, focusIndex, ...containerProps } =
 *     useActiveDescendantFocus()
 *
 *   return (
 *     <ActiveDescendantMovementProvider>
 *       <div
 *         {...containerProps}
 *         id="some-unique-id"
 *         role="listbox"
 *         tabIndex={0}
 *       >
 *         <Descendant id="some-descendant-id">
 *           Some Option
 *         </Descendant>
 *       </div>
 *      </ActiveDescendantMovementProvider>
 *   );
 * }
 *
 * function Example() {
 *   return (
 *     <KeyboardMovementProvider loopable searchable>
 *       <CustomFocus />
 *     </KeyboardMovementProvider>
 *   );
 * }
 * ```
 *
 * @see https://www.w3.org/TR/wai-aria-practices/#kbd_focus_activedescendant
 * @internal
 * @remarks \@since 5.0.0
 */
export function ActiveDescendantMovementProvider({
  children,
  activeId,
  setActiveId,
}: ActiveDescendantMovementProviderProps): ReactElement {
  return (
    <ActiveDescendantContextProvider
      value={useMemo(
        () => ({
          activeId,
          setActiveId,
        }),
        [activeId, setActiveId]
      )}
    >
      {children}
    </ActiveDescendantContextProvider>
  );
}
