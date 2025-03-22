import { Fragment, type ReactElement } from "react";
import { type CompiledExample } from "sassdoc-generator/types";

import { LinkableHeading } from "@/components/LinkableHeading.jsx";
import { MarkdownCode } from "@/components/MarkdownCode.jsx";
import { slug } from "@/utils/slug.js";

import { SassDocExampleEditor } from "./SassDocExampleEditor.jsx";

export interface SassDocExamplesProps {
  itemId: string;
  examples: readonly CompiledExample[] | undefined;
}

export function SassDocExamples({
  itemId,
  examples,
}: SassDocExamplesProps): ReactElement | null {
  if (!examples?.length) {
    return null;
  }

  return (
    <>
      <LinkableHeading id={`${itemId}-examples`} level={3}>
        Examples
      </LinkableHeading>
      {examples.map((example, i) => {
        const { code, type, compiled, description } = example;

        return (
          <Fragment key={i}>
            {description && (
              <LinkableHeading
                id={slug(`${itemId}-example-${description}`)}
                level={4}
              >
                {description}
              </LinkableHeading>
            )}
            {type === "scss" && !!compiled && (
              <SassDocExampleEditor
                scssCodeFile={{
                  code,
                  compiled,
                  lang: "scss",
                  name: "Demo.scss",
                }}
              />
            )}
            {!compiled && (
              <MarkdownCode className={`language-${type}`}>{code}</MarkdownCode>
            )}
          </Fragment>
        );
      })}
    </>
  );
}
