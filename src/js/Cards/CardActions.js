import React, { Component, PropTypes } from 'react';
import cn from 'classnames';

import CardExpander from './CardExpander';

/**
 * The `CardActions` component is used for adding actions on your card.
 * The actions should be `FlatButton`s or `IconButton`s.
 *
 * This component can act as a `CardExpander`.
 */
export default class CardActions extends Component {
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

    /**
     * Boolean if the actions should be stacked.
     */
    stacked: PropTypes.bool,
  };

  render() {
    const {
      className,
      children,
      isExpander,
      centered,
      stacked,
      ...props,
    } = this.props;
    return (
      <section
        {...props}
        className={cn('md-dialog-footer--card', {
          'md-dialog-footer--inline': !stacked,
          'md-dialog-footer--stacked': stacked,
          'md-dialog-footer--centered': centered,
        }, className)}
      >
        {children}
        {isExpander && <CardExpander />}
      </section>
    );
  }
}
