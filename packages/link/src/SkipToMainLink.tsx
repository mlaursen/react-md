import { useIsomorphicLayoutEffect } from "@react-md/core";
import type { ReactNode } from "react";
import { forwardRef, useRef } from "react";
import type { SKipToMainLinkClassNameOptions } from "./getLinkClassName";
import { getSkipToMainLinkClassName } from "./getLinkClassName";
import type { LinkProps } from "./Link";
import { Link } from "./Link";

const noop = (): void => {
  // do nothing
};

export interface SkipToMainLinkProps
  extends Omit<LinkProps, "href">,
    SKipToMainLinkClassNameOptions {
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
export const SkipToMainLink = forwardRef<
  HTMLAnchorElement,
  SkipToMainLinkProps
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
  useIsomorphicLayoutEffect(() => {
    mainNodeRef.current = document.getElementById(mainId);
    if (process.env.NODE_ENV !== "production" && !mainNodeRef.current) {
      /* eslint-disable no-console */
      const foundMainId = document.querySelector("main")?.id;
      let message = `Unable to find a main element to focus with an id of: "${mainId}".`;
      if (foundMainId) {
        message += `\nHowever, a "<main>" element was found with an id: "${foundMainId}". Should this be the "mainId" prop for the "SkipToMainContent" component?`;
      }

      throw new Error(message);
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
      className={getSkipToMainLinkClassName({
        unstyled,
        className,
      })}
    >
      {children}
    </Link>
  );
});
