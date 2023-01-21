import type { ReactElement, ReactNode } from "react";
import {
  createContext,
  startTransition,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { NonNullRef } from "./types";

const context = createContext<NonNullRef<boolean>>({ current: false });
const { Provider } = context;
context.displayName = "Ssr";

/**
 * @internal
 * @remarks \@since 6.0.0
 */
export function useSsr(): boolean {
  return useContext(context).current;
}

/**
 * This hook is used to run effects after SSR while preventing the following error:
 *
 * ```
 * Error: This Suspense boundary received an update before it finished
 * hydrating. This caused the boundary to switch to client rendering. The usual
 * way to fix this is to wrap the original update in startTransition.
 * ```
 *
 * @internal
 * @remarks \@since 6.0.0
 */
export function useSsrRehydrate(callback?: () => void, disabled = false): void {
  const ssr = useSsr();
  const [, hydrate] = useState(0);

  useEffect(() => {
    if (!ssr || disabled) {
      return;
    }

    const cb = typeof callback === "function" ? callback : () => hydrate(1);
    startTransition(() => {
      cb();
    });
  }, [callback, ssr, disabled]);
}

/**
 * @internal
 * @remarks \@since 6.0.0
 */
export interface SsrProviderProps {
  ssr?: boolean;
  children: ReactNode;
}

/**
 * @internal
 * @remarks \@since 6.0.0
 */
export function SsrProvider(props: SsrProviderProps): ReactElement {
  const { ssr = false, children } = props;
  const ssrRef = useRef(ssr);
  useEffect(() => {
    ssrRef.current = false;
  }, []);

  return <Provider value={ssrRef}>{children}</Provider>;
}
