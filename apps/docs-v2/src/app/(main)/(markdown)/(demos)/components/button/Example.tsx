"use client";
import { CodeEditor } from "@/components/CodeEditor.jsx";
import { type CodeFile, type RunnableCodeScope } from "@react-md/code/types";
import * as button from "@react-md/core/button/Button";
import { type ReactElement } from "react";

const scope: RunnableCodeScope = {
  import: {
    "@react-md/core/button/Button": button,
  },
};

const code = `import { Button } from "@react-md/core/button/Button";
import { type ReactElement } from "react";

export default function SimpleButton(): ReactElement {
  return (
    <>
      <Button themeType="flat">Button</Button>
      <Button themeType="outline">Button</Button>
      <Button themeType="contained">Button</Button>
    </>
  );
}
`;

const files: CodeFile[] = [{ name: "SimpleButton.tsx", lang: "tsx", code }];

export default function Exmaple1(): ReactElement {
  return <CodeEditor scope={scope} files={files} />;
}
