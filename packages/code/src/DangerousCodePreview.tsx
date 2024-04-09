import {
  Fragment,
  type ComponentType,
  type PropsWithChildren,
  type ReactElement,
} from "react";
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
    DangerouslyRunCodeOptions {
  Container?: ComponentType<PropsWithChildren>;
}

export function DangerousCodePreview(
  props: DangerousCodePreviewProps
): ReactElement {
  const { code, scope, onRendered, Container = Fragment, ...remaining } = props;

  const { error, element } = useDangerouslyRunnableCode({
    code,
    scope,
    onRendered,
  });

  return (
    <CodePreview {...remaining} error={error?.message}>
      <Container>{element}</Container>
    </CodePreview>
  );
}
