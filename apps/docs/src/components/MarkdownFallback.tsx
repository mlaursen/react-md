"use client";

import { useErrorBoundary } from "@react-md/core/error-boundary/useErrorBoundary";
import { type ReactElement } from "react";

import { Blockquote } from "./Blockquote.js";
import { MarkdownCode } from "./MarkdownCode.js";

export interface MarkdownFallbackProps {
  source: string;
}

export function MarkdownFallback({
  source,
}: MarkdownFallbackProps): ReactElement {
  const { error } = useErrorBoundary();

  return (
    <Blockquote theme="error">
      {process.env.NODE_ENV === "production" ? (
        "Error compiling MDX."
      ) : (
        <>
          {`${error}`}
          <MarkdownCode
            language="markup"
            containerProps={{ style: { marginTop: "1em" } }}
          >
            {source}
          </MarkdownCode>
        </>
      )}
    </Blockquote>
  );
}
