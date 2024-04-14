import { Blockquote } from "@/components/Blockquote.jsx";
import { InlineCode } from "@react-md/code/InlineCode";
import { cssUtils } from "@react-md/core/cssUtils";
import type { ReactElement } from "react";
import styles from "./AdditionalChanges.module.scss";
import { AdditionalChangesPanels } from "./AdditionalChangesPanels.js";
import { MaterialConfigChanges } from "./MaterialConfigChanges.js";
import { useMaterialIconsAndSymbols } from "./MaterialIconsAndSymbolsProvider.js";
import { isMaterialIconType } from "./searchParams.js";

export interface AdditionalChangesProps {
  isSvg?: boolean;
}

export function AdditionalChanges(
  props: AdditionalChangesProps
): ReactElement | null {
  const { isSvg } = props;

  const { iconType } = useMaterialIconsAndSymbols();
  const configDescription = isMaterialIconType(iconType)
    ? "icon family"
    : "symbol customizations";

  return (
    <>
      <Blockquote theme="info">
        <p>
          The current material {configDescription} do not match{" "}
          <InlineCode>react-md</InlineCode> defaults, so additional changes are
          required to use this icon.
        </p>
        {isSvg ? (
          <div
            className={cssUtils({
              className: styles.changes,
              fontStyle: "normal",
            })}
          >
            <MaterialConfigChanges />
          </div>
        ) : (
          <AdditionalChangesPanels />
        )}
      </Blockquote>
    </>
  );
}
