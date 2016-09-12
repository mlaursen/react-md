import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

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
     * An optional image source to use for the avatar.
     */
    src: PropTypes.string,

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
    children: PropTypes.string,

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
      'blue-grey',
    ],
  };

  _getColor(suffix, suffixes, random) {
    if (suffix) {
      return `md-avatar--${suffix}`;
    } else if (!!suffixes && !random) {
      return 'md-avatar--default';
    }

    const i = (Math.floor(Math.random() * (suffixes.length - 1)) + 1);
    return `md-avatar--${suffixes[i]}`;
  }

  render() {
    const {
      className,
      src,
      alt,
      icon,
      children,
      suffix,
      suffixes,
      random,
      iconSized,
      ...props,
    } = this.props;

    return (
      <div
        {...props}
        className={cn('md-avatar', this._getColor(suffix, suffixes, random), {
          'md-avatar--icon-sized': iconSized,
        }, className)}
      >
        {src && <img src={src} alt={alt} className="md-avatar-img" />}
        {!src &&
          <div className="md-avatar-content">
            {icon || children}
          </div>
        }
      </div>
    );
  }
}
