import { getTransformedNpmCode } from "docs-generator/utils/transformNpmCode";
import { type ReactElement } from "react";

import { MarkdownCode } from "@/components/MarkdownCode.js";
import { getPackageManagerJsx } from "@/components/PackageManagerCodeBlock/getPackageManagerJsx.js";
import { TransformTypescriptCodeBlock } from "@/components/TransformTypescriptCodeBlock.js";

import { RenderFramework } from "./RenderFramework.js";
import { TestFrameworkNpmCode } from "./TestFrameworkNpmCode.js";
import { TestFrameworksToggle } from "./TestFrameworksToggle.js";
import { type TestFramework } from "./constants.js";

export interface TestFrameworkCodeBlockProps {
  lang: "sh" | "tsx" | "diff";
  code: Record<TestFramework, string>;
  fileName?: string | Record<TestFramework, string>;
}

export default async function TestFrameworkCodeBlock({
  lang,
  code,
  fileName: propFileName,
}: TestFrameworkCodeBlockProps): Promise<ReactElement> {
  let { jest, vitest } = code;
  if (lang !== "diff") {
    jest = jest.trim();
    vitest = vitest.trim();
  }

  let fileName: Record<TestFramework, string> | undefined;
  if (typeof propFileName === "string") {
    fileName = {
      jest: propFileName,
      vitest: propFileName,
    };
  } else if (propFileName) {
    fileName = propFileName;
  }

  if (lang === "sh") {
    return (
      <TestFrameworkNpmCode
        frameworks={{
          jest: getPackageManagerJsx({
            managers: getTransformedNpmCode(jest),
          }),
          vitest: getPackageManagerJsx({
            managers: getTransformedNpmCode(vitest),
          }),
        }}
      />
    );
  }

  if (lang === "diff") {
    return (
      <RenderFramework
        frameworks={{
          jest: (
            <MarkdownCode
              language="diff"
              fileName={fileName?.jest}
              appBarChildren={<TestFrameworksToggle />}
            >
              {jest}
            </MarkdownCode>
          ),
          vitest: (
            <MarkdownCode
              language="diff"
              fileName={fileName?.vitest}
              appBarChildren={<TestFrameworksToggle />}
            >
              {vitest}
            </MarkdownCode>
          ),
        }}
      />
    );
  }

  return (
    <RenderFramework
      frameworks={{
        jest: (
          <TransformTypescriptCodeBlock
            fileName={fileName?.jest}
            code={jest}
            isTsx
            appBarChildren={<TestFrameworksToggle />}
          />
        ),
        vitest: (
          <TransformTypescriptCodeBlock
            fileName={fileName?.vitest}
            code={vitest}
            isTsx
            appBarChildren={<TestFrameworksToggle />}
          />
        ),
      }}
    />
  );
}
