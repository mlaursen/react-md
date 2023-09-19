"use client";
import { Button, Typography, srOnly, useAppSize } from "@react-md/core";
import SearchIcon from "@react-md/material-icons/SearchIcon";
import { cnb } from "cnbuilder";
import type { ReactElement } from "react";
import styles from "./Search.module.scss";

export interface SearchProps {
  isMac: boolean;
}

export function Search(props: SearchProps): ReactElement {
  const { isMac } = props;
  const { isPhone } = useAppSize();

  return (
    <>
      <Button
        themeType={isPhone ? "flat" : "outline"}
        buttonType={isPhone ? "icon" : "text"}
        className={styles.button}
      >
        <SearchIcon />
        <Typography
          as="span"
          className={cnb(styles.search, isPhone && srOnly())}
        >
          Search...
        </Typography>
        <Typography
          type="body-2"
          as="span"
          className={styles.shortcut}
          margin="none"
          hidden={isPhone}
        >
          {isMac ? "⌘" : "Ctrl"}
          {" + K"}
        </Typography>
      </Button>
    </>
  );
}
