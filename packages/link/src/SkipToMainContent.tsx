import React, {
  AnchorHTMLAttributes,
  forwardRef,
  ReactNode,
  useCallback,
} from "react";
import cn from "classnames";
import { bem } from "@react-md/utils";

import { Link } from "./Link";

export interface SkipToMainContentProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * An id to use for the link.
   */
  id?: string;

  /**
   * The id to use for the `<main>` content that should be focused once this
   * link is clicked.
   */
  mainId: string;

  /**
   * The children to display once the link has been keyboard focused.
   */
  children?: ReactNode;

  /**
   * Boolean if the skip to main content link should be unstyled so that you can
   * provide your own styles. This is just helpful if you are using this
   * component in a multiple places and don't want to keep overriding the
   * default styles each time.
   *
   * Note: there will still be the "base" link styles, font size, and z-index.
   * The `$rmd-link-skip-styles` and `$rmd-link-skip-active-styles` will not be
   * applied.
   */
  unstyled?: boolean;
}

const block = bem("rmd-link-skip");

/**
 * This component allows you to create a screen-reader only/keyboard focusable
 * only link that allows a user to skip to the main content of the page. This is
 * extremely useful when you have a lot of navigation items that must be tabbed
 * through before the main content can be focused and this component should
 * normally be the first focusable element on your page.
 */
export const SkipToMainContent = forwardRef<
  HTMLAnchorElement,
  SkipToMainContentProps
>(function SkipToMainContent(
  {
    id = "skip-to-main-content",
    children = "Skip to main content",
    unstyled = false,
    mainId,
    className,
    onClick,
    ...props
  },
  ref
) {
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (onClick) {
        onClick(event);
      }

      event.preventDefault();
      const main = document.getElementById(mainId);
      if (!main) {
        if (process.env.NODE_ENV !== "production") {
          /* eslint-disable no-console */
          const foundMain = document.querySelector("main");
          const foundMainId = foundMain && foundMain.id;
          console.error(
            `Unable to find a main element to focus with an id of: "${mainId}".`
          );
          if (foundMainId) {
            console.error(
              `However, a "<main>" element was found with an id: "${foundMainId}". Should this be the "mainId" prop for the "SkipToMainContent" component?`
            );
          }
        }

        return;
      }

      main.focus();
    },
    [mainId, onClick]
  );

  return (
    <Link
      {...props}
      id={id}
      ref={ref}
      href={`#${mainId}`}
      onClick={handleClick}
      className={cn(block({ styled: !unstyled }), className)}
    >
      {children}
    </Link>
  );
});

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    SkipToMainContent.propTypes = {
      id: PropTypes.string,
      mainId: PropTypes.string.isRequired,
      onClick: PropTypes.func,
      className: PropTypes.string,
      children: PropTypes.node,
      unstyled: PropTypes.bool,
    };
  } catch (e) {}
}
