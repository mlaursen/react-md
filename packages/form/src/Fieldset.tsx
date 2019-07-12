import React, {
  FC,
  FieldsetHTMLAttributes,
  ReactNode,
  CSSProperties,
  forwardRef,
} from "react";
import cn from "classnames";
import { bem } from "@react-md/theme";
import { WithForwardedRef } from "@react-md/utils";

export interface FieldsetProps
  extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
  /**
   * The legend to display. This is required since a fieldset loses most of its' benefit
   * for accessibility without a legend.
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
   * Boolean if the legend should no longer be styled to be visible for
   * screen readers only.
   */
  disableLegendSROnly?: boolean;

  /**
   * Boolean if the fieldset should remove the default browser styles of margin, padding, and border.
   */
  unstyled?: boolean;
}

type WithRef = WithForwardedRef<HTMLFieldSetElement>;
type DefaultProps = Required<
  Pick<FieldsetProps, "unstyled" | "disableLegendSROnly">
>;
type WithDefaultProps = FieldsetProps & DefaultProps & WithRef;

const block = bem("rmd-fieldset");

/**
 * This is a simple wrapper for the `<fieldset>` that defaults to removing
 * the default styles of a border, padding, and margin and having a screen-reader
 * visible only legend element for added accessibility.
 */
const Fieldset: FC<FieldsetProps & WithRef> = providedProps => {
  const {
    className,
    forwardedRef,
    unstyled,
    legend,
    legendStyle,
    legendClassName,
    disableLegendSROnly,
    children,
    ...props
  } = providedProps as WithDefaultProps;

  return (
    <fieldset
      {...props}
      ref={forwardedRef}
      className={cn(block({ unstyled }), className)}
    >
      <legend
        style={legendStyle}
        className={cn(
          block("legend", { "sr-only": !disableLegendSROnly }),
          legendClassName
        )}
      >
        {legend}
      </legend>
      {children}
    </fieldset>
  );
};

const defaultProps: DefaultProps = {
  unstyled: true,
  disableLegendSROnly: false,
};

Fieldset.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  Fieldset.displayName = "Fieldset";

  let PropTypes;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    Fieldset.propTypes = {
      className: PropTypes.string,
      unstyled: PropTypes.bool,
      legend: PropTypes.node.isRequired,
      legendStyle: PropTypes.object,
      legendClassName: PropTypes.string,
      disableLegendSROnly: PropTypes.bool,
    };
  }
}

export default forwardRef<HTMLFieldSetElement, FieldsetProps>((props, ref) => (
  <Fieldset {...props} forwardedRef={ref} />
));
