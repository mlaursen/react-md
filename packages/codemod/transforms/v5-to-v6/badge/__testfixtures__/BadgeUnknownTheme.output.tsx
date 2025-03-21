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
          theme={_toBadgeTheme(theme)}
          className={styles.container}
        >
          {theme.length}
        </Badge>
      ))}
      <Badge theme={_toBadgeTheme(someFlag && somethingElse ? "greyscale" : undefined)} />
      <Badge theme={_toBadgeTheme(somethingElse ? "greyscale" : theme)} />
      <Badge theme={_toBadgeTheme(somethingElse ? boop : theme)} />
    </>
  );
}

function _toBadgeTheme(theme: BadgeTheme | "default" | undefined): BadgeTheme | undefined {
  return theme === "default" ? "greyscale" : theme;
}
