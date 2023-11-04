"use client";
import {
  MaterialIconsProvider,
  MaterialSymbolsProvider,
  type MaterialSymbolFill,
  type MaterialSymbolGrade,
  type MaterialSymbolOpticalSize,
  type MaterialSymbolWeight,
} from "@react-md/core";
import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type ReactElement,
  type ReactNode,
} from "react";
import {
  MATERIAL_ICON_FAMILY_TYPES,
  MATERIAL_SYMBOL_FAMILY_TYPES,
} from "./metadata.js";
import {
  type MaterialIconsAndSymbolsAction,
  type MaterialIconsAndSymbolsContext,
  type MaterialIconsAndSymbolsState,
} from "./types.js";

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

  filtersVisible: false,
  selectedIconName: null,
};

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
          selectedIconName: null,
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
          ...INITIAL_STATE,
          search: state.search,
          iconType: state.iconType,
          filtersVisible: state.filtersVisible,
        };
      case "selectIcon":
        return {
          ...state,
          filtersVisible: false,
          selectedIconName: action.payload,
        };
      case "deselectIcon":
        return {
          ...state,
          selectedIconName: null,
        };
      case "toggleFilters":
        return {
          ...state,
          filtersVisible: !state.filtersVisible,
          selectedIconName: state.filtersVisible
            ? state.selectedIconName
            : null,
        };
      default:
        throw new Error("Unreachable");
    }
  }, INITIAL_STATE);
  const {
    search,
    iconType,
    iconFamily,
    iconCategory,
    symbolFill,
    symbolWeight,
    symbolGrade,
    symbolOpticalSize,
    filtersVisible,
    selectedIconName,
  } = state;

  const isFillChanged = symbolFill !== DEFAULT_FILL;
  const isWeightChanged = symbolWeight !== DEFAULT_WEIGHT;
  const isGradeChanged = symbolGrade !== DEFAULT_GRADE;
  const isOpticalSizeChanged = symbolOpticalSize !== DEFAULT_OPTICAL_SIZE;
  const isFontFamilyChanged = iconFamily !== "outlined";
  const isSymbolCustomizationChanged =
    isFillChanged || isWeightChanged || isGradeChanged || isOpticalSizeChanged;

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
      isFontFamilyChanged,
      isSymbolCustomizationChanged,
      filtersVisible,
      isResettable: isSymbolCustomizationChanged || isFontFamilyChanged,
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
      toggleFilters() {
        dispatch({ type: "toggleFilters" });
      },
      setSearch(search) {
        dispatch({ type: "setSearch", payload: search });
      },
      setIconType(iconType) {
        dispatch({ type: "setIconType", payload: iconType });
      },
      setIconFamily(iconFamily) {
        dispatch({ type: "setIconFamily", payload: iconFamily });
      },
      setIconCategory(iconCategory) {
        dispatch({ type: "setIconCategory", payload: iconCategory });
      },
    }),
    [
      filtersVisible,
      iconCategory,
      iconFamily,
      iconType,
      isFillChanged,
      isFontFamilyChanged,
      isGradeChanged,
      isOpticalSizeChanged,
      isSymbolCustomizationChanged,
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
