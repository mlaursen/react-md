import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

export default class Avatar extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    className: PropTypes.string,
    src: PropTypes.string,
    alt: PropTypes.string,
    icon: PropTypes.node,
    children: PropTypes.string,
    random: PropTypes.bool,
    suffixes: PropTypes.arrayOf(PropTypes.string),
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
