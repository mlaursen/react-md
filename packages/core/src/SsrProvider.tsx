import type { ReactElement, ReactNode } from "react";
import { createContext, useContext, useEffect, useRef } from "react";
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
