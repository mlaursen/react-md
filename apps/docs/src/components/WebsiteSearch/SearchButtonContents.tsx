import { SrOnly } from "@react-md/core/typography/SrOnly";
import SearchIcon from "@react-md/material-icons/SearchIcon";
import { type ReactElement } from "react";

import styles from "./SearchButtonContents.module.scss";

export function SearchButtonContents(): ReactElement {
  return (
    <>
      <SearchIcon />
      <SrOnly phoneOnly>Search...</SrOnly>
      <span className={styles.kbd}>
        <kbd>Ctrl</kbd>+<kbd>K</kbd>
      </span>
    </>
  );
}
