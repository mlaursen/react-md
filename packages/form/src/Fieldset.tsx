import React, {
  CSSProperties,
  FieldsetHTMLAttributes,
  forwardRef,
  ReactElement,
  ReactNode,
  Ref,
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
  }: FieldsetProps,
  ref?: Ref<HTMLFieldSetElement>
): ReactElement {
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

const ForwardedFieldset = forwardRef<HTMLFieldSetElement, FieldsetProps>(
  Fieldset
);

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    ForwardedFieldset.propTypes = {
      className: PropTypes.string,
      unstyled: PropTypes.bool,
      legend: PropTypes.node.isRequired,
      legendStyle: PropTypes.object,
      legendClassName: PropTypes.string,
      legendSROnly: PropTypes.bool,
    };
  } catch (e) {}
}

export default ForwardedFieldset;
