import { cssUtils } from "@react-md/core/cssUtils";
import { bem } from "@react-md/core/utils/bem";
import { cnb } from "cnbuilder";
import { type HTMLAttributes, type ReactElement, type ReactNode } from "react";

const styles = bem("code-block");

export interface CodeBlockConfigurableProps {
  /**
   * Since the `className` gets passed to the `<pre>` element, this can be used
   * to add a custom class name to the top-level container.
   */
  containerProps?: HTMLAttributes<HTMLDivElement>;

  /**
   * This is mostly used by the CodeEditor to apply `aria-hidden`
   */
  preProps?: HTMLAttributes<HTMLPreElement>;
  preContainerProps?: HTMLAttributes<HTMLDivElement>;
  scrollContainerProps?: HTMLAttributes<HTMLDivElement>;

  /**
   * This is mostly used by the CodeEditor to render the textarea within the
   * scroll container
   */
  afterPreElement?: ReactNode;

  /**
   * Set to `true` to disable the default scrollbar behavior which is useful when the
   * code itself should not be scrollable and instead normal content in the page.
   *
   * This was added to support hook/function documentation.
   */
  disableScroll?: boolean;

  /**
   * This should be enabled if the header or preview exists above the code
   * block.
   */
  disableMarginTop?: boolean;

  /**
   * This is mostly for the material icon/symbols copy/paste code. Allow line
   * wrapping there due to limited space and show all the code at once
   */
  lineWrap?: boolean;

  /**
   * Any children that should be fixed within the code block even after
   * scrolling the code. These elements should have `position: absolute`.
   */
  fixedChildren?: ReactNode;
}

export interface CodeBlockProps extends CodeBlockConfigurableProps {
  /**
   * This should be a `language-*` string.
   */
  className: string;

  /**
   * This should be the `<code>` content.
   */
  children: ReactElement;
}

/**
 * **Server Component**
 *
 * You are probably looking for the `HighlightedCodeBlock` component instead.
 * This component sets up the `<pre>` element and additional container elements
 * so that if there is a scrollbar, elements can be "fixed" in that scroll area.
 */
export function CodeBlock(props: CodeBlockProps): ReactElement {
  const {
    children,
    preProps,
    className,
    lineWrap,
    containerProps,
    disableScroll,
    preContainerProps,
    scrollContainerProps,
    afterPreElement,
    disableMarginTop,
    fixedChildren,
  } = props;

  if (disableScroll) {
    return (
      <pre
        {...preProps}
        className={cnb(
          className,
          styles("pre", { wrap: lineWrap, "no-scroll": disableScroll }),
          preProps?.className
        )}
      >
        {children}
        {fixedChildren}
      </pre>
    );
  }

  return (
    <div
      {...containerProps}
      className={cnb(
        styles({ "no-tm": disableMarginTop }),
        cssUtils({
          textColor: "text-primary",
          surfaceColor: "dark",
        }),
        containerProps?.className
      )}
    >
      <div
        {...scrollContainerProps}
        className={cnb(
          styles("scroll-container"),
          scrollContainerProps?.className
        )}
      >
        <div
          {...preContainerProps}
          className={cnb(styles("pre-container"), preContainerProps?.className)}
        >
          <pre
            {...preProps}
            className={cnb(
              className,
              styles("pre", { wrap: lineWrap }),
              preProps?.className
            )}
          >
            {children}
          </pre>
          {afterPreElement}
        </div>
      </div>
      {fixedChildren}
    </div>
  );
}
