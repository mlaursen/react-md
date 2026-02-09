import Link from "next/link.js";
import { type ReactElement } from "react";

import { Blockquote } from "@/components/Blockquote.js";

import { AdditionalChanges } from "./AdditionalChanges.js";
import { IconImportAndUsage } from "./IconImportAndUsage.js";
import { useMaterialIconsAndSymbols } from "./MaterialIconsAndSymbolsProvider.js";

export function MaterialSymbolUsage(): ReactElement {
  const { isFontFamilyChanged, isSymbolCustomizationChanged } =
    useMaterialIconsAndSymbols();
  return (
    <>
      <Blockquote theme="info">
        Check out the{" "}
        <Link href="/customization/material-symbols">
          Material Symbols setup page
        </Link>{" "}
        for Next.js and vite utilities to help with setup.
      </Blockquote>
      <IconImportAndUsage />
      {(isSymbolCustomizationChanged || isFontFamilyChanged) && (
        <AdditionalChanges />
      )}
    </>
  );
}
