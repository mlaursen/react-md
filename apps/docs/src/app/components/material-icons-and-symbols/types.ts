import {
  type MaterialIconFamily,
  type MaterialSymbolFill,
  type MaterialSymbolGrade,
  type MaterialSymbolOpticalSize,
  type MaterialSymbolWeight,
  type UseStateSetter,
} from "@react-md/core";
import { type Dispatch } from "react";
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

export interface MaterialIconsAndSymbolsRef {
  search: string;
  iconType: MaterialIconType;
  iconFamily: MaterialIconFamily;
  iconCategory: IconCategoryFilter;

  symbolFill: number;
  symbolGrade: number;
  symbolWeight: number;
  symbolOpticalSize: number;

  selectedIconName: MaterialIconAndSymbolName | null;
}

export interface MaterialIconsAndSymbolsState
  extends MaterialIconsAndSymbolsRef {
  filtersVisible: boolean;
}

export type MaterialIconsAndSymbolsAction =
  | { type: "setSearch"; payload: string }
  | { type: "setIconType"; payload: MaterialIconType }
  | { type: "setIconFamily"; payload: MaterialIconFamily }
  | { type: "setIconCategory"; payload: IconCategoryFilter }
  | {
      type:
        | "reset"
        | "resetFilters"
        | "resetSymbols"
        | "toggleFilters"
        | "deselectIcon";
    }
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
  toggleFilters(): void;
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
  setSearch(search: string): void;
  setIconType(iconType: MaterialIconType): void;
  setIconFamily(iconFamily: MaterialIconFamily): void;
  setIconCategory(iconCategory: IconCategoryFilter): void;
}
