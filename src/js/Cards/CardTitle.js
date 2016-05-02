import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import CardExpander from './CardExpander';

/**
 * The `CardTitle` component is used to display the main content title for the card.
 *
 * This can include an optional `Avatar` to display before the title as well as
 * an optional subtitle.
 *
 * This component can also act as an expander which will inject the `CardExpander`.
 */
export default class CardTitle extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

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
