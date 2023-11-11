"use client";
import { useCodeLanguageContext } from "@/providers/CodeLanguageProvider.jsx";
import { type FakeScssModule } from "@/utils/fakeScssModules.js";
import { Box, Slide, Tab, TabList, useTabs } from "@react-md/core";
import { useEffect, type ReactElement } from "react";
import { CodeBlockHeader } from "./CodeBlockHeader.jsx";
import { CodeEditor } from "./CodeEditor/CodeEditor.jsx";
import { useCodeEditor } from "./CodeEditor/useCodeEditor.js";
import {
  RunnableCodePreview,
  type RunnableCodeAndPreviewOptions,
} from "./DangerouslyRunCode/RunnableCodePreview.jsx";
import styles from "./FullDemoEditor.module.scss";
import { ScssCodeEditor } from "./ScssCodeEditor.jsx";
import { type HighlightedTypescriptCode } from "./TypescriptCode.jsx";
import { ConfigureCodeLanguage } from "./WebsiteConfiguration/ConfigureCodeLanguage.jsx";

export interface FullDemoEditorProps extends HighlightedTypescriptCode {
  preview: RunnableCodeAndPreviewOptions;
  scssModules: readonly FakeScssModule[];
}

export function FullDemoEditor(props: FullDemoEditorProps): ReactElement {
  const { ts, js, preview, scssModules } = props;

  const { codeLanguage } = useCodeLanguageContext();
  const isTs = codeLanguage === "ts";
  const { getTabProps, getTabListProps, getTabPanelProps, getTabPanelsProps } =
    useTabs({
      tabs: ["demo", ...scssModules.map(({ fileName }) => fileName)],
      defaultActiveTab: "demo",
    });
  const { code, setCode, textAreaProps } = useCodeEditor(isTs ? ts : js);
  useEffect(() => {
    setCode(isTs ? ts : js);
  }, [isTs, js, setCode, ts, codeLanguage]);

  return (
    <>
      <RunnableCodePreview code={code} {...preview} />
      <Box align="start" stacked disablePadding className={styles.container}>
        <CodeBlockHeader>
          <ConfigureCodeLanguage disableLabel />
        </CodeBlockHeader>
        <TabList {...getTabListProps()} inline>
          <Tab {...getTabProps("demo")}>{`Demo.${codeLanguage}x`}</Tab>
          {scssModules.map(({ fileName }) => (
            <Tab
              key={fileName}
              {...getTabProps(fileName)}
              className={styles.tab}
            >
              {fileName}
            </Tab>
          ))}
        </TabList>
      </Box>
      <div ref={getTabPanelsProps<HTMLDivElement>().ref}>
        <Slide {...getTabPanelProps("demo")} timeout={0}>
          <CodeEditor
            lang={`${codeLanguage}x`}
            code={code}
            textAreaProps={textAreaProps}
            disableMarginTop
          />
        </Slide>
        {scssModules.map((scssModule) => (
          <Slide
            key={scssModule.scss}
            {...getTabProps(scssModule.fileName)}
            timeout={0}
          >
            <ScssCodeEditor
              {...scssModule}
              preProps={{ className: styles.code }}
            />
          </Slide>
        ))}
      </div>
    </>
  );
}
