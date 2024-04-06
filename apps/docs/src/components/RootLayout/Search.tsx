import { Button, SrOnly, Typography } from "react-md";
import SearchIcon from "@react-md/material-icons/SearchIcon";
import { type ReactElement } from "react";
import styles from "./Search.module.scss";

export interface SearchProps {
  isMac: boolean;
}

export function Search(props: SearchProps): ReactElement {
  const { isMac } = props;

  return (
    <>
      <Button responsive className={styles.button}>
        <SearchIcon />
        <SrOnly phoneOnly>
          <Typography as="span" className={styles.search}>
            Search...
          </Typography>
          <Typography
            type="body-2"
            as="span"
            className={styles.shortcut}
            margin="none"
          >
            {isMac ? "⌘" : "Ctrl"}
            {" + K"}
          </Typography>
        </SrOnly>
      </Button>
    </>
  );
}
