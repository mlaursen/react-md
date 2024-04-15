import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ForwardRefExoticComponent,
} from "react";
import { link, type LinkClassNameOptions } from "./styles.js";

declare module "react" {
  interface CSSProperties {
    "--rmd-link-color"?: string;
    "--rmd-link-visited-color"?: string;
    "--rmd-link-hover-color"?: string;
  }
}

/**
 * @since 6.0.0
 */
export type CustomLinkComponent =
  | ForwardRefExoticComponent<{ href: string }>
  | ForwardRefExoticComponent<{ to: string }>
  | "a";

/**
 * @since 6.0.0 Removed the `preventMaliciousTarget` prop since browsers
 * default to `rel=noopener` after updating the {@link https://github.com/whatwg/html/issues/4078|spec}.
 * @since 6.0.0 Removed the `component` prop since all you need for link
 * behavior is `className="rmd-link"`.
 * @since 6.0.0 The `href` prop is required.
 * @since 6.0.0 Removed the `flexCentered` prop since it is now the default
 * styles.
 */
export interface LinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement>,
    LinkClassNameOptions {
  /**
   * All links **must** have a valid href.
   */
  href: string;

  /**
   * Set this to `true` if your link contains icons that should be centered and
   * spaced with additional text. This is not used by default so that links can
   * correctly line wrap while rendered within paragraphs of text.
   *
   * @defaultValue `false`
   */
  flex?: boolean;
}

/**
 * **Server Component**
 *
 * @example Simple Example
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
 * @since 6.0.0 Removed the `preventMaliciousTarget` prop since browsers
 * default to `rel=noopener` after updating the {@link https://github.com/whatwg/html/issues/4078|spec}.
 * @since 6.0.0 Removed the `component` prop since all you need for link
 * behavior is `className="rmd-link"`.
 * @since 6.0.0 The `href` prop is required.
 * @since 6.0.0 Removed the `flexCentered` prop since it is now the default
 * styles.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  function Link(props, ref) {
    const { className, flex, children, ...remaining } = props;

    return (
      <a {...remaining} ref={ref} className={link({ flex, className })}>
        {children}
      </a>
    );
  }
);
