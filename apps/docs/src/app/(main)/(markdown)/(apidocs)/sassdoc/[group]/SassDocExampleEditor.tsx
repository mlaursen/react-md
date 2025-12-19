"use client";

import { CodeBlockAppBar } from "@react-md/code/CodeBlockAppBar";
import { type ScssCodeFile } from "@react-md/code/types";
import { TooltippedButton } from "@react-md/core/button/TooltippedButton";
import { Chip } from "@react-md/core/chip/Chip";
import { useToggle } from "@react-md/core/useToggle";
import RefreshOutlinedIcon from "@react-md/material-icons/RefreshOutlinedIcon";
import { type ReactElement } from "react";

import { ScssCodeEditor } from "@/components/DemoCode/ScssCodeEditor.js";

export interface SassDocExampleEditorProps {
  scssCodeFile: ScssCodeFile;
}

export function SassDocExampleEditor({
  scssCodeFile,
}: SassDocExampleEditorProps): ReactElement {
  const { toggled: isCssVisible, toggle: toggleCssVisible } = useToggle();
  const { toggled, toggle: reset } = useToggle();

  return (
    <>
      <CodeBlockAppBar>
        <Chip
          theme="outline"
          selected={isCssVisible}
          onClick={toggleCssVisible}
        >
          Show CSS
        </Chip>
        <TooltippedButton
          tooltip="Reset the demo"
          onClick={() => {
            reset();
          }}
        >
          <RefreshOutlinedIcon />
        </TooltippedButton>
      </CodeBlockAppBar>
      <ScssCodeEditor
        key={`${toggled}`}
        demoName="Demo"
        isCssVisible={isCssVisible}
        scssCodeFile={scssCodeFile}
      />
    </>
  );
}
