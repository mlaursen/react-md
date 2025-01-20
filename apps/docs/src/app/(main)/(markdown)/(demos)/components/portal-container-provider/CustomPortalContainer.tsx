"use client";

import { Box } from "@react-md/core/box/Box";
import { Button } from "@react-md/core/button/Button";
import { Portal } from "@react-md/core/portal/Portal";
import { PortalContainerProvider } from "@react-md/core/portal/PortalContainerProvider";
import { useToggle } from "@react-md/core/useToggle";
import { type ReactElement, useRef } from "react";

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
