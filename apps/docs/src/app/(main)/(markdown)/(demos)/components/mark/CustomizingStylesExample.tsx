import { Divider } from "@react-md/core/divider/Divider";
import { Mark } from "@react-md/core/typography/Mark";
import { Typography } from "@react-md/core/typography/Typography";
import { type ReactElement } from "react";

import styles from "./CustomizingStylesExample.module.scss";

export default function CustomizingStylesExample(): ReactElement {
  return (
    <div className={styles.container}>
      <Typography>{'Search results for "salamander":'}</Typography>
      <Divider />
      <Typography>
        Several species of <Mark>salamander</Mark> inhabit the temperate
        rainforest of the Pacific Northwest.
      </Typography>
      <Typography>
        Most <Mark>salamander</Mark>s are nocturnal, and hunt for insects,
        worms, and other small creatures.
      </Typography>
    </div>
  );
}
