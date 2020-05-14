import React, { FC } from "react";
import { Divider } from "@react-md/divider";
import { Text } from "@react-md/typography";

import styles from "./SimpleExample.module.scss";

const SimpleExample: FC = () => (
  <div className={styles.container}>
    <Text>This is a new surface and defining some new theme colors.</Text>
    <Text className={styles.defaultPrimary} type="subtitle-1">
      This is the pre-compiled primary color.
    </Text>
    <Text className={styles.defaultSecondary} type="subtitle-1">
      This is the pre-compiled secondary color.
    </Text>
    <Divider />
    <Text className={styles.themePrimary} type="subtitle-1">
      This is the new primary color.
    </Text>
    <Text className={styles.themeSecondary} type="subtitle-1">
      This is the new secondary color.
    </Text>
  </div>
);

export default SimpleExample;
