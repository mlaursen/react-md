import {
  Children,
  type ComponentType,
  type ReactElement,
  type ReactNode,
  useMemo,
} from "react";
import { remove as removeAccents } from "remove-accents";

import { HighlightTextMark } from "./HighlightTextMark.js";

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_special_characters
const SPECIAL_CHARACTERS_REGEXP = /[.*+?^${}()|[\]\\]/g;

/**
 * @since 6.0.0
 */
export interface HighlightTextMatch {
  /**
   * The cleaned query that has diacritics, leading whitespace, and trailing
   * whitespace removed.
   */
  query: string;

  /**
   * The raw query string that was provided.
   */
  rawQuery: string;

  /**
   * The full untouched text content for the HighlightText component.
   */
  rawText: string;

  /**
   * The current index in the {@link rawText} that is being matched against.
   */
  index: number;

  /**
   * The last index the query has been matched.
   */
  lastIndex: number;
}

/**
 * @since 6.0.0
 */
export interface HighlightTextComponentProps {
  /** {@inheritDoc HighlightTextMatch} */
  match: HighlightTextMatch;

  /**
   * The matched content.
   */
  children: string;
}

/**
 * @since 6.0.0
 */
export type HighlightTextComponent = ComponentType<HighlightTextComponentProps>;

/**
 * @since 6.0.0
 */
export interface HighlightTextProps {
  /**
   * This prop can be used to provide a custom highlight behavior. It will be
   * provided the {@link HighlightTextComponentProps}
   *
   * @defaultValue `HighlightTextMark`
   */
  highlight?: HighlightTextComponent;

  /**
   * The query text to highlight in the children. When this is an empty string
   * or whitespace only, nothing will be highlighted.
   */
  query: string;

  /**
   * The content to highlight based on the query text where highlighting only
   * works for text children. The component will attempt to find all child text
   * using the `React.Children` API, but might be inconsistent.
   */
  children: ReactNode;

  /**
   * Set to `true` if only the first match should be highlighted instead of all
   * occurrences.
   *
   * @defaultValue `false`
   */
  firstMatchOnly?: boolean;
}

/**
 * The `HighlightText` component can be used to highlight text matching the
 * provided query ignoring case.
 *
 * @example Simple Example
 * ```tsx
 * import { HighlightText } from "@react-md/core/typography/HighlightText";
 * import { Typography } from "@react-md/core/typography/Typography";
 * import { type ReactElement } from "react";
 *
 * export default function SimpleExample(): ReactElement {
 *   return (
 *     <Typography>
 *       <HighlightText query="lorem ipsum">
 *         Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget metus
 *         ut mi mattis dapibus. Praesent interdum sapien ut posuere convallis.
 *         Donec et tristique ex. Aliquam erat volutpat. Donec sit amet dui
 *         egestas, tempus quam id, hendrerit risus. Nullam tincidunt quam ut dui
 *         aliquet ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing
 *         elit. Sed rhoncus, purus vitae tincidunt placerat, quam diam lobortis
 *         magna, et aliquam ante diam id nunc. Cras blandit leo eu nisi
 *         elementum, nec gravida ligula pharetra. Etiam molestie luctus orci,
 *         vel hendrerit lacus eleifend ut. Nullam placerat dolor ac mi congue,
 *         non auctor metus consectetur. Ut pretium mollis vulputate.
 *       </HighlightText>
 *     </Typography>
 *   );
 * }
 *
 * ```
 * @see {@link https://react-md.dev/components/highlight-text | HighlightText Demos}
 * @since 6.0.0
 */
export function HighlightText(
  props: Readonly<HighlightTextProps>
): ReactElement {
  const {
    query,
    children,
    highlight: Highlight = HighlightTextMark,
    firstMatchOnly,
  } = props;

  return (
    <>
      {useMemo<ReactNode>(
        () =>
          Children.map(children, (child) => {
            if (!query || !child || typeof child !== "string") {
              return child;
            }

            const cleanQuery = removeAccents(query).trim();
            if (!cleanQuery) {
              return <>{child}</>;
            }

            const parts: ReactNode[] = [];
            const text = removeAccents(child).trim();
            const regex = new RegExp(
              "(" + cleanQuery.replace(SPECIAL_CHARACTERS_REGEXP, "\\$&") + ")",
              "gi"
            );

            let match: RegExpExecArray | null;
            let lastIndex = 0;
            while ((match = regex.exec(text)) !== null) {
              const { index } = match;
              if (index > lastIndex) {
                parts.push(child.slice(lastIndex, index));
              }

              ({ lastIndex } = regex);
              parts.push(
                <Highlight
                  key={index}
                  match={{
                    index,
                    lastIndex,
                    query: cleanQuery,
                    rawQuery: query,
                    rawText: child,
                  }}
                >
                  {child.slice(index, lastIndex)}
                </Highlight>
              );

              if (firstMatchOnly) {
                break;
              }
            }

            if (lastIndex < child.length) {
              parts.push(child.slice(lastIndex));
            }

            return parts;
          }),
        [Highlight, children, firstMatchOnly, query]
      )}
    </>
  );
}
