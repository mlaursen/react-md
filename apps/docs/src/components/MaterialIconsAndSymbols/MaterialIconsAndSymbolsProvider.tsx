import type {
  MaterialIconFamily,
  MaterialSymbolFill,
  MaterialSymbolGrade,
  MaterialSymbolOpticalSize,
  MaterialSymbolWeight,
  UseStateSetter,
} from "@react-md/core";
import { MaterialIconsProvider, MaterialSymbolsProvider } from "@react-md/core";
import type { Dispatch, ReactElement, ReactNode } from "react";
import { createContext, useContext, useMemo, useReducer } from "react";
import type {
  MaterialIconAndSymbolName,
  MaterialIconCategory,
  MaterialIconType,
  MaterialSymbolCategory,
} from "./metadata";
import {
  MATERIAL_ICON_FAMILY_TYPES,
  MATERIAL_SYMBOL_FAMILY_TYPES,
} from "./metadata";
import { useMaterialFontLoader } from "./useMaterialFontLoader";

export type IconCategoryFilter =
  | MaterialIconCategory
  | MaterialSymbolCategory
  | "";

export interface MaterialIconsAndSymbolsState {
  search: string;
  iconType: MaterialIconType;
  iconFamily: MaterialIconFamily;
  iconCategory: IconCategoryFilter;

  symbolFill: number;
  symbolGrade: number;
  symbolWeight: number;
  symbolOpticalSize: number;

  howToUseVisible: boolean;
  selectedIconName: MaterialIconAndSymbolName;
}

export const DEFAULT_FILL = 0;
export const DEFAULT_WEIGHT = 3;
export const DEFAULT_GRADE = 1;
export const DEFAULT_OPTICAL_SIZE = 3;
const FILLS: readonly MaterialSymbolFill[] = [0, 1];
const GRADES: readonly MaterialSymbolGrade[] = [-25, 0, 200];
const WEIGHTS: readonly MaterialSymbolWeight[] = [
  100, 200, 300, 400, 500, 600, 700,
];
const OPTICAL_SIZES: readonly MaterialSymbolOpticalSize[] = [20, 24, 40, 48];

export const indexToMaterialFill = (index: number): MaterialSymbolFill =>
  FILLS[index];
export const indexToMaterialGrade = (index: number): MaterialSymbolGrade =>
  GRADES[index];
export const indexToMaterialWeight = (index: number): MaterialSymbolWeight =>
  WEIGHTS[index];
export const indexToMaterialOpticalSize = (
  index: number
): MaterialSymbolOpticalSize => OPTICAL_SIZES[index];

const INITIAL_STATE: MaterialIconsAndSymbolsState = {
  search: "",
  iconType: "symbol",
  iconFamily: "outlined",
  iconCategory: "",
  symbolFill: DEFAULT_FILL,
  symbolWeight: DEFAULT_WEIGHT,
  symbolGrade: DEFAULT_GRADE,
  symbolOpticalSize: DEFAULT_OPTICAL_SIZE,

  howToUseVisible: false,
  selectedIconName: "123",
};

type MaterialIconsAndSymbolsAction =
  | { type: "setSearch"; payload: string }
  | { type: "setIconType"; payload: MaterialIconType }
  | { type: "setIconFamily"; payload: MaterialIconFamily }
  | { type: "setIconCategory"; payload: IconCategoryFilter }
  | { type: "reset" | "resetFilters" | "resetSymbols" | "deselectIcon" }
  | { type: "selectIcon"; payload: MaterialIconAndSymbolName }
  | {
      type: "setFill" | "setWeight" | "setGrade" | "setOpticalSize";
      payload: number;
    };

export interface MaterialIconsAndSymbolsContext
  extends MaterialIconsAndSymbolsState {
  fill: MaterialSymbolFill;
  weight: MaterialSymbolWeight;
  grade: MaterialSymbolGrade;
  opticalSize: MaterialSymbolOpticalSize;
  dispatch: Dispatch<MaterialIconsAndSymbolsAction>;
  selectIcon(name: MaterialIconAndSymbolName): void;
  deselectIcon(): void;
  isFillChanged: boolean;
  isGradeChanged: boolean;
  isWeightChanged: boolean;
  isOpticalSizeChanged: boolean;
  setFill: UseStateSetter<number>;
  setWeight: UseStateSetter<number>;
  setGrade: UseStateSetter<number>;
  setOpticalSize: UseStateSetter<number>;
  isFontFamilyChanged: boolean;
  isSymbolCustomizationChanged: boolean;
}

const context = createContext<MaterialIconsAndSymbolsContext | undefined>(
  undefined
);
const { Provider } = context;

export function useMaterialIconsAndSymbols(): MaterialIconsAndSymbolsContext {
  const value = useContext(context);
  if (!value) {
    throw new Error(
      "MaterialIconsAndSymbolsProvider is not a parent component."
    );
  }

  return value;
}

export interface MaterialIconsAndSymbolsProviderProps {
  children: ReactNode;
}

