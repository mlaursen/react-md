"use client";
import {
  Box,
  Button,
  Portal,
  PortalContainerProvider,
  useToggle,
} from "react-md";
import { useRef, type ReactElement } from "react";

export default function CustomPortalContainer(): ReactElement {
  const { toggled, toggle } = useToggle();
  const portalContainer = useRef<HTMLDivElement>(null);
  // the container could also be a result of:
  // - `document.getElementById`
  // - `document.querySelector`
  // - `document.body`
  // - etc.
  //
  // It just needs to be an `Element` or `DocumentFragment` for `createPortal`
  // to work

  return (
    <PortalContainerProvider container={portalContainer}>
      <Box stacked disablePadding>
        <Button onClick={toggle}>Toggle</Button>
        <div ref={portalContainer} />
      </Box>
      {toggled && (
        <Portal>This will always be rendered in the portalContainer</Portal>
      )}
    </PortalContainerProvider>
  );
}
