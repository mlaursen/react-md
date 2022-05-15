import type { ReactNode, ReactElement } from "react";
import { createContext, useContext, useMemo } from "react";
import createIdGenerator from "utils/createIdGenerator";

type IdGenerator = ReturnType<typeof createIdGenerator>;

const context = createContext<IdGenerator>(createIdGenerator("autoid"));
const { Provider } = context;

export function useId(id?: string): string {
  const generator = useContext(context);

  return useMemo(() => {
    if (id) {
      return id;
    }

    return generator();
  }, [id, generator]);
}

export interface IdProviderProps {
  prefix?: string;
  children: ReactNode;
}

export function IdProvider({
  children,
  prefix = "autoid",
}: IdProviderProps): ReactElement {
  const value = useMemo(() => createIdGenerator(prefix), [prefix]);

  return <Provider value={value}>{children}</Provider>;
}
