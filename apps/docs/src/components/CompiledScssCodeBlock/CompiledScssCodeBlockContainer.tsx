"use client";

import {
  CodeBlockAppBar,
  type CodeBlockAppBarProps,
} from "@react-md/code/CodeBlockAppBar";
import { Chip } from "@react-md/core/chip/Chip";
import { useToggle } from "@react-md/core/useToggle";
import { DISPLAY_NONE_CLASS } from "@react-md/core/utils/isElementVisible";
import { cnb } from "cnbuilder";
import { type ReactElement, type ReactNode } from "react";

export interface CompiledScssCodeBlockContainerProps {
  css: ReactNode;
  scss: ReactNode;
  fileName?: ReactNode;
  appBarProps?: CodeBlockAppBarProps;
  appBarChildren?: ReactNode;
}

export function CompiledScssCodeBlockContainer(
  props: Readonly<CompiledScssCodeBlockContainerProps>
): ReactElement {
  const { css, scss, appBarProps, appBarChildren, fileName } = props;
  const { toggle, toggled } = useToggle();

  return (
    <>
      <CodeBlockAppBar {...appBarProps}>
        {fileName}
        <Chip theme="outline" selected={toggled} onClick={toggle}>
          Show CSS
        </Chip>
        {appBarChildren}
      </CodeBlockAppBar>
      <div className={cnb(toggled && DISPLAY_NONE_CLASS)}>{scss}</div>
      <div className={cnb(!toggled && DISPLAY_NONE_CLASS)}>{css}</div>
    </>
  );
}
