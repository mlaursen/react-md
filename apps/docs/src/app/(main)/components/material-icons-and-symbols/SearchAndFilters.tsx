"use client";

import { AppBar } from "@react-md/core/app-bar/AppBar";
import { Button } from "@react-md/core/button/Button";
import { TextField } from "@react-md/core/form/TextField";
import { icon } from "@react-md/core/icon/styles";
import { DISPLAY_NONE_CLASS } from "@react-md/core/utils/isElementVisible";
import CloseOutlinedIcon from "@react-md/material-icons/CloseOutlinedIcon";
import SearchOutlinedIcon from "@react-md/material-icons/SearchOutlinedIcon";
import TuneOutlinedIcon from "@react-md/material-icons/TuneOutlinedIcon";
import { cnb } from "cnbuilder";
import { type ReactElement } from "react";

import { useMaterialIconsAndSymbols } from "./MaterialIconsAndSymbolsProvider.js";
import styles from "./SearchAndFilters.module.scss";

export function SearchAndFilters(): ReactElement {
  const { filtersVisible, toggleFilters, search, setSearch } =
    useMaterialIconsAndSymbols();
  return (
    <AppBar className={styles.appBar} theme="current-color" position="sticky">
      <Button
        onClick={toggleFilters}
        theme="primary"
        themeType={filtersVisible ? "contained" : "outline"}
      >
        {filtersVisible ? <CloseOutlinedIcon /> : <TuneOutlinedIcon />}
        Filters
      </Button>
      <TextField
        leftAddon={<SearchOutlinedIcon />}
        leftAddonProps={{ className: icon({ type: "svg" }) }}
        rightAddon={
          <Button
            aria-label="Clear"
            buttonType="icon"
            iconSize="small"
            onClick={() => {
              setSearch("");
            }}
            className={cnb(!search && DISPLAY_NONE_CLASS)}
          >
            <CloseOutlinedIcon />
          </Button>
        }
        disableRightAddonStyles
        type="search"
        dense
        placeholder="Search icons"
        value={search}
        onChange={(event) => {
          setSearch(event.currentTarget.value);
        }}
      />
    </AppBar>
  );
}
