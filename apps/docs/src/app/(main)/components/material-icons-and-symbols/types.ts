import { type MaterialIconFamily } from "@react-md/core/icon/material";
import {
  type MaterialSymbolFill,
  type MaterialSymbolGrade,
  type MaterialSymbolOpticalSize,
  type MaterialSymbolWeight,
} from "@react-md/core/icon/materialConfig";
import { type UseStateSetter } from "@react-md/core/types";

import {
  type MaterialIconAndSymbolName,
  type MaterialIconCategory,
  type MaterialIconType,
  type MaterialSymbolCategory,
} from "./metadata.js";

export type IconCategoryFilter =
  | MaterialIconCategory
  | MaterialSymbolCategory
  | "";

export type IconType = MaterialIconType | "icon-font";

export interface MaterialIconsAndSymbolsRef {
  search: string;
  iconType: IconType;
  iconFamily: MaterialIconFamily;
  iconCategory: IconCategoryFilter;

  symbolFill: number;
  symbolGrade: number;
  symbolWeight: number;
  symbolOpticalSize: number;
  symbolStylesheet: boolean;

  selectedIconName: MaterialIconAndSymbolName | null;
}

export interface MaterialIconsAndSymbolsState
  extends MaterialIconsAndSymbolsRef {
  filtersVisible: boolean;
}

export type MaterialIconsAndSymbolsAction =
  | { type: "setSearch"; payload: string }
  | { type: "setIconType"; payload: IconType }
  | { type: "setIconFamily"; payload: MaterialIconFamily }
  | { type: "setIconCategory"; payload: IconCategoryFilter }
  | {
      type:
        | "reset"
        | "resetFilters"
        | "resetSymbols"
        | "toggleFilters"
        | "deselectIcon"
        | "changeSvgToFont";
    }
  | { type: "selectIcon"; payload: MaterialIconAndSymbolName }
  | {
      type: "setFill" | "setWeight" | "setGrade" | "setOpticalSize";
      payload: number;
    }
  | { type: "setSymbolStylesheet"; payload: boolean };

export interface MaterialIconsAndSymbolsContext
  extends MaterialIconsAndSymbolsState {
  fill: MaterialSymbolFill;
  weight: MaterialSymbolWeight;
  grade: MaterialSymbolGrade;
  opticalSize: MaterialSymbolOpticalSize;
  selectIcon: (name: MaterialIconAndSymbolName) => void;
  deselectIcon: () => void;
  toggleFilters: () => void;
  resetSymbols: () => void;
  resetFilters: () => void;
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
  isResettable: boolean;
  setSearch: (search: string) => void;
  setIconType: (iconType: IconType) => void;
  setIconFamily: (iconFamily: MaterialIconFamily) => void;
  setIconCategory: (iconCategory: IconCategoryFilter) => void;
  setSymbolStylesheet: (enabled: boolean) => void;
  changeSvgToFont: () => void;
}
