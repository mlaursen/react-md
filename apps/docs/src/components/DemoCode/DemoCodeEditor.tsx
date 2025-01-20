"use client";

import { CodeBlockAppBar } from "@react-md/code/CodeBlockAppBar";
import { useTypescriptEnabledContext } from "@react-md/code/TypescriptEnabledProvider";
import {
  type RunnableCodeScope,
  type ScssCodeFile,
  type TypescriptCodeFile,
} from "@react-md/code/types";
import { useCodeEditHistory } from "@react-md/code/useCodeEditHistory";
import { TooltippedButton } from "@react-md/core/button/TooltippedButton";
import { Chip } from "@react-md/core/chip/Chip";
import { ToastManager } from "@react-md/core/snackbar/ToastManager";
import { ToastManagerProvider } from "@react-md/core/snackbar/ToastManagerProvider";
import { Tab } from "@react-md/core/tabs/Tab";
import { TabList } from "@react-md/core/tabs/TabList";
import { useTabs } from "@react-md/core/tabs/useTabs";
import { Slide } from "@react-md/core/transition/Slide";
import { useToggle } from "@react-md/core/useToggle";
import RefreshOutlinedIcon from "@react-md/material-icons/RefreshOutlinedIcon";
import { type ReactElement, useMemo, useRef } from "react";

import { ConfigureTypescriptEnabled } from "../MainLayout/ConfigureTypescriptEnabled.jsx";
import { DemoCodePreview } from "./DemoCodePreview.jsx";
import { type PreviewContainerOptions } from "./PreviewContainer.jsx";
import { ScssCodeEditor } from "./ScssCodeEditor.jsx";
import { TypescriptCodeEditor } from "./TypescriptCodeEditor.jsx";

export interface DemoCodeEditorProps extends PreviewContainerOptions {
  scope: RunnableCodeScope;
  demoName: string;
  tsCodeFile: TypescriptCodeFile;
  disableBox?: boolean;
  transparent?: boolean;
  forceDarkMode?: boolean;
  disablePadding?: boolean;
  scssCodeFile?: ScssCodeFile;
  startOnScss?: boolean;
}

export function DemoCodeEditor(props: DemoCodeEditorProps): ReactElement {
  const {
    card,
    phone,
    scope,
    demoName,
    tsCodeFile,
    disableBox,
    transparent,
    startOnScss,
    scssCodeFile,
    forceDarkMode,
    disablePadding,
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
  } = useTabs({
    defaultActiveTab: () => (scssCodeFile && startOnScss ? 1 : 0),
  });
  const { toggled: isCssVisible, toggle: toggleCssVisible } = useToggle();

  return (
    <ToastManagerProvider manager={toastManager}>
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
        {activeTab === 0 && <ConfigureTypescriptEnabled disableLabel />}
        {activeTab === 1 && (
          <Chip
            theme="outline"
            selected={isCssVisible}
            onClick={toggleCssVisible}
          >
            Show CSS
          </Chip>
        )}
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
      </CodeBlockAppBar>
      {!!scssCodeFile && (
        <TabList {...getTabListProps()} inline>
          <Tab {...getTabProps(0)}>
            {tsCodeFile.name.replace(".t", isTypescriptEnabled ? ".t" : ".j")}
          </Tab>
          <Tab {...getTabProps(1)}>{scssCodeFile.name}</Tab>
        </TabList>
      )}
      {!scssCodeFile && (
        <TypescriptCodeEditor
          code={code}
          editorRef={editorRef}
          editorProps={editorProps}
        />
      )}
      {scssCodeFile && (
        <div ref={getTabPanelsProps<HTMLDivElement>().ref}>
          <Slide {...getTabPanelProps(0)} timeout={0}>
            <TypescriptCodeEditor
              code={code}
              editorRef={editorRef}
              editorProps={editorProps}
            />
          </Slide>
          <Slide {...getTabPanelProps(1)} timeout={0}>
            <ScssCodeEditor
              key={`${toggled}`}
              demoName={demoName}
              isCssVisible={isCssVisible}
              scssCodeFile={scssCodeFile}
            />
          </Slide>
        </div>
      )}
    </ToastManagerProvider>
  );
}
