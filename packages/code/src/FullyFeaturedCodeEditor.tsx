"use client";
import { Menu } from "@react-md/core/menu/Menu";
import { MenuItem } from "@react-md/core/menu/MenuItem";
import { useContextMenu } from "@react-md/core/menu/useContextMenu";
import { Overlay } from "@react-md/core/overlay/Overlay";
import { Snackbar } from "@react-md/core/snackbar/Snackbar";
import { ToastManager } from "@react-md/core/snackbar/ToastManager";
import { ToastManagerProvider } from "@react-md/core/snackbar/ToastManagerProvider";
import { useTabs } from "@react-md/core/tabs/useTabs";
import { useAsyncAction } from "@react-md/core/useAsyncAction";
import RestoreIcon from "@react-md/material-icons/RestoreIcon";
import {
  type ElementType,
  type ReactNode,
  useMemo,
  useRef,
  useState,
  type ReactElement,
  type ComponentType,
  Fragment,
  type PropsWithChildren,
} from "react";
import { CodeEditor } from "./CodeEditor.js";
import { CodeBlockAppBar } from "./CodeBlockAppBar.js";
import { CodeEditorCopyToClipboard } from "./CodeEditorCopyToClipboard.js";
import { CodeEditorFixedActions } from "./CodeEditorFixedActions.js";
import { CodeEditorProgress } from "./CodeEditorProgress.js";
import { CopyToClipboard } from "./CopyToClipboard.js";
import { DangerousCodePreview } from "./DangerousCodePreview.js";
import { FormatCodeMenuItem } from "./FormatCodeMenuItem.js";
import {
  type FormatCode,
  type HighlightCode,
  type RunnableCodeScope,
  type SupportedCodeLanguage,
} from "./types.js";
import { useCodeEditHistory } from "./useCodeEditHistory.js";
import { useFocusCodeEditor } from "./useFocusCodeEditor.js";
import { TabList } from "@react-md/core/tabs/TabList";
import { Tab } from "@react-md/core/tabs/Tab";

export interface CodeFile {
  name: string;
  code: string;
  lang: SupportedCodeLanguage;
  scope?: RunnableCodeScope;
}

export interface FullyFeaturedCodeEditorProps {
  files: readonly CodeFile[];
  scope?: RunnableCodeScope;
  defaultActiveFile?: number;
  formatCode: FormatCode;
  highlightCode: HighlightCode;
  CodePreviewContainer?: ComponentType<PropsWithChildren>;
}

export function FullyFeaturedCodeEditor(
  props: FullyFeaturedCodeEditorProps
): ReactElement {
  const {
    files,
    scope,
    defaultActiveFile = 0,
    formatCode,
    highlightCode,
    CodePreviewContainer = Fragment,
  } = props;
  const {
    getTabProps,
    getTabListProps,
    getTabPanelProps,
    getTabPanelsProps,
    activeTab,
  } = useTabs({
    defaultActiveTab: defaultActiveFile,
  });
  const toastManager = useMemo(() => new ToastManager(), []);

  const activeFile = files[activeTab];
  const activeFileCode = activeFile?.code ?? "";
  const activeFileName = activeFile?.name ?? "";
  const activeFileLang = activeFile?.lang ?? "md";
  const activeFileScope = activeFile?.scope;

  const { code, setCode, editorRef, editorProps } = useCodeEditHistory({
    defaultCode: activeFileCode,
  });
  const { focusEditorProps, onEditorKeyDown } = useFocusCodeEditor({
    editorRef,
    onEditorKeyDown: editorProps.onKeyDown,
  });
  const { menuProps, onContextMenu } = useContextMenu();
  const { handleAsync, pending } = useAsyncAction();
  const isChanged = activeFileCode !== code && !pending;
  const [selectedCode, setSelectedCode] = useState("");

  const prevFiles = useRef(files);
  if (prevFiles.current !== files) {
    prevFiles.current = files;
    setCode(activeFileCode);
  }

  const resolvedScope = useMemo<RunnableCodeScope>(
    () => ({
      ...scope,
      ...activeFileScope,
    }),
    [activeFileScope, scope]
  );
  const [codeError, setCodeError] = useState(false);

  return (
    <ToastManagerProvider manager={toastManager}>
      <DangerousCodePreview
        code={code}
        scope={resolvedScope}
        onRendered={(error) => setCodeError(!!error)}
        Container={CodePreviewContainer}
      />
      <CodeBlockAppBar></CodeBlockAppBar>
      <CodeEditor
        disableMarginTop
        highlightCode={highlightCode}
        language={activeFileLang}
        editorProps={{
          ...editorProps,
          value: code,
          onContextMenu,
          onKeyDown: onEditorKeyDown,
          onSelect(event) {
            const { value, selectionStart, selectionEnd } = event.currentTarget;
            setSelectedCode(value.slice(selectionStart, selectionEnd));
            // console.log("SELECT", value.slice(selectionStart, selectionEnd));
          },
        }}
        focusEditorProps={focusEditorProps}
        fixedChildren={
          <>
            <CodeEditorFixedActions>
              {!!selectedCode && (
                <CopyToClipboard getCopyText={() => selectedCode} />
              )}
              <CopyToClipboard getCopyText={() => code} />
            </CodeEditorFixedActions>
            <CodeEditorCopyToClipboard
              getCopyText={() => code}
              style={{ display: "none" }}
            />
            {pending && <CodeEditorProgress />}
            <Snackbar position="top-right" absolute disablePortal />
          </>
        }
      >
        {code}
      </CodeEditor>
      <Menu {...menuProps}>
        <Overlay visible noOpacity />
        <MenuItem
          leftAddon={<RestoreIcon />}
          onClick={() => setCode(activeFileCode)}
          disabled={!isChanged}
        >
          Reset Demo Code
        </MenuItem>
        <FormatCodeMenuItem
          disabled={!isChanged || codeError}
          onClick={handleAsync(async (_event) => {
            const formatted = await formatCode({ code, lang: activeFileLang });
            setCode(formatted);
          })}
        />
      </Menu>
    </ToastManagerProvider>
  );
}
