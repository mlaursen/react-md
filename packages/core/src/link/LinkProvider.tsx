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
   * @defaultValue `Link`
   */
  link?: CustomLinkComponent;
  children: ReactNode;
}

/**
 * @remarks \@since 6.0.0
 */
export function LinkProvider(props: LinkProviderProps): ReactElement {
  const { link = Link, children } = props;

  return <Provider value={link}>{children}</Provider>;
}
