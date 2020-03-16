import React, { FC } from "react";
import { BadgedButton, BadgeTheme } from "@react-md/badge";

import "./SimpleExamples.scss";

const themes: BadgeTheme[] = ["primary", "secondary", "default", "clear"];

const ThemedBadges: FC = () => (
  <>
    {themes.map(theme => (
      <BadgedButton
        key={theme}
        id={`badged-button-${theme}`}
        badgeTheme={theme}
        className="badge-container"
      >
        {theme.length}
      </BadgedButton>
    ))}
  </>
);

export default ThemedBadges;
