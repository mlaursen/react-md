import type { CodeLanguage } from "@/components/RootProviders/CodeLanguageProvider.jsx";
import { useCodeLanguageContext } from "@/components/RootProviders/CodeLanguageProvider.jsx";
import { SegmentedButtonGroup } from "@/components/SegmentedButtonGroup.jsx";
import type { ReactElement } from "react";

const languages: readonly CodeLanguage[] = ["js", "ts"];

export function ConfigureCodeLanguage(): ReactElement {
  const { codeLanguage, setCodeLanguage } = useCodeLanguageContext();
  return (
    <SegmentedButtonGroup
      label="Code Language"
      items={languages}
      value={codeLanguage}
      setValue={setCodeLanguage}
    />
  );
}
