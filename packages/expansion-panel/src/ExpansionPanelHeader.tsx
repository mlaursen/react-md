import React, {
  ButtonHTMLAttributes,
  forwardRef,
  MouseEventHandler,
  ReactNode,
} from "react";
import cn from "classnames";
import { UnstyledButton } from "@react-md/button";
import { IconRotator, useIcon } from "@react-md/icon";
import { bem } from "@react-md/utils";

export interface ExpansionPanelHeaderProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The id for the header. This is required for a11y.
   */
  id: string;

  /**
   * The icon to use for the expander icon.
   */
  icon?: ReactNode;

  /**
   * Boolean if the panel is currently expanded. This is just used to rotate the
   * icon as needed.
   */
  expanded: boolean;

  /**
   * The click handler that should attempt to toggle the expansion state of the
   * panel.
   */
  onClick: MouseEventHandler<HTMLButtonElement>;

  /**
   * The children to display within the header.
   *
   * Reminder: Since this is a `<button>`, only `inline` elements should be
   * rendered within (so use `<span>` instead of `<div>` for children).
   */
  children: ReactNode;

  /**
   * Boolean if the icon rotation transition should be disabled.
   */
  disableTransition?: boolean;
}

const block = bem("rmd-expansion-panel");

/**
 * The header for a panel that controls the expansion state. This is really just
 * a simple button that displays the children before an expander icon.
 *
 * Reminder: Since this is a `<button>`, only `inline` elements should be
 * rendered within (so use `<span>` instead of `<div>` for children).
 */
export const ExpansionPanelHeader = forwardRef<
  HTMLButtonElement,
  ExpansionPanelHeaderProps
>(function ExpansionPanelHeader(
  {
    icon: propIcon,
    expanded,
    children,
    className,
    disableTransition = false,
    ...props
  },
  ref
) {
  const icon = useIcon("expander", propIcon);

  return (
    <UnstyledButton
      {...props}
      ref={ref}
      aria-expanded={expanded || undefined}
      className={cn(block("header"), className)}
    >
      {children}
      {icon && (
        <span className={block("icon")}>
          <IconRotator animate={!disableTransition} rotated={expanded}>
            {icon}
          </IconRotator>
        </span>
      )}
    </UnstyledButton>
  );
});

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    ExpansionPanelHeader.propTypes = {
      id: PropTypes.string.isRequired,
      icon: PropTypes.node,
      expanded: PropTypes.bool.isRequired,
      onClick: PropTypes.func.isRequired,
      children: PropTypes.node.isRequired,
      className: PropTypes.string,
      disableTransition: PropTypes.bool,
    };
  } catch (e) {}
}
