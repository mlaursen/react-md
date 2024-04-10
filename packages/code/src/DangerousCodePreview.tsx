import { type ReactElement } from "react";
import {
  CodePreview,
  type ConfigurableCodePreviewProps,
} from "./CodePreview.js";
import {
  useDangerouslyRunnableCode,
  type DangerouslyRunCodeOptions,
} from "./useDangerousCodeRunner.js";

export interface DangerousCodePreviewProps
  extends ConfigurableCodePreviewProps,
    DangerouslyRunCodeOptions {}

export function DangerousCodePreview(
  props: DangerousCodePreviewProps
): ReactElement {
  const { code, scope, onRendered, ...remaining } = props;

  const { error, element } = useDangerouslyRunnableCode({
    code,
    scope,
    onRendered,
  });

  return (
    <CodePreview {...remaining} error={error?.message}>
      {element}
    </CodePreview>
  );
}
