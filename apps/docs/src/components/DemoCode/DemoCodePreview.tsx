"use client";

import { CodePreview } from "@react-md/code/CodePreview";
import { type DangerousCodePreviewProps } from "@react-md/code/DangerousCodePreview";
import { useDangerouslyRunnableCode } from "@react-md/code/useDangerousCodeRunner";
import { type ReactElement } from "react";

import {
  PreviewContainer,
  type PreviewContainerOptions,
} from "./PreviewContainer.jsx";

export interface DemoCodePreviewProps
  extends DangerousCodePreviewProps,
    PreviewContainerOptions {}

export function DemoCodePreview(props: DemoCodePreviewProps): ReactElement {
  const { card, phone, code, scope, onRendered, ...remaining } = props;
  const { error, element } = useDangerouslyRunnableCode({
    code,
    scope,
    onRendered,
  });

  return (
    <CodePreview {...remaining} error={error?.message}>
      <PreviewContainer card={card} phone={phone}>
        {element}
      </PreviewContainer>
    </CodePreview>
  );
}
