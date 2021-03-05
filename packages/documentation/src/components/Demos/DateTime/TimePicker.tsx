import {
  createContext,
  createElement,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from "react";
import type { IUtils } from "@date-io/core/IUtils";
import DateFnsUtils from "@date-io/date-fns";

const context = createContext<IUtils<any> | undefined>(undefined);

const { Provider } = context;

interface DateUtilsProviderProps {
  children: ReactNode;
  utils: IUtils<any>;
}
export function DateUtilsProvider({
  children,
  utils,
}: DateUtilsProviderProps): ReactElement {
  return createElement(Provider, { value: utils }, children);
}

export function useDateUtils<TDate>(): IUtils<TDate> {
  const current = useContext(context);
  if (!current) {
    throw new Error();
  }

  return current;
}

export function useTime<DateUtils>(defaultValue: Date | undefined): unknown {
  const utils = useDateUtils<DateFnsUtils>();
  utils.const[(value, setValue)] = useState(() => formatTime(defaultValue, {}));
}
