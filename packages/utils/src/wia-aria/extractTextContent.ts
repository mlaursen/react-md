const removeWhitespace = (s: string): string => s.replace(/\s/g, "");

/**
 * The default function used to extract the text from nodes. This will just
 * return the textContent by default unless the node has a react-md FontIcon as
 * a child. If there is a FontIcon child, the node will be cloned without the
 * FontIcon to return the textContent instead. This is because the FontIcon's
 * text content would also be returned from the node's text content.
 *
 * @param stringOrElement - Either a string or an element element to convert
 * @param fontIconQuerySelector - A string to use for finding font icons in the
 * HTML Element. When this is set to the empty string, the element will not be
 * checked for font icons which _might_ be a slight performance boost if you are
 * guarenteed to not use font icons
 */
export function extractTextContent(
  stringOrElement: HTMLElement | string,
  fontIconQuerySelector = ".rmd-icon--font"
): string {
  if (typeof stringOrElement === "string") {
    return removeWhitespace(stringOrElement);
  }

  if (fontIconQuerySelector) {
    const fontIcons = Array.from(
      stringOrElement.querySelectorAll(fontIconQuerySelector)
    );

    if (fontIcons.some((i) => !!i.textContent)) {
      const cloned = stringOrElement.cloneNode(true) as HTMLElement;
      let icon: HTMLElement | null;
      do {
        icon = cloned.querySelector(fontIconQuerySelector);
        if (icon && icon.parentNode) {
          icon.parentNode.removeChild(icon);
        }
      } while (icon);

      return removeWhitespace(cloned.textContent || "");
    }
  }

  return removeWhitespace(stringOrElement.textContent || "");
}
