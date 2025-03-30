"use client";

import { CodeBlockAppBar } from "@react-md/code/CodeBlockAppBar";
import { useTypescriptEnabledContext } from "@react-md/code/TypescriptEnabledProvider";
import {
  type RunnableCodeScope,
  type ScssCodeFile,
  type TypescriptCodeFile,
} from "@react-md/code/types";
import { useCodeEditHistory } from "@react-md/code/useCodeEditHistory";
import { Box } from "@react-md/core/box/Box";
import { TooltippedButton } from "@react-md/core/button/TooltippedButton";
import { Chip } from "@react-md/core/chip/Chip";
import { MenuConfigurationProvider } from "@react-md/core/menu/MenuConfigurationProvider";
import { ToastManager } from "@react-md/core/snackbar/ToastManager";
import { ToastManagerProvider } from "@react-md/core/snackbar/ToastManagerProvider";
import { Tab } from "@react-md/core/tabs/Tab";
import { TabList } from "@react-md/core/tabs/TabList";
import { useTabs } from "@react-md/core/tabs/useTabs";
import { Slide } from "@react-md/core/transition/Slide";
import { useToggle } from "@react-md/core/useToggle";
import EditOffIcon from "@react-md/material-icons/EditOffIcon";
import RefreshOutlinedIcon from "@react-md/material-icons/RefreshOutlinedIcon";
import { type ReactElement, type ReactNode, useMemo, useRef } from "react";

import { GithubLink } from "../GithubLink.jsx";
import { ConfigureTypescriptEnabled } from "../MainLayout/ConfigureTypescriptEnabled.jsx";
import styles from "./DemoCodeEditor.module.scss";
import { DemoCodePreview } from "./DemoCodePreview.jsx";
import { type PreviewContainerOptions } from "./PreviewContainer.jsx";
import { ScssCodeEditor } from "./ScssCodeEditor.jsx";
import { TypescriptCodeEditor } from "./TypescriptCodeEditor.jsx";

export interface DemoCodeEditorProps extends PreviewContainerOptions {
  scope: RunnableCodeScope;
  source: string;
  demoName: string;
  tsCodeFile: TypescriptCodeFile;
  disableBox?: boolean;
  transparent?: boolean;
  forceDarkMode?: boolean;
  disablePadding?: boolean;
  scssCodeFile?: ScssCodeFile;
  startOnScss?: boolean;
  readOnlyFiles?: readonly ReactElement[];
  readOnlyFileNames?: readonly string[];
  beforeSourceLinkChildren?: ReactNode;
}

export function DemoCodeEditor(props: DemoCodeEditorProps): ReactElement {
  const {
    card,
    phone,
    scope,
    demoName,
    source,
    tsCodeFile,
    disableBox,
    transparent,
    startOnScss,
    scssCodeFile,
    forceDarkMode,
    disablePadding,
    beforeSourceLinkChildren,
    readOnlyFiles = [],
    readOnlyFileNames = [],
  } = props;

  const toastManager = useMemo(() => new ToastManager(), []);
  const { toggled, toggle: resetPreview } = useToggle();
  const { isTypescriptEnabled } = useTypescriptEnabledContext();

  const defaultCode = isTypescriptEnabled
    ? tsCodeFile.code
    : tsCodeFile.compiled;
  const { code, setCode, editorRef, editorProps } = useCodeEditHistory({
    defaultCode,
  });
  const prevTypescriptEnabled = useRef(isTypescriptEnabled);
  if (prevTypescriptEnabled.current !== isTypescriptEnabled) {
    prevTypescriptEnabled.current = isTypescriptEnabled;
    setCode(defaultCode);
  }

  const {
    activeTab,
    getTabProps,
    getTabListProps,
    getTabPanelProps,
    getTabPanelsProps,
  } = useTabs<number>({
    defaultActiveTab: () => (scssCodeFile && startOnScss ? 1 : 0),
  });
  const { toggled: isCssVisible, toggle: toggleCssVisible } = useToggle();
  const isScssFile = !!scssCodeFile;
  const isMultiFile = isScssFile || !!readOnlyFileNames.length;
  const startIndex = isScssFile ? 2 : 0;
  const isTypescriptFileActive =
    activeTab === 0 ||
    /\.(j|t)sx?$/.test(readOnlyFileNames[activeTab - startIndex] || "");

  return (
    <ToastManagerProvider manager={toastManager}>
      <MenuConfigurationProvider renderAsSheet={false}>
        <DemoCodePreview
          key={`${toggled}`}
          code={code.replace("Demo.module.scss", `${demoName}.module.scss`)}
          card={card}
          scope={scope}
          phone={phone}
          disableBox={disableBox}
          transparent={transparent}
          forceDarkMode={forceDarkMode}
          disablePadding={disablePadding}
        />
        <CodeBlockAppBar>
          {isTypescriptFileActive && (
            <ConfigureTypescriptEnabled disableLabel />
          )}
          {activeTab === 1 && (
            <Chip
              theme="outline"
              selected={isCssVisible}
              onClick={toggleCssVisible}
            >
              Show CSS
            </Chip>
          )}
          <Box className={styles.end} disablePadding disableWrap>
            {beforeSourceLinkChildren}
            <GithubLink
              file={source}
              iconSize="small"
              tooltipOptions={{ defaultPosition: "below" }}
            />
            <TooltippedButton
              tooltip="Reset the demo"
              onClick={() => {
                resetPreview();
                setCode(
                  isTypescriptEnabled ? tsCodeFile.code : tsCodeFile.compiled
                );
              }}
            >
              <RefreshOutlinedIcon />
            </TooltippedButton>
          </Box>
        </CodeBlockAppBar>
        {isMultiFile && (
          <TabList
            {...getTabListProps()}
            inline
            fullWidthTabs={false}
            scrollButtons={readOnlyFileNames.length > 0 ? "auto" : false}
          >
            <Tab {...getTabProps(0)}>
              {tsCodeFile.name.replace(".t", isTypescriptEnabled ? ".t" : ".j")}
            </Tab>
            {scssCodeFile && <Tab {...getTabProps(1)}>{scssCodeFile.name}</Tab>}
            {readOnlyFileNames.map((fileName, i) => {
              let name = fileName;
              if (!isTypescriptEnabled) {
                name = name.replace(/\.ts/, ".js");
              }
              return (
                <Tab
                  key={fileName}
                  {...getTabProps(i + startIndex)}
                  icon={<EditOffIcon />}
                >
                  {name}
                </Tab>
              );
            })}
          </TabList>
        )}
        {!isMultiFile && (
          <TypescriptCodeEditor
            code={code}
            editorRef={editorRef}
            editorProps={editorProps}
          />
        )}
        {isMultiFile && (
          <div ref={getTabPanelsProps<HTMLDivElement>().ref}>
            <Slide {...getTabPanelProps(0)} timeout={0}>
              <TypescriptCodeEditor
                code={code}
                editorRef={editorRef}
                editorProps={editorProps}
              />
            </Slide>
            {scssCodeFile && (
              <Slide {...getTabPanelProps(1)} timeout={0}>
                <ScssCodeEditor
                  key={`${toggled}`}
                  demoName={demoName}
                  isCssVisible={isCssVisible}
                  scssCodeFile={scssCodeFile}
                />
              </Slide>
            )}
            {!!readOnlyFiles.length &&
              readOnlyFiles.map((file, i) => (
                <Slide
                  key={i}
                  {...getTabPanelProps(i + startIndex)}
                  timeout={0}
                >
                  {file}
                </Slide>
              ))}
          </div>
        )}
      </MenuConfigurationProvider>
    </ToastManagerProvider>
  );
}
