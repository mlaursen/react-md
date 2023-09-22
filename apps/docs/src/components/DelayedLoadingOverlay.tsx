"use client";
import { CircularProgress, Overlay } from "@react-md/core";
import { useEffect, useState, type ReactElement } from "react";

export function DelayedLoadingOverlay(): ReactElement {
  const [rendered, setRendered] = useState(false);
  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setRendered(true);
    }, 100);

    return () => {
      window.clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      {rendered && (
        <Overlay visible disableTransition>
          <CircularProgress />
        </Overlay>
      )}
    </>
  );
}