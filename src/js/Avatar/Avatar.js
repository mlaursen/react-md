import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import { isPropEnabled } from '../utils/PropUtils';

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
    color: PropTypes.number,
    maxColor: PropTypes.number,
  };

  static defaultProps = {
    maxColor: 3,
  };

  getColor = () => {
    const { color, maxColor } = this.props;
    if(!isPropEnabled(this.props, 'random') && !color) {
      return null;
    }

    const i = color || (Math.floor(Math.random() * maxColor) + 1);
    return `md-avatar-color-${i}`;
  };

  render() {
    const { className, src, alt, icon, children } = this.props;
    return (
      <div className={classnames('md-avatar', className, this.getColor())}>
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
