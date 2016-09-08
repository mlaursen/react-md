import React, { PureComponent, PropTypes } from 'react';
import TransitionGroup from 'react-addons-transition-group';
import cn from 'classnames';

import Height from '../Transitions/Height';
import contextTypes from './contextTypes';

/**
 * The `Card` component is a sheet of material that serves as an entry point to
 * more detailed information. A card could contain a photo, text, and a link
 * about a single subject.
 *
 * The `Card` component also defines `contextTypes` for checking if the `Card`
 * is expanded. The expander icon can have a tooltip and be changed through
 * props. If the card is not expanded, the children components will not be
 * visible until it has been toggled.
 */
export default class Card extends PureComponent {
  static propTypes = {
    /**
     * An optional className to apply to the card.
     */
    className: PropTypes.string,

    /**
     * Any Card parts that should be rendered.
     */
    children: PropTypes.node,

    /**
     * The icon className to use for the expander icon.
     */
    iconClassName: PropTypes.string,

    /**
     * Any icon children required for the expander icon.
     */
    iconChildren: PropTypes.string,

    /**
     * Boolean if the card is initially expanded when there is an expander
     * component.
     */
    initiallyExpanded: PropTypes.bool,

    /**
     * Boolean if the card should raise on hover when on a desktop display.
     */
    raise: PropTypes.bool,

    /**
     * Boolean if the card is currently expanded. This will require the `onExpanderClick` function
     * to toggle the state. The card will become controlled if this is not `undefined`.
     */
    isExpanded: PropTypes.bool,

    /**
     * An optional function to call when the expander is clicked.
     */
    onExpanderClick: PropTypes.func,

    /**
     * The tooltip position for the expander icon.
     */
    expanderTooltipPosition: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),

    /**
     * The optional tooltip to display for the expander icon.
     */
    expanderTooltipLabel: PropTypes.string,

    /**
     * An optional delay before the tooltip appears for the expander icon on hover.
     */
    expanderTooltipDelay: PropTypes.number,

    /**
     * Boolean if the card contains a table. It will update the styling accordingly.
     * When using the `DataTable` component, do not wrap it in a `CardText` component.
     *
     * ```js
     * <Card tableCard={true}>
     *   <CardTitle title="Example />
     *   <DataTable>
     *     ...
     *   </DataTable>
     * </Card>
     * ```
     */
    tableCard: PropTypes.bool,
  };

  static defaultProps = {
    raise: true,
    initiallyExpanded: false,
    iconClassName: 'material-icons',
    iconChildren: 'keyboard_arrow_down',
    expanderTooltipPosition: 'left',
  };

  static childContextTypes = contextTypes;

  constructor(props) {
    super(props);

    this.state = { expanded: props.initiallyExpanded };
    this._handleExpandClick = this._handleExpandClick.bind(this);
  }

  getChildContext() {
    const {
      iconClassName,
      iconChildren,
      isExpanded,
      expanderTooltipLabel,
      expanderTooltipDelay,
      expanderTooltipPosition,
    } = this.props;

    return {
      onExpandClick: this._handleExpandClick,
      isExpanded: typeof isExpanded !== 'undefined' ? isExpanded : this.state.expanded,
      iconClassName,
      iconChildren,
      tooltipLabel: expanderTooltipLabel,
      tooltipDelay: expanderTooltipDelay,
      tooltipPosition: expanderTooltipPosition,
    };
  }

  _handleExpandClick(e) {
    const { onExpanderClick, isExpanded } = this.props;
    if (onExpanderClick) {
      onExpanderClick(e);
    }

    if (typeof isExpanded === 'undefined') {
      this.setState({ expanded: !this.state.expanded });
    }
  }

  render() {
    const { className, children, raise, tableCard, ...props } = this.props;
    delete props.iconChildren;
    delete props.iconClassName;
    delete props.initiallyExpanded;
    delete props.expanderTooltipLabel;
    delete props.expanderTooltipDelay;
    delete props.expanderTooltipPosition;
    delete props.onExpanderClick;

    let expanderIndex = -1;
    const cardChildren = React.Children.map(children, (child, i) => {
      if (!child || !child.props) { return child; }
      if (expanderIndex < 0 && child.props.isExpander) {
        expanderIndex = i;
      }

      if (!child.props.expandable) {
        return child;
      } else if (expanderIndex !== i && expanderIndex > -1 && !this.state.expanded) {
        return null;
      } else {
        return <Height>{child}</Height>;
      }
    });
    return (
      <TransitionGroup
        component="div"
        {...props}
        className={cn('md-card', className, { raise, 'md-table-card': tableCard })}
      >
        {cardChildren}
      </TransitionGroup>
    );
  }
}
