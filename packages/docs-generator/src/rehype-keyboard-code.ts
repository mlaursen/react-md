import { type Element, type ElementContent, type Root } from "hast";
import { toString } from "mdast-util-to-string";
import { type Plugin } from "unified";
import { visitParents } from "unist-util-visit-parents";

const MODIFIERS = "Shift|Ctrl|Alt";
const ARROW_KEYS = "ArrowUp|ArrowRight|ArrowDown|ArrowLeft";
const JUMP_KEYS = "Home|End|PageUp|PageDown";
const ACTION_KEYS = "Enter|Space|Escape|Tab";
const ACTION = `${ARROW_KEYS}|${JUMP_KEYS}|${ACTION_KEYS}`;

const KEYBOARD_CODE_REGEX = new RegExp(
  String.raw`^(?:((${MODIFIERS})\+)?(${ACTION}))$`
);

export interface RehypeKeyboardCodeOptions {
  /** @defaultValue `"inline-code inline-code--ticked"` */
  className?: string;
}

/**
 * Replaces inline code that are keyboard keys with `kbd` instead of `code`.
 *
 * Examples:
 * - `Shift`
 * - `ArrowUp`
 * - `Alt+ArrowUp`
 * - `Ctrl+End`
 */
export const rehypeKeyboardCode: Plugin<
  [options?: RehypeKeyboardCodeOptions],
  Root
> = (options = {}) => {
  const { className = "inline-code inline-code--ticked" } = options;

  const createKbd = (match: string): Element => {
    return {
      type: "element",
      tagName: "kbd",
      properties: {
        class: className,
      },
      children: [{ type: "text", value: match }],
    };
  };

  return (root) => {
    visitParents(root, "element", (node, ancestors) => {
      const parent = ancestors.at(-1);
      if (
        node.tagName !== "code" ||
        !parent ||
        (parent.type === "element" && parent.tagName === "pre")
      ) {
        return;
      }

      const code = toString(node);
      const matches = KEYBOARD_CODE_REGEX.exec(code);
      if (!matches) {
        return;
      }
      const [_match, _modifierWithPlus, maybeModifier, key] = matches;
      const replacements: ElementContent[] = [];
      if (maybeModifier) {
        replacements.push(createKbd(maybeModifier), {
          type: "text",
          value: " + ",
        });
      }
      replacements.push(createKbd(key));
      parent.children.splice(parent.children.indexOf(node), 1, ...replacements);
    });
  };
};
