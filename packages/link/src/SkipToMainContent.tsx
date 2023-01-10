import { PROGRAMMATICALLY_FOCUSABLE } from "@react-md/core";
import type { ReactNode } from "react";
import { forwardRef, useEffect, useRef } from "react";
import type { LinkProps } from "./Link";
import { Link } from "./Link";
import type { SKipToMainContentClassNameOptions } from "./styles";
import { skipToMainContent } from "./styles";

const noop = (): void => {
  // do nothing
};

export interface SkipToMainContentProps
  extends Omit<LinkProps, "href">,
    SKipToMainContentClassNameOptions {
  id?: string;
  mainId: string;

  /**
   * @defaultValue `"Skip to main content"`
   */
  children?: ReactNode;
}

/**
 * @remarks \@since 6.0.0 Throws an error after rendering if no main element can
 * be found with the provided `mainId` in development mode. The previous
 * behavior would only log an error after being clicked.
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
  useEffect(() => {
    mainNodeRef.current = document.getElementById(mainId);
    if (process.env.NODE_ENV !== "production") {
      const main = mainNodeRef.current;
      if (!main) {
        const foundMainId = document.querySelector('main,[role="main"]')?.id;
        let message = `Unable to find a main element to focus with an id of "${mainId}".`;
        if (foundMainId) {
          message += `\nHowever, a "<main>" element was found with an id of "${foundMainId}". Should this be the "mainId" for the "SkipToMainContent" component?`;
        }
        throw new Error(message);
      } else if (main.closest(PROGRAMMATICALLY_FOCUSABLE) !== main) {
        throw new Error(
          `The main element with id "${mainId}" is not focusable so the "SkipToMainContent" component will do nothing. Add a \`tabIndex={-1}\` to the element to fix this error.`
        );
      }
    }
  }, [mainId]);

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
