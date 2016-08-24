import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

import CardExpander from './CardExpander';
import contextTypes from './contextTypes';

/**
 * The `CardActions` component is used for adding actions on your card.
 * The actions should be `FlatButton`s or `IconButton`s.
 *
 * This component can act as a `CardExpander`.
 */
export default class CardActions extends PureComponent {
  static propTypes = {
    /**
     * Boolean if this component should act as an expander and inject the
     * `CardExpander`.
     */
    isExpander: PropTypes.bool,

    /**
     * An optional className to apply to the actions container.
     */
    className: PropTypes.string,

    /**
     * An actions to display.
     */
    children: PropTypes.node,

    /**
     * Boolean if the actions should be centered.
     */
    centered: PropTypes.bool,
  };

  static contextTypes = contextTypes;

  render() {
    const { className, children, isExpander, centered, ...props } = this.props;
    return (
      <section {...props} className={cn('md-card-actions', className, { centered })}>
        <div className="action-area">
          {children}
        </div>
        {isExpander && <CardExpander />}
      </section>
    );
  }
}
