"use client";
import { Card } from "@react-md/core";
import { type PropsWithChildren, type ReactElement } from "react";
import { useDangerouslyRunnableCode } from "../DangerouslyRunCode/useDangerouslyRunnableCode.jsx";
import { type RunnableCodeScope } from "../DangerouslyRunCode/utils.jsx";
import { CodePreviewContainer } from "./CodePreviewContainer.jsx";

export interface CodePreviewProps {
  code: string;
  scope?: RunnableCodeScope;
  card?: boolean;
  cardClassName?: string;
}

function Wrapper(
  props: PropsWithChildren<{ card?: boolean; cardClassName?: string }>
): ReactElement {
  const { card, cardClassName, children } = props;
  if (!card) {
    return <>{children}</>;
  }

  return <Card className={cardClassName}>{children}</Card>;
}

export function CodePreview(props: CodePreviewProps): ReactElement {
  const { code, scope, card, cardClassName } = props;

  const { element, error } = useDangerouslyRunnableCode({ code, scope });
  return (
    <CodePreviewContainer error={error?.message}>
      <Wrapper card={card} cardClassName={cardClassName}>
        {element}
      </Wrapper>
    </CodePreviewContainer>
  );
}
