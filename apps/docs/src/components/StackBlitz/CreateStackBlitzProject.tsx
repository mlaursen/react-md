import { type ReadonlyCodeFile } from "@react-md/code/types";
import { TooltippedButton } from "@react-md/core/button/TooltippedButton";
import { type ReactElement } from "react";
import "server-only";

import { type DemoCodeEditorProps } from "@/components/DemoCode/DemoCodeEditor.js";
import {
  JS_STACKBLITZ_TEMPLATE,
  TS_STACKBLITZ_TEMPLATE,
} from "@/generated/stackblitz.js";

import { HiddenInput } from "./HiddenInput.js";
import { StackBlitzForm } from "./StackBlitzForm.js";
import { StackBlitzIcon } from "./StackBlitzIcon.js";

export interface CreateStackBlitzProjectProps extends Pick<
  DemoCodeEditorProps,
  | "tsCodeFile"
  | "scssCodeFile"
  | "demoName"
  | "disableBox"
  | "disablePadding"
  | "forceDarkMode"
> {
  title: string;
  dependencies: readonly string[];
  readOnlyFiles?: readonly ReadonlyCodeFile[];
  readOnlyImports?: Readonly<Record<string, string>>;
}

type TemplateFile = (typeof JS_STACKBLITZ_TEMPLATE)[number];

export function CreateStackBlitzProject(
  props: CreateStackBlitzProjectProps
): ReactElement {
  const {
    tsCodeFile,
    scssCodeFile,
    title,
    demoName,
    disableBox,
    disablePadding,
    forceDarkMode,
    readOnlyFiles = [],
    readOnlyImports = {},
    dependencies,
  } = props;

  const otherTemplateFiles: TemplateFile[] = [
    { name: "project[template]", value: "node" },
    { name: "project[title]", value: `react-md - ${title}` },
  ];
  if (scssCodeFile) {
    otherTemplateFiles.push({
      name: "project[files][src/components/App.module.scss]",
      value: scssCodeFile.code,
    });
  }

  const javascriptTemplateFiles: TemplateFile[] = [...JS_STACKBLITZ_TEMPLATE];
  const typescriptTemplateFiles: TemplateFile[] = [...TS_STACKBLITZ_TEMPLATE];
  for (const codeFile of readOnlyFiles) {
    const { code, lang } = codeFile;
    const remappedName = readOnlyImports[codeFile.name.replace(/\.t/, ".j")];
    if (!remappedName) {
      throw new Error(`Unable to find name for ${codeFile.name}`);
    }

    const name = `project[files][${remappedName.replace(/^@/, "src")}]`;
    if (lang === "ts" || lang === "tsx") {
      const jsCode = "compiled" in codeFile ? codeFile.compiled : code;
      javascriptTemplateFiles.push({
        name,
        value: jsCode,
      });
      typescriptTemplateFiles.push({
        name: name.replace(/\.j/, ".t"),
        value: code,
      });
    } else {
      otherTemplateFiles.push({
        name,
        value: code,
      });
    }
  }

  const sharedInputProps = {
    demoName,
    disableBox,
    disablePadding,
    forceDarkMode,
    dependencies,
  };

  return (
    <StackBlitzForm
      javascript={javascriptTemplateFiles.map((file) => (
        <HiddenInput
          key={file.name}
          {...file}
          {...sharedInputProps}
          demoCode={tsCodeFile.compiled}
        />
      ))}
      typescript={typescriptTemplateFiles.map((file) => (
        <HiddenInput
          key={file.name}
          {...file}
          {...sharedInputProps}
          demoCode={tsCodeFile.code}
        />
      ))}
    >
      {otherTemplateFiles.map(({ name, value }) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}
      <TooltippedButton
        type="submit"
        tooltip="Open in StackBlitz"
        iconSize="small"
      >
        <StackBlitzIcon />
      </TooltippedButton>
    </StackBlitzForm>
  );
}
