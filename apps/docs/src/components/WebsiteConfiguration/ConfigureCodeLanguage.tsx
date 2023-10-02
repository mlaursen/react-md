"use client";
import { SegmentedButtonGroup } from "@/components/SegmentedButtonGroup.jsx";
import {
  CODE_LANGUAGES,
  useCodeLanguageContext,
  type CodeLanguage,
} from "@/providers/CodeLanguageProvider.jsx";
import { type ReactElement } from "react";
import {
  SegmentedButtons,
  type SegmentedButtonsProps,
} from "../SegmentedButtons.jsx";

export interface ConfigureCodeLanguageProps {
  disableLabel?: boolean;
}

export function ConfigureCodeLanguage(
  props: ConfigureCodeLanguageProps
): ReactElement {
  const { disableLabel } = props;
  const { codeLanguage, setCodeLanguage } = useCodeLanguageContext();
  const sharedProps: SegmentedButtonsProps<CodeLanguage> = {
    items: CODE_LANGUAGES,
    value: codeLanguage,
    setValue: setCodeLanguage,
  };
  if (disableLabel) {
    return <SegmentedButtons {...sharedProps} disableFullWidth />;
  }

  return <SegmentedButtonGroup label="Code Language" {...sharedProps} />;
}
