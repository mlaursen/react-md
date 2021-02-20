import React, {
  CSSProperties,
  FieldsetHTMLAttributes,
  forwardRef,
  ReactNode,
} from "react";
import cn from "classnames";
import { bem } from "@react-md/utils";

export interface FieldsetProps
  extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
  /**
   * The legend to display. This is required since a fieldset loses most of its'
   * benefit for accessibility without a legend.
   */
  legend: ReactNode;

  /**
   * An optional style to apply to the legend element.
   */
  legendStyle?: CSSProperties;

  /**
   * An optional classname to apply to the legend.
   */
  legendClassName?: string;

  /**
   * Boolean if the legend should only be styled to be visible for screen
   * readers.
   */
  legendSROnly?: boolean;

  /**
   * Boolean if the fieldset should remove the default browser styles of margin,
   * padding, and border.
   */
  unstyled?: boolean;
}

const block = bem("rmd-fieldset");

/**
 * This is a simple wrapper for the `<fieldset>` that defaults to removing
 * the default styles of a border, padding, and margin and having a screen-reader
 * visible only legend element for added accessibility.
 */
export const Fieldset = forwardRef<HTMLFieldSetElement, FieldsetProps>(
  function Fieldset(
    {
      className,
      legend,
      legendStyle,
      legendClassName,
      legendSROnly = false,
      unstyled = true,
      children,
      ...props
    },
    ref
  ) {
    return (
      <fieldset
        {...props}
        ref={ref}
        className={cn(block({ unstyled }), className)}
      >
        <legend
          style={legendStyle}
          className={cn(
            block("legend", { "sr-only": legendSROnly }),
            legendClassName
          )}
        >
          {legend}
        </legend>
        {children}
      </fieldset>
    );
  }
);

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    Fieldset.propTypes = {
      className: PropTypes.string,
      unstyled: PropTypes.bool,
      legend: PropTypes.node.isRequired,
      legendStyle: PropTypes.object,
      legendClassName: PropTypes.string,
      legendSROnly: PropTypes.bool,
      children: PropTypes.node,
    };
  } catch (e) {}
}
