"use client";

import { Button } from "@react-md/core/button/Button";
import { ErrorBoundary } from "@react-md/core/error-boundary/ErrorBoundary";
import { useErrorBoundary } from "@react-md/core/error-boundary/useErrorBoundary";
import { Typography } from "@react-md/core/typography/Typography";
import { useToggle } from "@react-md/core/useToggle";
import { type ReactElement } from "react";

export default function ResettableExample(): ReactElement {
  return (
    <ErrorBoundary fallback={<ResettableFallback />}>
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

// it isn't shown by default since the error/stacktrace isn't quite useful in these runnable demos
const SHOW_ERROR_MESSAGE = false;

function ResettableFallback(): ReactElement | null {
  const { error, errored, reset } = useErrorBoundary();
  if (!errored) {
    // this isn't possible from this flow as the `ResettableFallback` will
    // only be mounted once there is an error
    return null;
  }

  return (
    <>
      <Typography textColor="error">There was an error!</Typography>
      {SHOW_ERROR_MESSAGE && (
        <pre className="language-sh code-block code-block__pre">
          <code className="language-sh">{error.stack ?? error.message}</code>
        </pre>
      )}
      <Button onClick={reset}>Try Again</Button>
    </>
  );
}
