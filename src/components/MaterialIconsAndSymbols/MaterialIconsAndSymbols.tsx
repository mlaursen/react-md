import {
  MaterialIconsProvider,
  MaterialSymbolsProvider,
  NoSsr,
} from "@react-md/core";
import type { ReactElement } from "react";
import { FullScreenVirtualizedList } from "./FullScreenVirtualizedList";
import { HeaderControls } from "./HeaderControls";
import { HowToUse } from "./HowToUse";
import { RebuildIcons } from "./RebuildIcons";
import { MaterialStateProvider, useMaterialState } from "./useMaterialState";

export default function MaterialIconsAndSymbols(): ReactElement {
  const { context, iconFamily, symbolFamily, getRadioProps } =
    useMaterialState();

  return (
    <MaterialStateProvider value={context}>
      <HeaderControls getRadioProps={getRadioProps} />
      <NoSsr>
        <MaterialSymbolsProvider family={symbolFamily}>
          <MaterialIconsProvider value={iconFamily}>
            <HowToUse>
              <FullScreenVirtualizedList />
            </HowToUse>
          </MaterialIconsProvider>
        </MaterialSymbolsProvider>
      </NoSsr>
      {process.env.NODE_ENV !== "production" && <RebuildIcons />}
    </MaterialStateProvider>
  );
}
