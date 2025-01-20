/** @jest-environment node */
import { describe, expect, it } from "@jest/globals";
import { renderToString } from "react-dom/server";

import { Portal } from "../Portal.js";
import { PortalContainerProvider } from "../PortalContainerProvider.js";

describe("PortalContainerProvider", () => {
  it("should not render portals server side", () => {
    expect(typeof document).toBe("undefined");

    // eslint-disable-next-line testing-library/render-result-naming-convention
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
