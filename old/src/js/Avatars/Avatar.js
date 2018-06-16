import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import oneRequiredForA11yIf from '../utils/PropTypes/oneRequiredForA11yIf';

/**
 * The avatar component is used to convert a `FontIcon`, an image, or
 * a letter into an avatar.
 *
 * Any other props given to the Avatar component such as event listeners
 * or styles will also be applied.
 */
export default class Avatar extends PureComponent {
  static propTypes = {
    /**
     * An optional className to apply to the avatar.
     */
    className: PropTypes.string,

    /**
     * An optional style to apply to either the `<img>` or `<div>` surrounding the content. The `<img>` tag
     * will be used with the `src` prop is defined.
     */
    contentStyle: PropTypes.object,

    /**
     * An optional className to apply to either the `<img>` or `<div>` surrounding the content. The `<img>` tag
     * will be used with the `src` prop is defined.
     */
    contentClassName: PropTypes.string,

    /**
     * An optional image source to use for the avatar.
     */
    src: oneRequiredForA11yIf(PropTypes.string, 'role', 'alt'),

    /**
     * An optional image alt to use for the avatar if it is
     * an image.
     */
    alt: PropTypes.string,

    /**
     * An optional `FontIcon` to convert into an avatar.
     */
    icon: PropTypes.node,

    /**
     * An optional letter to display in the avatar.
     */
    children: PropTypes.node,

    /**
     * A boolean if a random color should be applied to the avatar.
     * This will be one of the `suffixes`.
     */
    random: PropTypes.bool,

    /**
     * A list of available suffixes to use when generating a random
     * color for the avatar.
     */
    suffixes: PropTypes.arrayOf(PropTypes.string),

    /**
     * The suffix to use for a color. This can be any value but
     * *should* be one of the available `suffixes`.
     */
    suffix: PropTypes.string,

    /**
     * Boolean if the `Avatar` should be sized to a `FontIcon` size. This
     * will just set the width and height to the `$md-font-icon-size`.
     */
    iconSized: PropTypes.bool,

    /**
     * A role for the avatar's image. When the `src` prop is set, either a `role` of `presentation`
     * or the `alt` prop must be defined for a11y.
     */
    role: PropTypes.oneOf(['presentation']),
  };

  static defaultProps = {
    suffixes: [
      'red',
      'pink',
      'purple',
      'deep-purple',
      'indigo',
      'blue',
      'light-blue',
      'cyan',
      'teal',
      'green',
      'light-green',
      'lime',
      'yellow',
      'amber',
      'orange',
      'deep-orange',
      'brown',
      'grey',
      'blue-grey',
    ],
  };

  state = { color: null };

  componentWillMount() {
    if (this.props.random) {
      this._setRandomColor();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.random && (this.props.src !== nextProps.src || this.props.icon !== nextProps.icon)) {
      this._setRandomColor();
    } else if (this.props.random && !nextProps.random) {
      this.setState({ color: null });
    }
  }

  _setRandomColor = () => {
    const { suffixes } = this.props;

    const i = (Math.floor(Math.random() * (suffixes.length - 1)) + 1);
    this.setState({ color: suffixes[i] });
  };

  _getColor(suffix, suffixes, color) {
    if (suffix) {
      return `md-avatar--${suffix}`;
    } else if (!!suffixes && !color) {
      return 'md-avatar--default';
    }

    return `md-avatar--${color}`;
  }

  render() {
    const {
      className,
      contentStyle,
      contentClassName,
      src,
      alt,
      icon,
      children,
      suffix,
      suffixes,
      iconSized,
      role,
      random, // eslint-disable-line no-unused-vars
      ...props
    } = this.props;

    let content;
    if (src) {
      content = (
        <img
          src={src}
          alt={alt}
          role={role}
          style={contentStyle}
          className={cn('md-avatar-img', contentClassName)}
        />
      );
    } else {
      content = (
        <div
          style={contentStyle}
          className={cn('md-avatar-content', contentClassName)}
        >
          {icon || children}
        </div>
      );
    }
    return (
      <div
        {...props}
        className={cn('md-inline-block md-avatar', this._getColor(suffix, suffixes, this.state.color), {
          'md-avatar--icon-sized': iconSized,
        }, className)}
      >
        {content}
      </div>
    );
  }
}
