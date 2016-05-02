import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

export default class CardMedia extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static aspect = {
    equal: '1-1',
    wide: '16-9',
  };

  static propTypes = {
    className: PropTypes.string,
    overlay: PropTypes.node,
    children: PropTypes.node,
    forceAspect: PropTypes.bool,
    aspectRatio: PropTypes.oneOf([CardMedia.aspect.equal, CardMedia.aspect.wide]).isRequired,
  };

  static defaultProps = {
    forceAspect: true,
    aspectRatio: CardMedia.aspect.wide,
  };

  render() {
    const { className, overlay, children, forceAspect, aspectRatio, ...props } = this.props;

    return (
      <section {...props} className={classnames('md-card-media', className, { [`md-media-${aspectRatio}`]: forceAspect })}>
        {children}
        {overlay && <div className="md-card-media-overlay">{overlay}</div>}
      </section>
    );
  }
}
