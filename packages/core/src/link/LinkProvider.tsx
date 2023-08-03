"use client";
import type { ForwardRefExoticComponent, ReactElement, ReactNode } from "react";
import { createContext, useContext } from "react";
import { Link } from "./Link";

/**
 * @remarks \@since 6.0.0
 */
export type CustomLinkComponent =
  | ForwardRefExoticComponent<{ href: string }>
  | ForwardRefExoticComponent<{ to: string }>
  | "a";

const context = createContext<CustomLinkComponent>(Link);
const { Provider } = context;
context.displayName = "Link";

/**
 * @remarks \@since 6.0.0
 */
export function useLink(): CustomLinkComponent {
  return useContext(context);
}

/**
 * @remarks \@since 6.0.0
 */
export interface LinkProviderProps {
  /**
   * @defaultValue `useLink() ?? Link`
   */
  value?: CustomLinkComponent;
  children: ReactNode;
}

/**
 * **Client Component**
 *
 * @remarks \@since 6.0.0
 */
export function LinkProvider(props: LinkProviderProps): ReactElement {
  const { value, children } = props;
  const inherited = useLink();

  return <Provider value={value ?? inherited}>{children}</Provider>;
}
