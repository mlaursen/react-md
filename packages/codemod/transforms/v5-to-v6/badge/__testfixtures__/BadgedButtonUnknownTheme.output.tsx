import type { ReactElement } from "react";
import { Badge, BadgeTheme, Button, getIcon } from "react-md";

import styles from "./SimpleExamples.module.scss";

const themes: BadgeTheme[] = ["primary", "secondary", "default", "clear"];

export default function ThemedBadges(): ReactElement {
  return (<>
    {themes.map((theme) => (
      <Button
        key={theme}
        id={`badged-button-${theme}`}
        className={styles.container}
        aria-label="Notifications"
        buttonType="icon">{getIcon("notification")}<Badge theme={_toBadgeTheme(theme)}>
          {theme.length}
        </Badge></Button>
    ))}
  </>);
}

function _toBadgeTheme(theme: BadgeTheme | "default" | undefined): BadgeTheme | undefined {
  return theme === "default" ? "greyscale" : theme;
}
