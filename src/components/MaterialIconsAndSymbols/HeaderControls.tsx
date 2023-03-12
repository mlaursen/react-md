import type {
  GetMenuItemRadioGroupProps,
  MaterialIconFamily,
  MaterialSymbolFamily,
} from "@react-md/core";
import {
  Box,
  Chip,
  Option,
  Select,
  TextField,
  typography,
  useIntersectionObserver,
} from "@react-md/core";
import SearchIcon from "@react-md/material-icons/SearchIcon";
import { upperFirst } from "lodash";
import type { ReactElement } from "react";
import { useCallback, useState } from "react";

import styles from "./MaterialIconsAndSymbols.module.scss";
import {
  MATERIAL_ICON_CATEGORIES,
  MATERIAL_ICON_FAMILY_TYPES,
  MATERIAL_SYMBOL_CATEGORIES,
  MATERIAL_SYMBOL_FAMILY_TYPES,
} from "./metadata";
import { ReturnToTop } from "./ReturnToTop";
import { useMaterialFontLoader } from "./useMaterialFontLoader";
import { useMaterialStateContext } from "./useMaterialState";
import { getCategoryName } from "./utils";

export interface HeaderControlsProps {
  getRadioProps: GetMenuItemRadioGroupProps<
    MaterialIconFamily | MaterialSymbolFamily
  >;
}

export function HeaderControls(props: HeaderControlsProps): ReactElement {
  const { getRadioProps } = props;
  const {
    iconType,
    setIconType,
    iconFamily,
    setIconFamily,
    iconCategory,
    setIconCategory,
    search,
    setSearch,
  } = useMaterialStateContext();

  useMaterialFontLoader(iconFamily, iconType);

  const isIcon = iconType === "icon";
  const familyTypes = isIcon
    ? MATERIAL_ICON_FAMILY_TYPES
    : MATERIAL_SYMBOL_FAMILY_TYPES;
  const categories = isIcon
    ? MATERIAL_ICON_CATEGORIES
    : MATERIAL_SYMBOL_CATEGORIES;

  const [returnToTopVisible, setReturnToTopVisible] = useState(false);
  const targetRef = useIntersectionObserver({
    onUpdate: useCallback((entry) => {
      setReturnToTopVisible(!entry.isIntersecting);
    }, []),
  });
  return (
    <>
      <Box ref={targetRef}>
        <Select
          dense
          value={iconType}
          onChange={(event) => {
            const family = event.currentTarget.value;
            const nextFamilyTypes =
              family === "icon"
                ? MATERIAL_ICON_FAMILY_TYPES
                : MATERIAL_SYMBOL_FAMILY_TYPES;

            setIconType(family);
            if (!nextFamilyTypes.includes(iconFamily as "outlined")) {
              setIconFamily("outlined");
            }
            if (iconCategory) {
              setIconCategory("");
            }
          }}
        >
          <Option value="symbol">Material Symbols</Option>
          <Option value="icon">Material Icons</Option>
        </Select>
        <Select
          dense
          value={iconCategory}
          onChange={(event) => {
            const nextCategory = event.currentTarget.value;
            setIconCategory(nextCategory);
          }}
          menuProps={{
            preventOverlap: true,
          }}
        >
          <Option value="">All Categories</Option>
          {categories.map((category) => (
            <Option key={category} value={category}>
              {getCategoryName(category)}
            </Option>
          ))}
        </Select>
        <TextField
          dense
          type="search"
          value={search}
          className={styles.search}
          onChange={(event) => setSearch(event.currentTarget.value)}
          placeholder={`Search Material ${upperFirst(iconType)}s`}
          leftAddon={<SearchIcon />}
        />
      </Box>
      <Box>
        {familyTypes.map((familyType) => {
          const { checked, onCheckedChange } = getRadioProps(familyType);

          return (
            <Chip
              key={familyType}
              selected={checked}
              onClick={onCheckedChange}
              className={typography({
                type: null,
                transform: "capitalize",
              })}
            >
              {familyType}
            </Chip>
          );
        })}
      </Box>
      <ReturnToTop visible={returnToTopVisible} />
    </>
  );
}
