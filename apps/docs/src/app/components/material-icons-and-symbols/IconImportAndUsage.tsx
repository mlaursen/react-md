import { type ReactElement } from "react";
import { CopyCode } from "./CopyCode.jsx";
import { useMaterialIconsAndSymbols } from "./MaterialIconsAndSymbolsProvider.jsx";

export function IconImportAndUsage(): ReactElement | null {
  const { selectedIconName, iconType } = useMaterialIconsAndSymbols();
  if (!selectedIconName) {
    return null;
  }

  const component = `Material${iconType === "symbol" ? "Symbol" : "Icon"}`;
  const importCode = `import { Material${component} } from "react-md"`;
  const usageCode = `<${component} name="${selectedIconName}" />`;

  return (
    <>
      <CopyCode>{importCode}</CopyCode>
      <CopyCode>{usageCode}</CopyCode>
    </>
  );
}
