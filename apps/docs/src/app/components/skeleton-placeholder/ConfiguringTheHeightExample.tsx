"use client";
import { Box, SkeletonPlaceholder } from "@react-md/core";
import { type ReactElement } from "react";
import styles from "./ConfiguringTheHeightExample.module.scss";

export default function ConfiguringTheHeightExample(): ReactElement {
  return (
    <>
      <Box
        align="start"
        stacked
        fullWidth
        disablePadding
        className={styles.container}
      >
        <SkeletonPlaceholder />
        <SkeletonPlaceholder style={{ animationDelay: "0.15s" }} />
        <SkeletonPlaceholder style={{ animationDelay: "0.25s" }} />
      </Box>
      <Box disablePadding fullWidth>
        <SkeletonPlaceholder height="3rem" width="3rem" />
        <SkeletonPlaceholder height="3rem" width="3rem" />
        <SkeletonPlaceholder height="3rem" width="3rem" />
        <SkeletonPlaceholder height="3rem" width="3rem" />
      </Box>
    </>
  );
}
