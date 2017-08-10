import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import themeColors from '../utils/themeColors';

const ICON_SIZE = 24;

/**
 * The \`FontIcon\` component is used for rendering a font-icon library's
 * icon. The default is to use the `material-icons` library, but others
 * can be used as well.
 *
 * If you are using another font-icon library that does not always create
 * icons with a perfect 1:1 scale (such as font-awesome), it is recommended
 * to update the `.md-icon` styles to set the width and height to `$md-font-icon-size`.
 * However, this will prevent different sided icons.
 *
 * ```scss
 * .md-icon.fa {
 *   height: $md-font-icon-size;
 *   width: $md-font-icon-size;
 * }
 * ```
 */
export default class FontIcon extends PureComponent {
  static propTypes = {
    /**
     * An optional style to apply.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the `FontIcon`.
     */
    className: PropTypes.string,

    /**
     * The icon font library className to use to display the icon.
     */
    iconClassName: PropTypes.string.isRequired,

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
     * Boolean if the error color should be applied to the icon.
     */
    error: PropTypes.bool,

    /**
     * Boolean if the color of the icon should be inherited by parent elements.
     */
    inherit: PropTypes.bool,

    /**
     * Either a boolean that will enforce the 24x24 size of the font icon or a number of the size
     * to enforce. This is useful when using other font icon libraries that do not have a consistent
     * size.
     */
    forceSize: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number,
    ]),

    /**
     * Boolean if the `forceSize` prop should also force the `font-size` instead of only `width` and `height`.
     */
    forceFontSize: (props, propName, component, ...args) => {
      let error = PropTypes.bool(props, propName, component, ...args);
      if (!error && typeof props.forceSize === 'undefined' && props[propName]) {
        error = new Error(
          `You provided a \`forceFontSize\` prop to the ${component} component, without specifying the \`forceSize\` ` +
          `prop. Either set the \`forceSize\` prop to a boolean or a number, or disable \`${propName}\`.`
        );
      }

      return error;
    },

    /**
     * Any children required to display the icon with the font library.
     */
    children: PropTypes.node,
  };

  static defaultProps = {
    iconClassName: 'material-icons',
  };

  constructor(props) {
    super();

    this.state = { styles: this._mergeStyles(props) };
  }

  componentWillReceiveProps(nextProps) {
    const { style, forceSize, forceFontSize } = this.props;
    if (style !== nextProps.style || forceSize !== nextProps.forceSize || forceFontSize !== nextProps.forceFontSize) {
      this.setState({ styles: this._mergeStyles(nextProps) });
    }
  }

  _mergeStyles = ({ style, forceSize, forceFontSize }) => {
    let styles = style;
    if (typeof forceSize === 'boolean') {
      styles = {
        height: ICON_SIZE,
        width: ICON_SIZE,
        fontSize: forceFontSize ? ICON_SIZE : undefined,
        ...style,
      };
    } else if (typeof forceSize === 'number') {
      styles = {
        height: forceSize,
        width: forceSize,
        fontSize: forceFontSize ? forceSize : undefined,
        ...style,
      };
    }

    return styles;
  };

  render() {
    const { styles } = this.state;
    const {
      iconClassName,
      className,
      children,
      disabled,
      primary,
      secondary,
      error,
      inherit,
      /* eslint-disable no-unused-vars */
      style,
      forceSize,
      forceFontSize,
      /* eslint-enable no-unused-vars */
      ...props
    } = this.props;

    const classes = cn('md-icon', iconClassName, themeColors({
      disabled,
      error,
      inherit,
      primary,
      secondary,
    }), className);

    return (
      <i {...props} style={styles} className={classes}>
        {children}
      </i>
    );
  }
}
