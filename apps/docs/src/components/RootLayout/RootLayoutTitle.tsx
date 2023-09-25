import { type SemVer } from "@/utils/semver.js";
import { Typography, appBarTitle, box } from "@react-md/core";
import Link from "next/link.js";
import { type ReactElement } from "react";
import styles from "./RootLayoutTitle.module.scss";
import { VersionDropdown } from "./VersionDropdown.jsx";

export interface RootLayoutTitleProps extends SemVer {
  version: string;
}

export function RootLayoutTitle(props: RootLayoutTitleProps): ReactElement {
  return (
    <div
      style={{ "--rmd-box-gap": 0 }}
      className={appBarTitle({
        className: box({ disablePadding: true }),
      })}
    >
      <Link href="/" className={styles.link}>
        <Typography type="headline-6" margin="none">
          react-md
        </Typography>
      </Link>
      <VersionDropdown isHiddenOnPhone {...props} />
    </div>
  );
}
