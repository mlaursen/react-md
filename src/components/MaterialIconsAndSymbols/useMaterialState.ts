import type {
  GetMenuItemRadioGroupProps,
  MaterialIconFamily,
  MaterialSymbolFamily,
  UseStateObject,
} from "@react-md/core";
import { useRadioGroup } from "@react-md/core";
import { createContext, useContext, useMemo, useState } from "react";
import type {
  MaterialIconCategory,
  MaterialIconType,
  MaterialSymbolCategory,
} from "./metadata";

const context = createContext<MaterialState | undefined>(undefined);

export const { Provider: MaterialStateProvider } = context;

export function useMaterialStateContext(): MaterialState {
  const value = useContext(context);
  if (!value) {
    throw new Error();
  }

  return value;
}

export type IconCategoryFilter =
  | MaterialIconCategory
  | MaterialSymbolCategory
  | "";

export type MaterialState = UseStateObject<"iconType", MaterialIconType> &
  UseStateObject<"iconFamily", MaterialIconFamily | MaterialSymbolFamily> &
  UseStateObject<"iconCategory", IconCategoryFilter> &
  UseStateObject<"search", string>;

export interface MaterialStateResult {
  context: MaterialState;
  iconFamily: MaterialIconFamily;
  symbolFamily: MaterialSymbolFamily;
  getRadioProps: GetMenuItemRadioGroupProps<
    MaterialIconFamily | MaterialSymbolFamily
  >;
}

export function useMaterialState(): MaterialStateResult {
  const [search, setSearch] = useState("");
  const [iconType, setIconType] = useState<MaterialIconType>("symbol");
  const [iconCategory, setIconCategory] = useState<IconCategoryFilter>("");
  const {
    getRadioProps,
    value: iconFamily,
    setValue: setIconFamily,
  } = useRadioGroup<MaterialIconFamily | MaterialSymbolFamily>({
    menu: true,
    defaultValue: "outlined",
  });
  const symbolFamily =
    iconFamily === "filled" || iconFamily === "two-tone"
      ? "outlined"
      : iconFamily;

  const context = useMemo(
    () => ({
      iconType,
      setIconType,
      iconFamily,
      setIconFamily,
      iconCategory,
      setIconCategory,
      search,
      setSearch,
    }),
    [iconCategory, iconFamily, iconType, search, setIconFamily]
  );

  return {
    context,
    iconFamily,
    symbolFamily,
    getRadioProps,
  };
}
