import * as React from "react";

import { InitMagicTooltip, DeinitMagicTooltip, TooltipSpacing, IMagicTooltipContext } from "./types";
import { DEFAULT_SPACING, DEFAULT_DENSE_SPACING } from "./constants";

const MagicTooltipContext = React.createContext<IMagicTooltipContext>({
  dense: false,
  spacing: DEFAULT_SPACING,
  denseSpacing: DEFAULT_DENSE_SPACING,
  visibleId: null,
  initMagicTooltip: () => undefined,
  deinitMagicTooltip: () => undefined,
});
const { Provider, Consumer } = MagicTooltipContext;
export { Provider, Consumer };
