import { type ReactElement, type ReactNode } from "react";
import { InlineCode } from "./InlineCode.js";
import {
  WalkChildren,
  type WalkChildrenRendererProps,
} from "./WalkChildren.js";

// Eventually support `Shift+Tab` -> `<kbd>Shift</kbd> + <kbd>Tab</kbd>`
const KEYBOARD_CODE_REGEX =
  /`(?:(Enter|Space|ArrowUp|ArrowDown|ArrowLeft|ArrowRight|Home|End|Escape|Tab|Shift|Ctrl|Alt|PageUp|PageDown))`/gm;

export interface KeyboardCodeProps {
  children?: ReactNode;
}

function Renderer(props: WalkChildrenRendererProps): ReactElement {
  const { match } = props;
  const [, name] = match;

  return <InlineCode as="kbd">{name}</InlineCode>;
}

export function KeyboardCode(props: KeyboardCodeProps): ReactElement {
  const { children } = props;

  return (
    <WalkChildren regex={KEYBOARD_CODE_REGEX} renderer={Renderer}>
      {children}
    </WalkChildren>
  );
}
