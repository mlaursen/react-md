import * as React from "react";

import ExamplesPage from "components/ExamplesPage";

import SimpleOverlay from "./SimpleOverlay";
import PortalOverlay from "./PortalOverlay";

const examples = [{
  title: "Simple Overlay",
  children: <SimpleOverlay />,
}, {
  title: "Portal Overlay",
  children: <PortalOverlay />,
  description: `
It can sometimes be helpful to be able to portal the overlay to get around positioning or overlay issues. This simple
example will show how you can use the nice wrapper for Portals and Overlays with the \`OverlayPortal\` component.
  `
}];

const Sheet = () => <ExamplesPage title="Overlays" examples={examples} />;

export default Sheet;
