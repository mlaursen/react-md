"use client";
import {
  AppBar,
  Button,
  DISPLAY_NONE_CLASS,
  TextField,
  icon,
} from "@react-md/core";
import CloseOutlinedIcon from "@react-md/material-icons/CloseOutlinedIcon";
import SearchOutlinedIcon from "@react-md/material-icons/SearchOutlinedIcon";
import TuneOutlinedIcon from "@react-md/material-icons/TuneOutlinedIcon";
import { cnb } from "cnbuilder";
import { type ReactElement } from "react";
import { useMaterialIconsAndSymbols } from "./MaterialIconsAndSymbolsProvider.jsx";
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
            onClick={() => setSearch("")}
            className={cnb(!search && DISPLAY_NONE_CLASS)}
          >
            <CloseOutlinedIcon />
          </Button>
        }
        disableRightAddonStyles
        type="search"
        stretch
        dense
        placeholder="Search icons"
        value={search}
        onChange={(event) => setSearch(event.currentTarget.value)}
      />
    </AppBar>
  );
}