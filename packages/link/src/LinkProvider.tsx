import type { ForwardRefExoticComponent, ReactElement, ReactNode } from "react";
import { createContext, useContext } from "react";
import { Link } from "./Link";

export type CustomLinkComponent =
  | ForwardRefExoticComponent<{ href: string }>
  | ForwardRefExoticComponent<{ to: string }>
  | "a";

const context = createContext<CustomLinkComponent>(Link);
const { Provider } = context;
context.displayName = "Link";

export function useLink(): CustomLinkComponent {
  return useContext(context);
}

export interface LinkProviderProps {
  link?: CustomLinkComponent;
  children: ReactNode;
}

export function LinkProvider(props: LinkProviderProps): ReactElement {
  const { link = Link, children } = props;

  return <Provider value={link}>{children}</Provider>;
}
