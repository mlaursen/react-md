import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import CardExpander from './CardExpander';

/**
 * The `CardActions` component is used for adding actions on your card.
 * The actions should be `FlatButton`s or `IconButton`s.
 *
 * This component can act as a `CardExpander`.
 */
export default class CardActions extends Component {
  constructor(props, context) {
    super(props, context);
  }

  static contextTypes = {
    isExpanded: PropTypes.bool.isRequired,
    onExpandClick: PropTypes.func.isRequired,
    iconClassName: PropTypes.string.isRequired,
    iconChildren: PropTypes.string,
  };

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

  render() {
    const { className, children, isExpander, centered, ...props } = this.props;
    return (
      <section {...props} className={classnames('md-card-actions', className, { centered })}>
        <div className="action-area">
          {children}
        </div>
        {isExpander && <CardExpander />}
      </section>
    );
  }
}
