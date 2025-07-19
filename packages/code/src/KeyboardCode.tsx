import { type ReactElement, type ReactNode } from "react";

import { InlineCode } from "./InlineCode.js";
import {
  WalkChildren,
  type WalkChildrenRendererProps,
} from "./WalkChildren.js";

const MODIFIERS = "Shift|Ctrl|Alt";
const ARROW_KEYS = "ArrowUp|ArrowRight|ArrowDown|ArrowLeft";
const JUMP_KEYS = "Home|End|PageUp|PageDown";
const ACTION_KEYS = "Enter|Space|Escape|Tab|Backspace|Delete";
const ACTION = `${ARROW_KEYS}|${JUMP_KEYS}|${ACTION_KEYS}`;

const KEYBOARD_CODE_REGEX = new RegExp(`^(?:((${MODIFIERS})\\+)?(${ACTION}))$`);

export interface KeyboardCodeProps {
  children?: ReactNode;
}

function Renderer(props: WalkChildrenRendererProps): ReactElement {
  const { match } = props;
  const [, name] = match;

  return <InlineCode as="kbd">{name}</InlineCode>;
}

/**
 * NOTE: The `rehype-keyboard-code` should be used over this when possible.
 * Traversing react children isn't the best and the `Children` might be removed
 * in the future.
 */
export function KeyboardCode(props: KeyboardCodeProps): ReactElement {
  const { children } = props;

  return (
    <WalkChildren regex={KEYBOARD_CODE_REGEX} renderer={Renderer}>
      {children}
    </WalkChildren>
  );
}