export function MaterialIconsAndSymbolsProvider({
  children,
}: MaterialIconsAndSymbolsProviderProps): ReactElement {
  const [state, dispatch] = useReducer(function reducer(
    state: MaterialIconsAndSymbolsState,
    action: MaterialIconsAndSymbolsAction
  ) {
    switch (action.type) {
      case "setSearch":
        return {
          ...state,
          search: action.payload,
        };
      case "setIconType": {
        const iconType = action.payload;
        let { iconFamily, iconCategory } = state;
        const nextFamilyTypes =
          iconType === "icon"
            ? MATERIAL_ICON_FAMILY_TYPES
            : MATERIAL_SYMBOL_FAMILY_TYPES;
        if (!nextFamilyTypes.includes(iconFamily as "outlined")) {
          iconFamily = "outlined";
        }
        if (iconCategory) {
          iconCategory = "";
        }

        return {
          ...state,
          iconType,
          iconFamily,
          iconCategory,
          howToUseVisible: false,
        };
      }
      case "setIconFamily":
        return {
          ...state,
          iconFamily: action.payload,
        };
      case "setIconCategory":
        return {
          ...state,
          iconCategory: action.payload,
        };
      case "setFill":
      case "setWeight":
      case "setGrade":
      case "setOpticalSize": {
        const key = action.type.substring(3);
        return {
          ...state,
          [`symbol${key}`]: action.payload,
        };
      }
      case "reset":
        return INITIAL_STATE;
      case "resetFilters":
        return {
          ...state,
          search: "",
          iconCategory: "" as const,
        };
      case "resetSymbols":
        return {
          ...state,
          symbolFill: DEFAULT_FILL,
          symbolWeight: DEFAULT_WEIGHT,
          symbolGrade: DEFAULT_GRADE,
          symbolOpticalSize: DEFAULT_OPTICAL_SIZE,
        };
      case "selectIcon":
        return {
          ...state,
          howToUseVisible: true,
          selectedIconName: action.payload,
        };
      case "deselectIcon":
        return {
          ...state,
          howToUseVisible: false,
        };
      default:
        throw new Error("Unreachable");
    }
  },
  INITIAL_STATE);
  const {
    search,
    iconType,
    iconFamily,
    iconCategory,
    symbolFill,
    symbolWeight,
    symbolGrade,
    symbolOpticalSize,
    howToUseVisible,
    selectedIconName,
  } = state;
  useMaterialFontLoader(iconFamily, iconType);

  const isFillChanged = symbolFill !== DEFAULT_FILL;
  const isWeightChanged = symbolWeight !== DEFAULT_WEIGHT;
  const isGradeChanged = symbolGrade !== DEFAULT_GRADE;
  const isOpticalSizeChanged = symbolOpticalSize !== DEFAULT_OPTICAL_SIZE;

  const value = useMemo<MaterialIconsAndSymbolsContext>(
    () => ({
      search,
      iconType,
      iconFamily,
      iconCategory,
      dispatch,
      fill: indexToMaterialFill(symbolFill),
      weight: indexToMaterialWeight(symbolWeight),
      grade: indexToMaterialGrade(symbolGrade),
      opticalSize: indexToMaterialOpticalSize(symbolOpticalSize),
      symbolFill,
      symbolWeight,
      symbolGrade,
      symbolOpticalSize,
      isFillChanged,
      isWeightChanged,
      isGradeChanged,
      isOpticalSizeChanged,
      isFontFamilyChanged: iconFamily !== "outlined",
      isSymbolCustomizationChanged:
        isFillChanged ||
        isWeightChanged ||
        isGradeChanged ||
        isOpticalSizeChanged,
      howToUseVisible,
      selectedIconName,
      selectIcon(name) {
        dispatch({ type: "selectIcon", payload: name });
      },
      deselectIcon() {
        dispatch({ type: "deselectIcon" });
      },
      setFill(value) {
        const payload = typeof value === "number" ? value : value(symbolFill);
        dispatch({ type: "setFill", payload });
      },
      setWeight(value) {
        const payload = typeof value === "number" ? value : value(symbolWeight);
        dispatch({ type: "setWeight", payload });
      },
      setGrade(value) {
        const payload = typeof value === "number" ? value : value(symbolGrade);
        dispatch({ type: "setGrade", payload });
      },
      setOpticalSize(value) {
        const payload =
          typeof value === "number" ? value : value(symbolOpticalSize);
        dispatch({ type: "setOpticalSize", payload });
      },
    }),
    [
      howToUseVisible,
      iconCategory,
      iconFamily,
      iconType,
      isFillChanged,
      isGradeChanged,
      isOpticalSizeChanged,
      isWeightChanged,
      search,
      selectedIconName,
      symbolFill,
      symbolGrade,
      symbolOpticalSize,
      symbolWeight,
    ]
  );
  const symbolFamily =
    iconFamily === "filled" || iconFamily === "two-tone"
      ? "outlined"
      : iconFamily;

  return (
    <Provider value={value}>
      <MaterialSymbolsProvider family={symbolFamily}>
        <MaterialIconsProvider value={iconFamily}>
          {children}
        </MaterialIconsProvider>
      </MaterialSymbolsProvider>
    </Provider>
  );
}
