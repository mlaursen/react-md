import { appBarTitle } from "@react-md/core/app-bar/AppBarTitle";
import { Box } from "@react-md/core/box/Box";
import { Typography } from "@react-md/core/typography/Typography";
import Link from "next/link.js";
import { type ReactElement } from "react";
import styles from "./MainTitle.module.scss";
import { VersionDropdown } from "./VersionDropdown.jsx";

export function MainTitle(): ReactElement {
  return (
    <Box
      className={appBarTitle({ className: styles.container })}
      disablePadding
    >
      <Link href="/" className={styles.link}>
        <Typography type="headline-6" margin="none">
          react-md
        </Typography>
      </Link>
      <VersionDropdown isHiddenOnPhone />
    </Box>
  );
}
