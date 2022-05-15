import type { ReactElement } from "react";
import { Typography } from "@react-md/typography";

import UsingKeys from "./UsingKeys";
import CustomChildren from "./CustomChildren";
import WithOptionLeftAddon from "./WithOptionLeftAddon";
import styles from "./CustomizingSelectOptions.module.scss";

export default function CustomizingSelectOptions(): ReactElement {
  return (
    <div className={styles.container}>
      <Typography type="headline-6" margin="none">
        Using Keys
      </Typography>
      <UsingKeys />
      <Typography type="headline-6" margin="top">
        Custom Children
      </Typography>
      <CustomChildren />
      <Typography type="headline-6" margin="top">
        Icons and Avatars
      </Typography>
      <WithOptionLeftAddon />
    </div>
  );
}
