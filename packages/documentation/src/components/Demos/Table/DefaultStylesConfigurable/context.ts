import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ListboxChangeEventHandler } from "@react-md/form";
import {
  TableCellConfiguration,
  TableCellHorizontalAlignment,
  TableCellVerticalAlignment,
  TableConfiguration,
} from "@react-md/table";
import { useAppSize } from "@react-md/utils";

type LineWrap = Required<TableCellConfiguration>["lineWrap"];

export interface DefaultStylesContext extends Required<TableConfiguration> {
  cols: number;
  rows: number;
  container: boolean;
  row2DisableHover: boolean;
  row2DisableBorders: false;
  col2Grow: boolean;
  cellHAlign: TableCellHorizontalAlignment;
  cellVAlign: TableCellVerticalAlignment;
  cellLineWrap: LineWrap;
  onInputChange: React.ChangeEventHandler<HTMLInputElement>;
  onSelectChange: ListboxChangeEventHandler;
  onNumberChange: React.ChangeEventHandler<HTMLInputElement>;
}

const defaultState: Omit<
  DefaultStylesContext,
  "onInputChange" | "onSelectChange" | "onNumberChange"
> = {
  cols: 3,
  rows: 5,
  dense: false,
  fullWidth: false,
  container: false,
  disableHover: false,
  disableBorders: false,
  hAlign: "left",
  vAlign: "middle",
  lineWrap: false,
  row2DisableHover: false,
  row2DisableBorders: false,
  col2Grow: false,
  cellHAlign: "left",
  cellVAlign: "middle",
  cellLineWrap: false,
};

/**
 * You should probably define forms in a much better way, so I wouldn't
 * recommend following this pattern at all. I mostly wanted to separate
 * the configuration state/logic from the Table components to keep the
 * example simple at first glance and show what different props accomplish.
 */
export function useStylesState(): DefaultStylesContext {
  const { isPhone } = useAppSize();
  const [state, setState] = useState({
    ...defaultState,
    // need to force the container on mobile so that Google doesn't complain
    // that my website isn't mobile friendly with horizontal scrolling
    container: !isPhone,
  });

  useEffect(() => {
    if (isPhone) {
      setState((prevState) => {
        if (prevState.container) {
          return prevState;
        }

        return { ...prevState, container: true };
      });
    }
  }, [isPhone]);

  /* eslint-disable no-console */
  const onInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = event.currentTarget;
      setState((prevState) => {
        if (name in prevState) {
          return {
            ...prevState,
            [name]: checked,
          };
        }

        if (process.env.NODE_ENV !== "production") {
          console.log(`Unknown form input with name: "${name}"`);
        }

        return prevState;
      });
    },
    []
  );

  const onNumberChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.currentTarget;
      const min = parseInt(event.currentTarget.min, 10);
      const max = parseInt(event.currentTarget.max, 10);
      setState((prevState) => {
        if (name in prevState) {
          const number = parseInt(value, 10);
          // happens if the user types a letter instead of a number
          if (Number.isNaN(number)) {
            return prevState;
          }

          return {
            ...prevState,
            [name]: Math.min(max, Math.max(min, number)),
          };
        }

        if (process.env.NODE_ENV !== "production") {
          console.log(`Unknown form input with name: "${name}"`);
        }

        return prevState;
      });
    },
    []
  );

  const onSelectChange = useCallback<ListboxChangeEventHandler>(
    (nextValue, _option, listbox) => {
      const { name = "" } = listbox;
      setState((prevState) => {
        if (name in prevState) {
          let value: string | boolean = nextValue;
          if (/linewrap/i.test(name)) {
            /* eslint-disable no-nested-ternary */
            value =
              nextValue === "true"
                ? true
                : nextValue === "false"
                ? false
                : nextValue;
          }

          return {
            ...prevState,
            [name]: value,
          };
        }

        if (process.env.NODE_ENV !== "production") {
          console.log(`Unknown form input with name: "${name}"`);
        }

        return prevState;
      });
    },
    []
  );

  return useMemo(
    () => ({
      ...state,
      onInputChange,
      onNumberChange,
      onSelectChange,
    }),
    [state, onInputChange, onNumberChange, onSelectChange]
  );
}

const context = createContext<DefaultStylesContext>({
  ...defaultState,
  onInputChange() {
    throw new Error("Provider not mounted");
  },
  onNumberChange() {
    throw new Error("Provider not mounted");
  },
  onSelectChange() {
    throw new Error("Provider not mounted");
  },
});

export const { Provider } = context;

export const useDefaultStylesContext = (): DefaultStylesContext =>
  useContext(context);
