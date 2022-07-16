import type { AnchorHTMLAttributes } from "react";
import { forwardRef } from "react";
import type { LinkClassNameOptions } from "./styles";
import { link } from "./styles";

/**
 * @remarks
 * \@since 6.0.0 Removed the `preventMaliciousTarget` prop since browsers
 * default to `rel=noopener` after updating the {@link
 * https://github.com/whatwg/html/issues/4078|spec}.
 * \@since 6.0.0 Removed the `component` prop since all you need for link
 * behavior is `className="rmd-link"`
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
 *
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
