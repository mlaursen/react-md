import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

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
    aspectRatio: (props, propName) => {
      if(!/[0-9]+:[0-9]+/.test(props[propName])) {
        return new Error(`'${props[propName]}' is not a valid aspect ratio. It must be formatted as 'x:x'.`);
      }
    },
  }

  static defaultProps = {
    forceAspect: true,
    aspectRatio: '16:9',
  }

  render() {
    const { className, overlay, children, forceAspect, aspectRatio, ...props } = this.props;
    return (
      <section {...props} className={classnames('md-card-media', className, { [`md-media-${aspectRatio.replace(':', '-')}`]: forceAspect })}>
        {children}
        {overlay && <div className="md-card-media-overlay">{overlay}</div>}
      </section>
    );
  }
}
