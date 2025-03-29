"use client";

import { Button } from "@react-md/core/button/Button";
import { ErrorBoundary } from "@react-md/core/error-boundary/ErrorBoundary";
import { useToggle } from "@react-md/core/useToggle";
import { type ReactElement } from "react";

export default function SimpleExample(): ReactElement {
  return (
    <ErrorBoundary fallback={<span>Fallback!</span>}>
      <ErrorAfterClick />
    </ErrorBoundary>
  );
}

function ErrorAfterClick(): ReactElement {
  const { toggle, toggled } = useToggle();

  if (toggled) {
    throw new Error("Unable to render");
  }

  return (
    <Button onClick={toggle} theme="error" themeType="contained">
      Cause Error
    </Button>
  );
}
