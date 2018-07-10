import * as React from "react";

export interface IMagicTooltipContext {
  dense: boolean;
  spacing: string | number;
  denseSpacing: string | number;
  visibleId: string | null;
  init: (id: string) => void;
  deinit: (id: string) => void;
}

const MagicTooltipContext = React.createContext({
  dense: false,
  spacing: "1.5rem",
  denseSpacing: "0.875rem",
  visibleId: null,
  // tslint:disable-next-line no-empty
  init: () => {},
  // tslint:disable-next-line no-empty
  deinit: () => {},
} as IMagicTooltipContext);
const { Provider, Consumer } = MagicTooltipContext;
export { Provider, Consumer };
