import { ReactElement } from "react";
import { Divider } from "@react-md/divider";
import { Typography } from "@react-md/typography";

import styles from "./SimpleExample.module.scss";

export default function SimpleExample(): ReactElement {
  return (
    <div className={styles.container}>
      <Typography>
        This is a new surface and defining some new theme colors.
      </Typography>
      <Typography className={styles.defaultPrimary} type="subtitle-1">
        This is the pre-compiled primary color.
      </Typography>
      <Typography className={styles.defaultSecondary} type="subtitle-1">
        This is the pre-compiled secondary color.
      </Typography>
      <Divider />
      <Typography className={styles.themePrimary} type="subtitle-1">
        This is the new primary color.
      </Typography>
      <Typography className={styles.themeSecondary} type="subtitle-1">
        This is the new secondary color.
      </Typography>
    </div>
  );
}
