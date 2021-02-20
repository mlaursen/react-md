import React, { forwardRef, HTMLAttributes, ReactNode } from "react";
import cn from "classnames";
import { bem } from "@react-md/utils";

export interface SVGIconProps extends HTMLAttributes<SVGSVGElement> {
  /**
   * Boolean if the SVG should gain the `focusable` attribute. This is disabled
   * by default since IE11 and Edge actually default this to true and keyboard's
   * will tab focus all SVGs.
   */
  focusable?: "false" | "true" | boolean;

  /**
   * The `viewBox` attribute allows you to specify that a given set of graphics
   * stretch to fit a particular container element.
   *
   * The value of the `viewBox` attribute is a list of four numbers min-x,
   * min-y, width and height, separated by white space and/or a comma, which
   * specify a rectangle in user space which should be mapped to the bounds of
   * the viewport established by the given element, taking into account
   * attribute `preserveAspectRatio`.
   *
   * Negative values for width or height are not permitted and a value of zero
   * disables rendering of the element. An optional `viewbox` for the SVG.
   *
   * For example, if the SVG element is 250 (width) by 200 (height) and you
   * provide `viewBox="0 0 25 20"`, the coordinates inside the SVG will go from
   * the top left corner (0, 0) to the bottom right (25, 20) and each unit will
   * be worth `10px`.
   */
  viewBox?: string;

  /**
   * An optional `xmlns` string to provide. The `use` prop will not work without
   * this prop defined.
   */
  xmlns?: string;

  /**
   * This should be a link to a part of an SVG sprite map. So normally one of
   * the following:
   * - `'#some-custom-svg'`
   * - `'/images/spritemap.svg#some-custom-svg'`
   *
   * This prop **should not** be used with the `children` prop as only one will
   * be rendered.
   *
   * @remarks
   *
   * NOTE: IE **does not support** external SVGs. Please see the demo for more
   * details.
   */
  use?: string;

  /**
   * Boolean if the icon should use the dense spec.
   */
  dense?: boolean;

  /**
   * Any `<svg>` children to render to create your icon. This can not be used
   * with the `use` prop.
   */
  children?: ReactNode;
}

const block = bem("rmd-icon");

/**
 * The `SVGIcon` component is used to render inline SVG icons or SVG icons in a
 * sprite map as an icon.
 */
export const SVGIcon = forwardRef<SVGSVGElement, SVGIconProps>(function SVGIcon(
  {
    "aria-hidden": ariaHidden = true,
    focusable = "false",
    xmlns = "http://www.w3.org/2000/svg",
    viewBox = "0 0 24 24",
    dense = false,
    className,
    use,
    children: propChildren,
    ...props
  },
  ref
) {
  let children = propChildren;
  if (!children && use) {
    children = <use xlinkHref={use} />;
  }

  return (
    <svg
      {...props}
      aria-hidden={ariaHidden}
      ref={ref}
      className={cn(block({ svg: true, dense }), className)}
      focusable={focusable}
      xmlns={xmlns}
      viewBox={viewBox}
    >
      {children}
    </svg>
  );
});

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    SVGIcon.propTypes = {
      className: PropTypes.string,
      role: PropTypes.string,
      "aria-hidden": PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
      "aria-labelledby": PropTypes.string,
      focusable: PropTypes.oneOf(["true", "false"]),
      viewBox: PropTypes.string,
      xmlns: PropTypes.string,
      use: PropTypes.string,
      dense: PropTypes.bool,
      children: PropTypes.node,
    };
  } catch (e) {}
}
