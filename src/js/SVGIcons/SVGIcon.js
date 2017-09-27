import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import deprecated from 'react-prop-types/lib/deprecated';

import themeColors from '../utils/themeColors';

/**
 * The `SVGIcon` component is used for rendering inline SVG icons or sprite-mapped SVGs
 * as an icon.
 */
export default class SVGIcon extends PureComponent {
  static propTypes = {
    /**
     * An optional style to apply.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply.
     */
    className: PropTypes.string,

    /**
     * Boolean if the primary theme color should be applied.
     */
    primary: PropTypes.bool,

    /**
     * Boolean if the secondary theme color should be applied.
     */
    secondary: PropTypes.bool,

    /**
     * Boolean if the icon is considered disabled and should inherit the
     * disabled color.
     */
    disabled: PropTypes.bool,

    /**
     * Boolean if the icon is considered errored and should inherit the error color.
     */
    error: PropTypes.bool,

    /**
     * Boolean if the color of the icon should be inherited by parent elements.
     */
    inherit: PropTypes.bool,

    /**
     * The role to apply to the SVG. When using icons, it is generally recommended to leave it as the default
     * `img` so that it is insured as a graphic.
     */
    role: PropTypes.oneOf(['img', 'presentation']),

    /**
     * This prop is the title attribute to provide to the `<svg>` element itself. This should be used when you
     * are using a spritesheet that has defined `<title>` with each SVG symbol.
     */
    titleAttr: PropTypes.string,

    /**
     * An optional list of ids to use to label the SVG icon with. This is helpful to add when you use the `title`
     * and `desc` props as this is used to create ids for those two props. This is super beneficial to screen readers.
     *
     * When this is defined, it is a space-delimited string of ids to provide to the title and desc (in order). If
     * this is omitted and the `use` prop is defined, it will take everything after the `#` sign and append `-title` and
     * `-desc` as a fallback. Check out the examples for more information about this.
     *
     * @see {@link #title}
     * @see {@link #desc}
     */
    'aria-labelledby': PropTypes.string,

    /**
     * An optional title to give to your SVG icon. This is generally recommended for accessibility when not using
     * the `use` prop, or your spritemap does not contain `<title>` and `<desc>.
     *
     * @see {@link #aria-labelledby}
     */
    title: PropTypes.string,

    /**
     * An optional description to give to your SVG icon. This is generally recommended for accessibility when not using
     * the `use` prop, or your spritemap does not contain `<title>` and `<desc>.
     *
     * @see {@link #aria-labelledby}
     */
    desc: PropTypes.string,

    /**
     * This should be a link to a part of an SVG spritemap. So normally one of the following:
     * - `'#some-custom-svg'`
     * - `'/images/spritemap.svg#some-custom-svg'`
     *
     * This prop **should not** be used with the `children` prop as only one will be rendered.
     *
     * > NOTE: IE **does not support** external SVGs. Please see the demo for more details.
     */
    use: PropTypes.string,

    /**
     * Any `<svg>` children to render to create your icon. This can not be used with the `use` prop.
     */
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.node,
    ]),

    /**
     * Boolean if the SVG should gain the `focusable` attribute. This is disabled by default since IE11
     * and Edge actually default this to true and keyboard's will tab focus all SVGs.
     */
    focusable: PropTypes.string,

    /**
     * An optional size to apply to the SVG. This can be used to set both the
     * `height` and `width` simultaneously. This will be provided as inline styles
     * since the `height` and `width` are normally controlled by CSS, and CSS has
     * higher precedence than the `height`/`width` attributes.
     */
    size: PropTypes.number,

    /**
     * The `height` prop should not be used since the `height` and `width` are controlled by CSS and the CSS
     * has a higher precedence than inline attributes. If you want to set the `height`, it should be done via
     * CSS or the `size` prop.
     *
     * @see {@link #size}
     */
    height: deprecated(PropTypes.number, 'Use the `size` prop instead.'),

    /**
     * The `width` prop should not be used since the `height` and `width` are controlled by CSS and the CSS
     * has a higher precedence than inline attributes. If you want to set the `height`, it should be done via
     * CSS or the `size` prop.
     *
     * @see {@link #size}
     */
    width: deprecated(PropTypes.number, 'Use the `size` prop instead.'),

    /**
     * The viewBox attribute allows you to specify that a given set of graphics stretch to
     * fit a particular container element.
     *
     * The value of the viewBox attribute is a list of four numbers min-x, min-y, width and
     * height, separated by white space and/or a comma, which specify a rectangle in user
     * space which should be mapped to the bounds of the viewport established by the given
     * element, taking into account attribute preserveAspectRatio.
     *
     * Negative values for width or height are not permitted and a value of zero disables
     * rendering of the element.An optional viewbox for the SVG.
     *
     * For example, if the SVG element is 250 (width) by 200 (height) and you provide
     * `viewBox="0 0 25 20"`, the coordinates inside the SVG will go from the top left corner
     * (0, 0) to the bottom right (25, 20) and each unit will be worth `10px`.
     */
    viewBox: PropTypes.string,

    /**
     * An optional xmlns string to provide. The `use` prop will not work without this prop
     * defined.
     */
    xmlns: PropTypes.string,
  };

  static defaultProps = {
    role: 'img',
    focusable: 'false',
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24',
  };

  constructor(props) {
    super();

    this.state = {
      styles: this._mergeStyles(props),
      ...this._getIds(props),
    };
  }

  componentWillReceiveProps(nextProps) {
    const { style, size, use, title, desc, 'aria-labelledby': labels } = this.props;
    let nextState;
    if (style !== nextProps.style || size !== nextProps.size) {
      nextState = { styles: this._mergeStyles(nextProps) };
    }


    if (title !== nextProps.title || desc !== nextProps.desc ||
      ((nextProps.title || nextProps.desc) && (use !== nextProps.use || labels !== nextProps['aria-labelledby']))
    ) {
      nextState = { ...nextState, ...this._getIds(nextProps) };
    }

    if (nextState) {
      this.setState(nextState);
    }
  }

  _getIds = ({ use, 'aria-labelledby': labels, title, desc }) => {
    let titleId = null;
    let descId = null;
    let labelledBy = null;
    if (title || desc) {
      if (use) {
        const baseId = use.replace(/.*#/, '');
        titleId = `${baseId}-title`;
        descId = `${baseId}-desc`;

        if (title) {
          labelledBy = `${baseId}-title`;
        }

        if (desc) {
          labelledBy = `${labelledBy ? `${labelledBy} ` : ''}${descId}`;
        }
      } else if (labels) {
        [titleId, descId] = labels.split(' ');
      }
    }

    return { titleId, descId, labelledBy };
  };

  _mergeStyles = ({ style, size }) => {
    if (style && size) {
      return { height: size, width: size, ...style };
    } else if (style) {
      return style;
    } else if (size) {
      return { height: size, width: size };
    }

    return undefined;
  };

  render() {
    const { styles, titleId, descId, labelledBy } = this.state;
    const {
      className,
      disabled,
      use,
      primary,
      secondary,
      error,
      inherit,
      titleAttr,
      'aria-labelledby': ariaLabelledBy,
      /* eslint-disable no-unused-vars */
      size,
      title: propTitle,
      desc: propDesc,
      style: propStyle,
      children: propChildren,
      /* eslint-enable no-unused-vars */
      ...props
    } = this.props;

    let { children, title, desc } = this.props;
    if (!children && use) {
      children = <use xlinkHref={use} />;
    }

    if (title) {
      title = <title id={titleId}>{title}</title>;
    }

    if (desc) {
      desc = <desc id={descId}>{desc}</desc>;
    }

    return (
      <svg
        {...props}
        title={titleAttr}
        aria-labelledby={ariaLabelledBy || labelledBy}
        style={styles}
        className={cn('md-icon', themeColors({
          disabled,
          error,
          inherit,
          primary,
          secondary,
        }, className))}
      >
        {title}
        {desc}
        {children}
      </svg>
    );
  }
}
