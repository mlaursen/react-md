"use client";
import type { ReactNode } from "react";
import { forwardRef, useEffect, useRef } from "react";
import type { LinkProps } from "./Link";
import { Link } from "./Link";
import type { SKipToMainContentClassNameOptions } from "./styles";
import { skipToMainContent } from "./styles";

const noop = (): void => {
  // do nothing
};

const getMainElement = (mainId: string | undefined): HTMLElement | null =>
  mainId
    ? document.getElementById(mainId)
    : document.querySelector<HTMLElement>('main,[role="main"]');

/**
 * @remarks
 * \@since 6.0.0 The {@link mainId} is optional
 */
export interface SkipToMainContentProps
  extends Omit<LinkProps, "href">,
    SKipToMainContentClassNameOptions {
  id?: string;

  /**
   * An optional id for the main element. When this is not provided, the main
   * element will be found by:
   *
   * ```ts
   * document.querySelector('main,[role="main"]');
   * ```
   */
  mainId?: string;

  /**
   * @defaultValue `"Skip to main content"`
   */
  children?: ReactNode;
}

/**
 * **Client Component**
 *
 * @remarks
 * \@since 6.0.0 Throws an error after rendering if no main element can be found
 * with the provided `mainId` in development mode. The previous behavior would
 * only log an error after being clicked.
 */
export const SkipToMainContent = forwardRef<
  HTMLAnchorElement,
  SkipToMainContentProps
>(function SkipToMainContent(props, ref) {
  const {
    id = "skip-to-main",
    className,
    children = "Skip to main content",
    mainId,
    onClick = noop,
    unstyled = false,
    ...remaining
  } = props;

  const mainNodeRef = useRef<HTMLElement | null>(null);
  // want to warn the developer about missing main element in development
  // immediately to help prevent errors, but in production this can be lazy
  // initialized only once a keyboard user focuses and clicks this element
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      mainNodeRef.current = getMainElement(mainId);

      if (!mainNodeRef.current) {
        const foundMainId = document.querySelector('main,[role="main"]')?.id;
        let message = `Unable to find a main element to focus`;
        if (mainId) {
          message += ` with an id of "${mainId}"`;

          if (foundMainId) {
            message += ` but a main element was found with an id of "${foundMainId}".`;
          }
        }
        if (!foundMainId) {
          message +=
            '. There should be at least one <main> element or an element with role="main" on the page for accessibility.';
        }

        throw new Error(message);
      }
    }, [mainId]);
  }

  return (
    <Link
      {...remaining}
      id={id}
      ref={ref}
      href={`#${mainId}`}
      onClick={(event) => {
        onClick(event);
        if (event.isPropagationStopped()) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();

        // see comment above useEffect
        mainNodeRef.current ||= getMainElement(mainId);
        mainNodeRef.current?.focus();
      }}
      className={skipToMainContent({
        unstyled,
        className,
      })}
    >
      {children}
    </Link>
  );
});
