"use client";

import { Switch } from "@react-md/core/form/Switch";
import { useCollapseTransition } from "@react-md/core/transition/useCollapseTransition";
import { useToggle } from "@react-md/core/useToggle";
import { type ReactElement, useRef, useState } from "react";

import { MarkdownCode } from "@/components/MarkdownCode.jsx";

export interface ExpandableCodeBlockProps {
  code: string;
  sourceCode: string;
}

export function ExpandableCodeBlock({
  code,
  sourceCode,
}: ExpandableCodeBlockProps): ReactElement {
  const { toggle, toggled } = useToggle();
  const [currentCode, setCurrentCode] = useState(code);
  const nodeRef = useRef<HTMLDivElement>(null);
  const { elementProps } = useCollapseTransition({
    nodeRef,
    transitionIn: toggled,
    // the real min-height is `3.5rem`, but this allows for scrollbars to be visible
    minHeight: "5rem",
    onExited: () => {
      setCurrentCode(code);
    },
  });

  return (
    <>
      <Switch
        label="Full Source Code"
        checked={toggled}
        onChange={() => {
          toggle();
          setCurrentCode(sourceCode);
        }}
      />
      <MarkdownCode language="scss" containerProps={elementProps}>
        {currentCode}
      </MarkdownCode>
    </>
  );
}
