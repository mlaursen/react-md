import type { AnchorHTMLAttributes } from "react";
import { forwardRef } from "react";
import type { LinkClassNameOptions } from "./styles";
import { link } from "./styles";

declare module "react" {
  interface CSSProperties {
    "--rmd-link-color"?: string;
    "--rmd-link-visited-color"?: string;
    "--rmd-link-hover-color"?: string;
  }
}

/**
 * @remarks
 * \@since 6.0.0 Removed the `preventMaliciousTarget` prop since browsers
 * default to `rel=noopener` after updating the {@link https://github.com/whatwg/html/issues/4078|spec}.
 * \@since 6.0.0 Removed the `component` prop since all you need for link
 * behavior is `className="rmd-link"` and the new `LinkProvider` handles custom
 * `Link` components throughout your app.
 * \@since 6.0.0 The `href` prop is required.
 * \@since 6.0.0 Removed the `flexCentered` prop since it is now the default
 * styles.
 */
export interface LinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement>,
    LinkClassNameOptions {
  /**
   * All links **must** have a valid href.
   */
  href: string;
}

/**
 * @example
 * Simple Example
 * ```tsx
 * import { Link, Typography } from "@react-md/core";
 * import type { ReactElement } from "react";
 *
 * function Element(): ReactElement {
 *   return (
 *     <Typography>
 *       Here is a paragraph of text with a {" "}
 *       <Link href="/some-url">link to some content</Link>.
 *     </Typography>
 *   );
 * }
 * ```
 *
 *
 * @remarks
 * \@since 6.0.0 Removed the `preventMaliciousTarget` prop since browsers
 * default to `rel=noopener` after updating the {@link https://github.com/whatwg/html/issues/4078|spec}.
 * \@since 6.0.0 Removed the `component` prop since all you need for link
 * behavior is `className="rmd-link"` and the new `LinkProvider` handles custom
 * `Link` components throughout your app.
 * \@since 6.0.0 The `href` prop is required.
 * \@since 6.0.0 Removed the `flexCentered` prop since it is now the default
 * styles.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  props,
  ref
) {
  const { className, children, ...remaining } = props;

  return (
    <a {...remaining} ref={ref} className={link({ className })}>
      {children}
    </a>
  );
});
