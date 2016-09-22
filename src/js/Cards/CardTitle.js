import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

import contextTypes from './contextTypes';
import CardExpander from './CardExpander';

/**
 * The `CardTitle` component is used to display the main content title for the card.
 *
 * This can include an optional `Avatar` to display before the title as well as
 * an optional subtitle.
 *
 * This component can also act as an expander which will inject the `CardExpander`.
 */
export default class CardTitle extends PureComponent {
  static propTypes = {
    /**
     * The main title to display.
     */
    title: PropTypes.string.isRequired,

    /**
     * An optional subtitle.
     */
    subtitle: PropTypes.string,

    /**
     * The optional className to apply.
     */
    className: PropTypes.string,

    /**
     * An optional `Avatar` to display before the titles.
     */
    avatar: PropTypes.node,

    /**
     * Any additional children to display after the titles.
     */
    children: PropTypes.node,

    /**
     * Boolean if this should act as an expander. This will inject the
     * `CardExpander` after the titles and optional children.
     */
    isExpander: PropTypes.bool,

    /**
     * Boolean if this component should be expandable when there is a `CardExpander`
     * above it in the `Card`.
     */
    expandable: PropTypes.bool,

    /**
     * An optional id to give the primary title
     */
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
  };

  static defaultProps = {
    avatar: null,
  };

  static contextTypes = contextTypes;

  render() {
    const { id, title, subtitle, avatar, className, children, isExpander, ...props } = this.props;
    delete props.expandable;

    return (
      <div
        {...props}
        className={cn('md-card-title', className, {
          'title-large': !!avatar,
          'card-expander': isExpander,
        })}
      >
        {avatar}
        <div className="titles">
          <h2 id={id} className="md-headline">{title}</h2>
          {subtitle && <h3 className="md-subheader">{subtitle}</h3>}
        </div>
        {children}
        {isExpander && <CardExpander />}
      </div>
    );
  }
}
