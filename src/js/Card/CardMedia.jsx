import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import { isPropEnabled } from '../utils/PropUtils';

export default class CardMedia extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    className: PropTypes.string,
    overlay: PropTypes.node,
    children: PropTypes.node,
    forceAspect: PropTypes.bool,
    aspectRatio: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
  }

  static defaultProps = {
    aspectRatio: {
      x: 16,
      y: 9,
    },
  }

  render() {
    const { className, overlay, children, aspectRatio, ...props } = this.props;
    return (
      <section {...props} className={classnames('md-card-media', className, { [`md-media-${aspectRatio.x}-${aspectRatio.y}`]: isPropEnabled(props, 'forceAspect') })}>
        {children}
        {overlay && <div className="md-card-media-overlay">{overlay}</div>}
      </section>
    );
  }
}
