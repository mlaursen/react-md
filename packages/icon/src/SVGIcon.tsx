import React, {
  forwardRef,
  FunctionComponent,
  HTMLAttributes,
  ReactNode,
  CSSProperties,
} from "react";
import cn from "classnames";
import { WithForwardedRef } from "@react-md/utils";

export interface SVGIconProps extends HTMLAttributes<SVGSVGElement> {
  /**
   * The role to apply to the SVG. When using icons, it is generally recommended to leave it as
   * the default `img` so that it is insured as a graphic, but can also be switched
   * to `presentation`.
   */
  role?: string;

  /**
   * An optional list of ids to use to label the SVG icon with. This is helpful to add when you
   * use the `title` and `desc` props as this is used to create ids for those two props. This is
   * super beneficial to screen readers.
   *
   * When this is defined, it is a space-delimited string of ids to provide to the title and desc
   * (in order). If this is omitted and the `use` prop is defined, it will take everything after
   * the `#` sign and append `-title` and `-desc` as a fallback. Check out the examples for more
   * information about this.
   *
   * @see {@link #title}
   * @see {@link #desc}
   */
  "aria-labelledby"?: string;

  /**
   * An optional title to give to your SVG icon. This is generally recommended for accessibility
   * when not using the `use` prop, or your sprite map does not contain `<title>` and `<desc>.
   *
   * @see {@link #aria-labelledby}
   */
  title?: string;

  /**
   * An optional description to give to your SVG icon. This is generally recommended for
   * accessibility when not using the `use` prop, or your sprite map does not contain `<title>`
   * and `<desc>.
   *
   * @see {@link #aria-labelledby}
   */
  desc?: string;

  /**
   * Boolean if the SVG should gain the `focusable` attribute. This is disabled by default
   * since IE11 and Edge actually default this to true and keyboard's will tab focus all SVGs.
   */
  focusable?: string;

  /**
   * An optional size to apply to the SVG. This can be used to set both the
   * `height` and `width` simultaneously. This will be provided as inline styles
   * since the `height` and `width` are normally controlled by CSS, and CSS has
   * higher precedence than the `height`/`width` attributes.
   */
  size?: number;

  /**
   * The `viewBox` attribute allows you to specify that a given set of graphics stretch to
   * fit a particular container element.
   *
   * The value of the `viewBox` attribute is a list of four numbers min-x, min-y, width and
   * height, separated by white space and/or a comma, which specify a rectangle in user
   * space which should be mapped to the bounds of the viewport established by the given
   * element, taking into account attribute `preserveAspectRatio`.
   *
   * Negative values for width or height are not permitted and a value of zero disables
   * rendering of the element. An optional `viewbox` for the SVG.
   *
   * For example, if the SVG element is 250 (width) by 200 (height) and you provide
   * `viewBox="0 0 25 20"`, the coordinates inside the SVG will go from the top left corner
   * (0, 0) to the bottom right (25, 20) and each unit will be worth `10px`.
   */
  viewBox?: string;

  /**
   * An optional `xmlns` string to provide. The `use` prop will not work without this prop
   * defined.
   */
  xmlns?: string;

  /**
   * This should be a link to a part of an SVG sprite map. So normally one of the following:
   * - `'#some-custom-svg'`
   * - `'/images/spritemap.svg#some-custom-svg'`
   *
   * This prop **should not** be used with the `children` prop as only one will be rendered.
   *
   * > NOTE: IE **does not support** external SVGs. Please see the demo for more details.
   */
  use?: string;

  /**
   * Boolean if the icon should use the dense spec.
   */
  dense?: boolean;

  /**
   * Any `<svg>` children to render to create your icon. This can not be used with the `use` prop.
   */
  children?: ReactNode;
}

type WithRef = WithForwardedRef<SVGSVGElement>;
type DefaultProps = Required<
  Pick<SVGIconProps, "role" | "focusable" | "xmlns" | "viewBox" | "dense">
>;
type WithDefaultProps = SVGIconProps & DefaultProps & WithRef;

function createStyle(style?: CSSProperties, size?: number) {
  if (style && size) {
    return { height: size, width: size, ...style };
  } else if (style) {
    return style;
  } else if (size) {
    return { height: size, width: size };
  }

  return undefined;
}
/**
 * A small helper function that will automatically generate specific ids within the icon
 * to add additional accessibility.
 */
function getA11yIds(
  use?: string,
  labels?: string,
  title?: string,
  desc?: string
) {
  let titleId;
  let descId;
  let labelledBy;
  if (title || desc) {
    if (use) {
      const baseId = use.replace(/.*#/, "");
      titleId = `${baseId}-title`;
      descId = `${baseId}-desc`;

      if (title) {
        labelledBy = `${baseId}-title`;
      }

      if (desc) {
        labelledBy = `${labelledBy ? `${labelledBy} ` : ""}${descId}`;
      }
    } else if (labels) {
      [titleId, descId] = labels.split(" ");
    }
  }

  return { titleId, descId, labelledBy };
}

/**
 * The `SVGIcon` component is used to render inline SVG icons or SVG icons in a sprite map
 * as an icon.
 */
const SVGIcon: FunctionComponent<
  SVGIconProps & WithForwardedRef<SVGSVGElement>
> = providedProps => {
  const {
    style,
    className,
    use,
    "aria-labelledby": ariaLabelledBy,
    size,
    title: propTitle,
    desc: propDesc,
    style: propStyle,
    children: propChildren,
    dense,
    forwardedRef,
    ...props
  } = providedProps as WithDefaultProps;
  const { labelledBy, titleId, descId } = getA11yIds(
    use,
    ariaLabelledBy,
    propTitle,
    propDesc
  );

  let title = null;
  let desc = null;
  let children = propChildren;
  if (!children && use) {
    children = <use xlinkHref={use} />;
  }

  if (propTitle) {
    title = <title id={titleId}>{propTitle}</title>;
  }

  if (desc) {
    desc = <desc id={descId}>{desc}</desc>;
  }

  return (
    <svg
      {...props}
      ref={forwardedRef}
      style={createStyle(style, size)}
      aria-labelledby={ariaLabelledBy || labelledBy}
      className={cn(
        "rmd-icon rmd-icon--svg",
        {
          "rmd-icon--dense": dense,
        },
        className
      )}
    >
      {title}
      {desc}
      {children}
    </svg>
  );
};

const defaultProps: DefaultProps = {
  role: "img",
  focusable: "false",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  dense: false,
};

SVGIcon.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  SVGIcon.displayName = "SVGIcon";

  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    SVGIcon.propTypes = {
      className: PropTypes.string,
      role: PropTypes.string,
      "aria-labelledby": PropTypes.string,
      title: PropTypes.string,
      desc: PropTypes.string,
      focusable: PropTypes.oneOf(["true", "false"]),
      size: PropTypes.number,
      viewBox: PropTypes.string,
      xmlns: PropTypes.string,
      use: PropTypes.string,
      dense: PropTypes.bool,
      children: PropTypes.node,
    };
  }
}

export default forwardRef<SVGSVGElement, SVGIconProps>((props, ref) => (
  <SVGIcon {...props} forwardedRef={ref} />
));
