import { type Element, type Node, type Root } from "hast";
import { is } from "unist-util-is";
import { type Test, visit } from "unist-util-visit";

// https://stackoverflow.com/a/1636354/744230
const HEX_CODE_REGEX = /#(?:[0-9a-fA-F]{3}){1,2}/gim;

export const isTextNode = (
  node: Node
): node is Node & { type: "text"; value: string } =>
  is(node, "text") && "value" in node && typeof node.value === "string";

const isColorNode: Test = (node) =>
  isTextNode(node) && HEX_CODE_REGEX.test(node.value);

const createColorNode = (color: string): Element => ({
  type: "element",
  tagName: "span",
  children: [
    {
      type: "element",
      tagName: "code",
      properties: {},
      children: [{ type: "text", value: color }],
    },
  ],
  properties: {
    style: `--color:${color};`,
    class: "color-preview color-preview--text",
  },
});

export function rehypeColorPreview() {
  return function colorPreview(tree: Root): void {
    visit(tree, isColorNode, (node, index, parent) => {
      if (
        !isTextNode(node) ||
        !parent ||
        is(parent, { tagName: "code" }) ||
        typeof index !== "number"
      ) {
        return;
      }

      const parts = node.value.split(HEX_CODE_REGEX);
      const matches = node.value.match(HEX_CODE_REGEX) || [];

      const replacements = [];
      for (const [i, part] of parts.entries()) {
        const clonedNode = structuredClone(node);
        clonedNode.value = part;
        delete clonedNode.position;

        if (clonedNode.value !== "") {
          replacements.push(clonedNode);
        }

        if (i < matches.length) {
          replacements.push(createColorNode(matches[i]));
        }
      }

      parent.children.splice(index, 1, ...replacements);
    });
  };
}
