"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";

const context = createContext(false);
const { Provider } = context;
context.displayName = "Ssr";

/**
 * @remarks \@since 6.0.0
 */
export function useSsr(): boolean {
  return useContext(context);
}

/**
 * @remarks \@since 6.0.0
 */
export interface SsrProviderProps {
  ssr?: boolean;
  children: ReactNode;
}

/**
 * **Client Component**
 *
 * @remarks \@since 6.0.0
 */
export function SsrProvider(props: SsrProviderProps): ReactElement {
  const { ssr = false, children } = props;
  const [isSsr, setSsr] = useState(ssr);
  useEffect(() => {
    setSsr(false);
  }, []);
  return <Provider value={isSsr}>{children}</Provider>;
}
