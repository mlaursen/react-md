"use client";

import { type ReactNode, forwardRef, useEffect, useRef } from "react";

import { Link, type LinkProps } from "./Link.js";
import {
  type SkipToMainContentClassNameOptions,
  skipToMainContent,
} from "./styles.js";

const noop = (): void => {
  // do nothing
};

const getMainElement = (mainId: string): HTMLElement | null =>
  mainId
    ? document.getElementById(mainId)
    : document.querySelector<HTMLElement>('main,[role="main"]');

/**
 * @since 6.0.0 The `mainId` is optional
 */
export interface SkipToMainContentProps
  extends Omit<LinkProps, "href">,
    SkipToMainContentClassNameOptions {
  /**
   * @since 6.0.0 Changed default value from `"skip-to-main-content"`
   * @defaultValue `"skip-to-main"`
   */
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
 * This component is used to allow keyboard users a quick way to skip directly
 * to the main content instead of needing to tab through all navigation items.
 *
 * This component should not be used if using the LayoutAppBar component since
 * it is already built-in.
 *
 * @example Simple Example
 * ```tsx
 * import { AppBar } from "@react-md/core/app-bar/AppBar";
 * import { SkipToMainContent } from "@react-md/core/link/SkipToMainContent";
 * import { type ReactElement } from "react";
 *
 * export default function SimpleSkipToMainContentExample(): ReactElement {
 *   return (
 *     <AppBar style={{ position: "relative" }}>
 *       <SkipToMainContent />
 *     </AppBar>
 *   );
 * }
 * ```
 *
 * @see {@link https://next.react-md.dev/components/skip-to-main-content|SkipToMainContent Demos}
 * @since 6.0.0 Changed the default `id` from `"skip-to-main-content"` to
 * `"skip-to-main"`.
 * @since 6.0.0 The `mainId` prop is optional
 * @since 6.0.0 Throws an error after rendering if no main element can be found
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
    mainId = "",
    onClick = noop,
    unstyled,
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
