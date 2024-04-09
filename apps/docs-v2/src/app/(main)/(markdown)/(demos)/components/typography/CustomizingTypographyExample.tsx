import { Typography } from "@react-md/core/typography/Typography";
import { type ReactElement } from "react";
import styles from "./CustomizingTypographyExample.module.scss";

export default function CustomizingTypographyExample(): ReactElement {
  return (
    <div className={styles.container}>
      <Typography type="headline-1" as="p">
        headline-1
      </Typography>
      <Typography type="headline-2" as="p">
        headline-2
      </Typography>
      <Typography type="headline-3" as="p">
        headline-3
      </Typography>
      <Typography type="headline-4" as="p">
        headline-4
      </Typography>
      <Typography type="headline-5" as="p">
        headline-5
      </Typography>
      <Typography type="headline-6" as="p">
        headline-6
      </Typography>
      <Typography type="subtitle-1" as="p">
        subtitle-1
      </Typography>
      <Typography type="subtitle-2" as="p">
        subtitle-2
      </Typography>
      <Typography type="caption" as="p">
        caption
      </Typography>
      <Typography type="overline" as="p">
        overline
      </Typography>
    </div>
  );
}
