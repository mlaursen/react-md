import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import CardExpander from './CardExpander';

export default class CardTitle extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    className: PropTypes.string,
    avatar: PropTypes.node,
    children: PropTypes.node,
    isExpander: PropTypes.bool,
  };

  static defaultProps = {
    avatar: null,
  };

  render() {
    const { title, subtitle, avatar, className, children, isExpander, ...props } = this.props;
    return (
      <div {...props} className={classnames('md-card-title', className, { 'title-large': !!avatar, 'card-expander': isExpander })}>
        {avatar}
        <div className="titles">
          <h2 className="md-headline">{title}</h2>
          {subtitle && <h3 className="md-subheader">{subtitle}</h3>}
        </div>
        {children}
        {isExpander && <CardExpander />}
      </div>
    );
  }
}
