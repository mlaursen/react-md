import { describe, expect, it } from "@jest/globals";
import { render } from "../../test-utils/index.js";

import {
  PortalContainerProvider,
  PORTAL_CONTAINER_ID,
} from "../PortalContainerProvider.js";
import { Portal } from "../Portal.js";

describe("PortalContainerProvider", () => {
  it("should portal all child portals to a div that was created as the last child in the document.body", () => {
    const { container, getByTestId, unmount } = render(
      <PortalContainerProvider>
        <Portal>
          <div data-testid="div-1" />
        </Portal>
        <Portal>
          <div data-testid="div-2" />
        </Portal>
      </PortalContainerProvider>
    );

    const portalRoot = document.getElementById(PORTAL_CONTAINER_ID);
    const div1 = getByTestId("div-1");
    const div2 = getByTestId("div-2");

    expect(document.body).toContainElement(portalRoot);
    expect(portalRoot).toContainElement(div1);
    expect(portalRoot).toContainElement(div2);
    expect(container).not.toContainElement(portalRoot);
    expect(container).not.toContainElement(div1);
    expect(container).not.toContainElement(div2);

    unmount();
    expect(div1).not.toBeInTheDocument();
    expect(div2).not.toBeInTheDocument();
    expect(portalRoot).not.toBeInTheDocument();
  });

  it("should allow for a custom container element", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const { getByTestId } = render(
      <PortalContainerProvider container={container}>
        <Portal>
          <div data-testid="div-1" />
        </Portal>
        <Portal>
          <div data-testid="div-2" />
        </Portal>
      </PortalContainerProvider>
    );

    const div1 = getByTestId("div-1");
    const div2 = getByTestId("div-2");
    expect(document.getElementById(PORTAL_CONTAINER_ID)).toBe(null);
    expect(container).toContainElement(div1);
    expect(container).toContainElement(div2);
    document.body.removeChild(container);
  });
});
