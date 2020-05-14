import React, { FC } from "react";
import { BadgedButton, BadgeTheme } from "@react-md/badge";

import styles from "./SimpleExamples.module.scss";

const themes: BadgeTheme[] = ["primary", "secondary", "default", "clear"];

const ThemedBadges: FC = () => (
  <>
    {themes.map((theme) => (
      <BadgedButton
        key={theme}
        id={`badged-button-${theme}`}
        badgeTheme={theme}
        className={styles.container}
      >
        {theme.length}
      </BadgedButton>
    ))}
  </>
);

export default ThemedBadges;
