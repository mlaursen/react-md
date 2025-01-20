"use client";

import { ThemeProvider, useTheme } from "@react-md/core/theme/ThemeProvider";
import { type ReactElement } from "react";

export default function DerivedThemeExample(): ReactElement {
  return (
    <ThemeProvider>
      <Content />
    </ThemeProvider>
  );
}

function Content(): ReactElement {
  const theme = useTheme();
  return (
    <pre>
      <code>{JSON.stringify(theme, null, 2)}</code>
    </pre>
  );
}
