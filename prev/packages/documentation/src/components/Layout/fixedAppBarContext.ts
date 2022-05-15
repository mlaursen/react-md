import { createContext, useContext } from "react";

type Setter = (fixedElevation: boolean) => void;

const context = createContext<Setter>(() => {
  // do nothing
});

export const { Provider } = context;

export function useFixedAppBarContext(): Setter {
  return useContext(context);
}
