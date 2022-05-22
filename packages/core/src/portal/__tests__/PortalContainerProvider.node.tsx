/** @jest-environment node */
import { renderToString } from "react-dom/server";
import { Portal } from "../Portal";

import { PortalContainerProvider } from "../PortalContainerProvider";

describe("PortalContainerProvider", () => {
  it("should not render portals server side", () => {
    expect(typeof document).toBe("undefined");

    const result = renderToString(
      <PortalContainerProvider>
        <Portal>
          <div data-testid="div-1" />
        </Portal>
        <Portal>
          <div data-testid="div-2" />
        </Portal>
      </PortalContainerProvider>
    );

    expect(result).toBe("");
  });
});
