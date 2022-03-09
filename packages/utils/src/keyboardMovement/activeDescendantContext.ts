import type { Dispatch, SetStateAction } from "react";
import { createContext, useContext } from "react";

/**
 * @remarks \@since 5.0.0
 * @internal
 */
export interface ActiveDescendantContext {
  activeId: string;
  setActiveId: Dispatch<SetStateAction<string>>;
}

/**
 * @remarks \@since 5.0.0
 * @internal
 */
const context = createContext<ActiveDescendantContext>({
  activeId: "",
  setActiveId() {
    throw new Error(
      "ActiveDescendantMovementProvider must be a parent component."
    );
  },
});
context.displayName = "ActiveDescendant";

/**
 * @remarks \@since 5.0.0
 * @internal
 */
export const { Provider: ActiveDescendantContextProvider } = context;

/**
 * @remarks \@since 5.0.0
 * @internal
 */
export function useActiveDescendantContext(): Readonly<ActiveDescendantContext> {
  return useContext(context);
}
