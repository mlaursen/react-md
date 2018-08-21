const FONT_ICON_CLASS_NAME = ".rmd-icon--font";

export type NodeType = HTMLElement | string;
export type TextExtractor = (node: NodeType, checkFontIcons?: boolean) => string;

/**
 * Attempts to find the first match index for a list of values that starts with the provided query string and
 * is within the start and end indexes. If no matches are found, -1 will be returned instead.
 */
export function findMatchInRange(query: string, startIndex: number, endIndex: number, values: string[]) {
  for (let i = startIndex; i < endIndex; i += 1) {
    const content = values[i];
    if (content.toUpperCase().indexOf(query) === 0) {
      return i;
    }
  }

  return -1;
}

/**
 * The default function used to extract the text from nodes. This will just return the textContent by default
 * unless the node has a react-md FontIcon as a child. If there is a FontIcon child, the node will be cloned
 * without the FontIcon to return the textContent instead. This is because the FontIcon's text content would
 * also be returned from the node's text content.
 */
export function extractTextContent(node: NodeType, checkFontIcons: boolean = true) {
  if (typeof node === "string") {
    return node;
  }

  if (checkFontIcons) {
    const fontIcon = node.querySelector(FONT_ICON_CLASS_NAME);
    if (fontIcon && fontIcon.textContent) {
      const cloned = node.cloneNode(true) as HTMLElement;
      cloned.removeChild(cloned.querySelector(FONT_ICON_CLASS_NAME) as HTMLElement);

      return cloned.textContent || "";
    }
  }

  return node.textContent || "";
}

/**
 * Attempts to find the match index for a query string from a list of nodes starting from a given index. This will
 * start by searching from the `startIndex + 1` to the end of the nodes list.  If no matches are found, the nodes
 * will be re-searched from 0 to the startIndex. If there are still no matches, -1 will be returned.
 *
 * The `nodes` can either be a list of `HTMLElement` or a list of strings.
 */
export function searchNodes(
  query: string,
  nodes: NodeType[],
  startIndex: number,
  extractor: TextExtractor = extractTextContent,
) {
  const values = nodes.map(node => extractor(node));
  let matchIndex = findMatchInRange(query, startIndex + 1, nodes.length, values);
  if (matchIndex === -1) {
    matchIndex = findMatchInRange(query, 0, startIndex, values);
  }

  return matchIndex;
}
