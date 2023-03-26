import { NoSsr } from "@react-md/core";
import type { ReactElement } from "react";

import { FullScreenVirtualizedList } from "./FullScreenVirtualizedList";
import { HeaderControls } from "./HeaderControls";
import { MaterialIconsAndSymbolsProvider } from "./MaterialIconsAndSymbolsProvider";
import { RebuildIcons } from "./RebuildIcons";

export default function MaterialIconsAndSymbols(): ReactElement {
  return (
    <MaterialIconsAndSymbolsProvider>
      <HeaderControls />
      <NoSsr>
        <FullScreenVirtualizedList />
      </NoSsr>
      {process.env.NODE_ENV !== "production" && <RebuildIcons />}
    </MaterialIconsAndSymbolsProvider>
  );
}
