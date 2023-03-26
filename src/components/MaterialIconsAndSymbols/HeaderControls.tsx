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

import styles from "./HeaderControls.module.scss";
import { useMaterialIconsAndSymbols } from "./MaterialIconsAndSymbolsProvider";
import {
  MATERIAL_ICON_CATEGORIES,
  MATERIAL_ICON_FAMILY_TYPES,
  MATERIAL_SYMBOL_CATEGORIES,
  MATERIAL_SYMBOL_FAMILY_TYPES,
} from "./metadata";
import { ReturnToTop } from "./ReturnToTop";
import { getCategoryName } from "./utils";

export function HeaderControls(): ReactElement {
  const { dispatch, search, iconType, iconFamily, iconCategory } =
    useMaterialIconsAndSymbols();

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
      <ReturnToTop visible={returnToTopVisible} />
      <Box ref={targetRef} className={styles.box}>
        <Select
          dense
          value={iconType}
          onChange={(event) => {
            dispatch({
              type: "setIconType",
              payload: event.currentTarget.value,
            });
          }}
        >
          <Option value="symbol">Material Symbols</Option>
          <Option value="icon">Material Icons</Option>
        </Select>
        <Select
          dense
          value={iconCategory}
          onChange={(event) => {
            dispatch({
              type: "setIconCategory",
              payload: event.currentTarget.value,
            });
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
          onChange={(event) => {
            dispatch({
              type: "setSearch",
              payload: event.currentTarget.value,
            });
          }}
          placeholder={`Search Material ${upperFirst(iconType)}s`}
          leftAddon={<SearchIcon />}
        />
      </Box>
      <Box>
        {familyTypes.map((familyType) => {
          return (
            <Chip
              key={familyType}
              selected={iconFamily === familyType}
              onClick={() =>
                dispatch({
                  type: "setIconFamily",
                  payload: familyType,
                })
              }
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
    </>
  );
}
