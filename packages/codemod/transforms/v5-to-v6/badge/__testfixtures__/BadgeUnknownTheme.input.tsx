import type { ReactElement } from "react";
import type { BadgeTheme } from "react-md";
import { Badge } from "react-md";

import styles from "./SimpleExamples.module.scss";

// NOTE: I will not be supporting this
const themes: BadgeTheme[] = ["primary", "secondary", "default", "clear"];

export default function ThemedBadges(): ReactElement {
  return (
    <>
      {themes.map((theme) => (
        <Badge
          key={theme}
          id={`badged-button-${theme}`}
          theme={theme}
          className={styles.container}
        >
          {theme.length}
        </Badge>
      ))}
      <Badge theme={someFlag && somethingElse ? "default" : undefined} />
      <Badge theme={somethingElse ? "default" : theme} />
      <Badge theme={somethingElse ? boop : theme} />
    </>
  );
}
