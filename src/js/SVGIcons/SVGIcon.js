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
     * An optional size to apply to the svg. This can be used to set both the
     * `height` and `width` simultaniously. This will be provided as inline styles
     * since the `height` and `width` are normally controlled by CSS, and CSS has
     * higher precidence than the `height`/`width` attributes.
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
     * This should be a link to a part of an svg spritemap. So normally one of te following:
     * - `'#some-custom-svg'`
     * - `'/images/spritemap.svg#some-custom-svg'`
     *
     * This prop **should not** be used with the `children` prop as only one will be rendered.
     *
     * > NOTE: IE **does not support** external svgs. Please see the demo for more details.
     */
    use: PropTypes.string,

    /**
     * Any `<svg>` children to render to create your icon. This can not be used with the `use` prop.
     */
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element),
    ]),

    /**
     * The viewBox attribute allows you to specify that a given set of graphics stretch to
     * fit a particular container element.
     *
     * The value of the viewBox attribute is a list of four numbers min-x, min-y, width and
     * height, separated by whitespace and/or a comma, which specify a rectangle in user
     * space which should be mapped to the bounds of the viewport established by the given
     * element, taking into account attribute preserveAspectRatio.
     *
     * Negative values for width or height are not permitted and a value of zero disables
     * rendering of the element.An optional viewbox for the svg.
     *
     * For example, if the SVG element is 250 (width) by 200 (height) and you provide
     * `viewBox="0 0 25 20"`, the coordinates inside the SVG will go from the top left corenr
     * (0, 0) to the bottom right (25, 20) and each unit will be worth `10px`.
     */
    viewBox: PropTypes.string,

    /**
     * An optional xmlns string to provide. The `use` prop will not work wihtout this prop
     * defined.
     */
    xmlns: PropTypes.string,
  };

  static defaultProps = {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24',
  };

  constructor(props) {
    super();

    this.state = { styles: this._mergeStyles(props) };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.style !== nextProps.style || this.props.size !== nextProps.size) {
      this.setState({ styles: this._mergeStyles(nextProps) });
    }
  }

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
    const { styles } = this.state;
    const {
      className,
      disabled,
      use,
      primary,
      secondary,
      error,
      inherit,
      /* eslint-disable no-unused-vars */
      size,
      style: propStyle,
      children: propChildren,
      /* eslint-enable no-unused-vars */
      ...props
    } = this.props;

    let { children } = this.props;
    if (!children && use) {
      children = <use xlinkHref={use} />;
    }

    return (
      <svg
        {...props}
        style={styles}
        className={cn('md-icon', themeColors({
          disabled,
          error,
          inherit,
          primary,
          secondary,
        }, className))}
      >
        {children}
      </svg>
    );
  }
}
