import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

/**
 * The avatar component is used to convert a `FontIcon`, an image, or
 * a letter into an avatar.
 *
 * Any other props given to the Avatar component such as event listeners
 * or styles will also be applied.
 */
export default class Avatar extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

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
  };

  static defaultProps = {
    suffixes: ['color-1', 'color-2', 'color-3'],
  };

  getColor = () => {
    const { suffix, suffixes, random } = this.props;
    if(suffix) {
      return `md-avatar-${suffix}`;
    } else if(!!suffixes && !random) {
      return null;
    }

    const i = (Math.floor(Math.random() * (suffixes.length - 1)) + 1);
    return `md-avatar-${suffixes[i]}`;
  };

  render() {
    const { className, src, alt, icon, children, ...props } = this.props;
    return (
      <div className={classnames('md-avatar', className, this.getColor())} {...props}>
        {src && <img src={src} alt={alt} className="md-img-avatar" />}
        {!src &&
          <div className="md-avatar-content">
            {icon || children}
          </div>
        }
      </div>
    );
  }
}
