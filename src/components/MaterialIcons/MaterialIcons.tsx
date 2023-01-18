import {
  box,
  Box,
  Divider,
  getScrollbarWidth,
  Typography,
  useCSSVariables,
  useResizeObserver,
} from "@react-md/core";
import { Radio, TextField } from "@react-md/form";
import SearchIcon from "@react-md/material-icons/SearchIcon";
import type { ReactElement } from "react";
import { useCallback, useMemo, useState } from "react";
import { ICON_CATEGORIES, ICON_TYPES } from "src/constants/materialIcons";
import { MatchedIcons } from "./MatchedIcons";
import styles from "./MaterialIcons.module.scss";
import { useMaterialIcons } from "./useMaterialIcons";

const MIN_CELL_WIDTH = 160;

export default function MaterialIcons(): ReactElement {
  const {
    loading,
    matches,
    search,
    setSearch,
    getIconTypeProps,
    getIconCategoryProps,
  } = useMaterialIcons();

  const [{ containerWidth, rowWidth }, setSize] = useState({
    containerWidth: 150,
    rowWidth: 150,
  });
  const refCallback = useResizeObserver({
    onUpdate: useCallback((entry) => {
      const { height, width } = entry.contentRect;
      const { scrollHeight } = entry.target;

      setSize({
        containerWidth: width,
        rowWidth: width - (scrollHeight > height ? getScrollbarWidth() : 0),
      });
    }, []),
  });
  const columns = Math.floor(rowWidth / MIN_CELL_WIDTH);
  const style = useCSSVariables(
    useMemo(() => [{ name: "--rmd-box-columns", value: columns }], [columns]),
    true
  );

  return (
    <>
      <Typography type="headline-6" margin="none" className={box()}>
        Icon Type
      </Typography>
      <Box>
        <Radio {...getIconTypeProps("all")} label="All" />
        {ICON_TYPES.map((value) => (
          <Radio key={value} label={value} {...getIconTypeProps(value)} />
        ))}
      </Box>
      <Divider />
      <Typography type="headline-6" margin="none" className={box()}>
        Icon Category
      </Typography>
      <Box>
        <Radio label="All" {...getIconCategoryProps("all")} />
        {ICON_CATEGORIES.map((value) => (
          <Radio key={value} {...getIconCategoryProps(value)} label={value} />
        ))}
      </Box>
      <Divider />
      <Box>
        <TextField
          type="search"
          label="Search"
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
          placeholder="favorite"
          rightAddon={<SearchIcon />}
        />
      </Box>
      <div ref={refCallback} style={style} className={styles.container}>
        <MatchedIcons
          columns={columns}
          containerWidth={containerWidth}
          matches={matches}
          loading={loading}
        />
      </div>
    </>
  );
}
