import React, { FC } from "react";
import { Text } from "@react-md/typography";

import UsingKeys from "./UsingKeys";
import CustomChildren from "./CustomChildren";
import WithOptionLeftAddon from "./WithOptionLeftAddon";
import styles from "./CustomizingSelectOptions.module.scss";

const CustomizingSelectOptions: FC = () => (
  <div className={styles.container}>
    <Text type="headline-6" margin="none">
      Using Keys
    </Text>
    <UsingKeys />
    <Text type="headline-6" margin="top">
      Custom Children
    </Text>
    <CustomChildren />
    <Text type="headline-6" margin="top">
      Icons and Avatars
    </Text>
    <WithOptionLeftAddon />
  </div>
);

export default CustomizingSelectOptions;
