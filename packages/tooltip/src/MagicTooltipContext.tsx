import * as React from "react";

import { InitMagicTooltip, DeinitMagicTooltip, TooltipSpacing, IMagicTooltipContext } from "./types";

const MagicTooltipContext = React.createContext<IMagicTooltipContext>({
  dense: false,
  spacing: "1.5rem",
  denseSpacing: "0.875rem",
  visibleId: null,
  initMagicTooltip: () => undefined,
  deinitMagicTooltip: () => undefined,
});
const { Provider, Consumer } = MagicTooltipContext;
export { Provider, Consumer };
