"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation.js";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type ReactElement,
  type ReactNode,
} from "react";
import {
  DEFAULT_FILL,
  DEFAULT_GRADE,
  DEFAULT_OPTICAL_SIZE,
  DEFAULT_WEIGHT,
  INITIAL_STATE,
  indexToMaterialFill,
  indexToMaterialGrade,
  indexToMaterialOpticalSize,
  indexToMaterialWeight,
} from "./constants.js";
import {
  MATERIAL_ICON_FAMILY_TYPES,
  MATERIAL_SYMBOL_FAMILY_TYPES,
} from "./metadata.js";
import {
  getIconUrl,
  getInitialState,
  isMaterialIconType,
} from "./searchParams.js";
import {
  type MaterialIconsAndSymbolsAction,
  type MaterialIconsAndSymbolsContext,
  type MaterialIconsAndSymbolsState,
} from "./types.js";

const context = createContext<MaterialIconsAndSymbolsContext | undefined>(
  undefined
);
const { Provider } = context;

const scrollToTop = (): void => {
  window.scrollTo({ top: 0, behavior: "instant" });
};

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
  const searchParams = useSearchParams();
  const [state, dispatch] = useReducer(
    function reducer(
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
          const nextFamilyTypes = isMaterialIconType(iconType)
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
        case "changeSvgToFont":
          return {
            ...state,
            iconType: "icon-font" as const,
          };
        default:
          throw new Error("Unreachable");
      }
    },
    INITIAL_STATE,
    (state) => getInitialState(state, searchParams)
  );
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
      resetSymbols() {
        dispatch({ type: "resetSymbols" });
      },
      resetFilters() {
        dispatch({ type: "resetFilters" });
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
        scrollToTop();
      },
      setIconType(nextIconType) {
        dispatch({ type: "setIconType", payload: nextIconType });
        // only scroll back to the top when switching to or from material
        // symbols since the SVG and Font Icons should have the same results
        if (nextIconType === "symbol" || iconType === "symbol") {
          scrollToTop();
        }
      },
      setIconFamily(iconFamily) {
        dispatch({ type: "setIconFamily", payload: iconFamily });
      },
      setIconCategory(iconCategory) {
        dispatch({ type: "setIconCategory", payload: iconCategory });
        scrollToTop();
      },
      changeSvgToFont() {
        dispatch({ type: "changeSvgToFont" });
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

  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    router.replace(
      getIconUrl({
        search,
        iconCategory,
        iconFamily,
        iconType,
        pathname,
        selectedIconName,
        symbolFill,
        symbolGrade,
        symbolOpticalSize,
        symbolWeight,
      }),
      { scroll: false }
    );
  }, [
    iconCategory,
    iconFamily,
    iconType,
    pathname,
    router,
    search,
    selectedIconName,
    symbolFill,
    symbolGrade,
    symbolOpticalSize,
    symbolWeight,
  ]);

  const isFirstRender = useRef(true);
  useEffect(() => {
    if (!isFirstRender.current) {
      return;
    }

    isFirstRender.current = false;
    if (!selectedIconName) {
      dispatch({ type: "toggleFilters" });
    }
  }, [selectedIconName]);

  return <Provider value={value}>{children}</Provider>;
}
