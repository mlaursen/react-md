import { SegmentedButtonGroup } from "@/components/SegmentedButtonGroup.jsx";
import {
  CODE_LANGUAGES,
  useCodeLanguageContext,
} from "@/providers/CodeLanguageProvider.jsx";
import { type ReactElement } from "react";

export function ConfigureCodeLanguage(): ReactElement {
  const { codeLanguage, setCodeLanguage } = useCodeLanguageContext();
  return (
    <SegmentedButtonGroup
      label="Code Language"
      items={CODE_LANGUAGES}
      value={codeLanguage}
      setValue={setCodeLanguage}
    />
  );
}
