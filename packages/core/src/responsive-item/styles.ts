import { cnb } from "cnbuilder";
import { bem } from "../utils";

const styles = bem("rmd-responsive-item");

/** @remarks \@since 6.0.0 */
export interface ResponsiveItemClassNameOptions {
  className?: string;

  /**
   * Set this to `true` to apply the following styles:
   * ```scss
   * max-height: 100%;
   * max-width: 100%;
   * object-fit: contain;
   * ```
   *
   * This is useful for displaying images in a full page dialog so that scroll
   * bars do not appear while maintaining the correct aspect ratio for the item.
   *
   * @defaultValue `false`
   */
  scaleToContainer?: boolean;

  /**
   * Set this to `true` to force a specific aspect ratio.
   *
   * Note: This will only work if the parent element has applied the correct
   * {@link ResponsiveItemContainerStyles} as well.
   *
   * @defaultValue `false`
   */
  forcedAspectRatio?: boolean;
}

/**
 * Applies the visual media responsive styles manually if you cannot use the
 * `ResponsiveItemContainer` component.
 *
 * @remarks \@since 6.0.0
 */
export function responsiveItem(
  options: ResponsiveItemClassNameOptions = {}
): string {
  const {
    className,
    scaleToContainer = false,
    forcedAspectRatio = false,
  } = options;

  return cnb(
    styles({
      scale: scaleToContainer,
      "aspect-ratio": forcedAspectRatio,
    }),
    className
  );
}
