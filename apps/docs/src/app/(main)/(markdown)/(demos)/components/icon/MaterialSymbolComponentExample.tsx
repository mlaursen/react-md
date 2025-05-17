import { MaterialSymbol } from "@react-md/core/icon/MaterialSymbol";
import { type ReactElement } from "react";

export default function MaterialSymbolComponentExample(): ReactElement {
  return (
    <>
      <MaterialSymbol name="play_circle" />
      <MaterialSymbol name="play_circle" opticalSize={20} />
      <MaterialSymbol name="play_circle" weight={700} />
      <MaterialSymbol
        name="play_circle"
        grade={200}
        family="rounded"
        fill={1}
      />
    </>
  );
}
