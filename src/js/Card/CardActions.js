import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import { isPropEnabled } from '../utils/PropUtils';
import CardExpander from './CardExpander';

export default class CardActions extends Component {
  static contextTypes = {
    isExpanded: PropTypes.bool.isRequired,
    onExpandClick: PropTypes.func.isRequired,
    iconClassName: PropTypes.string.isRequired,
    iconChildren: PropTypes.string,
  }

  static propTypes = {
    isExpander: PropTypes.bool,
    className: PropTypes.string,
    stacked: PropTypes.bool,
    children: PropTypes.node,
  }

  static defaultProps = {
    stacked: false,
  }

  render() {
    const { className, children, isExpander, ...props } = this.props;
    return (
      <section {...props} className={classnames('md-card-actions', className, { 'md-card-actions-stacked': isPropEnabled(props, 'stacked') })}>
        {children}
        {isExpander && <CardExpander />}
      </section>
    );
  }
}
