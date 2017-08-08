import React, { PureComponent, Children } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import deprecated from 'react-prop-types/lib/deprecated';

import controlled from '../utils/PropTypes/controlled';
import getField from '../utils/getField';
import contextTypes from './contextTypes';
import getDeprecatedIcon from '../FontIcons/getDeprecatedIcon';
import FontIcon from '../FontIcons/FontIcon';
import Paper from '../Papers/Paper';
import Collapse from '../Helpers/Collapse';

export default class Card extends PureComponent {
  static propTypes = {
    /**
     * An optional style to apply.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the card.
     */
    className: PropTypes.string,

    /**
     * Any Card parts that should be rendered.
     */
    children: PropTypes.node,

    /**
     * Boolean if the card is expanded by default when there is an expander
     * component.
     */
    defaultExpanded: PropTypes.bool,

    /**
     * Boolean if the card should raise on hover when on a desktop display.
     */
    raise: PropTypes.bool,

    /**
     * Boolean if the card is currently expanded. This will require the `onExpanderClick` function
     * to toggle the state. The card will become controlled if this is not `undefined`.
     */
    expanded: controlled(PropTypes.bool, 'onExpanderClick', 'defaultExpanded'),

    /**
     * An optional function to call when the expander is clicked.
     */
    onExpanderClick: PropTypes.func,

    /**
     * The icon to use for the expander button. It is recommended to use this prop over
     * the `expaderIconChildren` and `expanderIconClassName` since it provides more control.
     */
    expanderIcon: PropTypes.element,

    /**
     * The tooltip position for the expander icon.
     */
    expanderTooltipPosition: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),

    /**
     * The optional tooltip to display for the expander icon.
     */
    expanderTooltipLabel: PropTypes.node,

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

    /**
     * An optional function to call when the mouseover event is triggered.
     */
    onMouseOver: PropTypes.func,

    /**
     * An optional function to call when the mouseleave event is triggered.
     */
    onMouseLeave: PropTypes.func,

    /**
     * An optional function to call when the touchstart event is triggered.
     */
    onTouchStart: PropTypes.func,

    /**
     * Boolean if the card expansion should be animated.
     */
    animate: PropTypes.bool,

    expanderIconClassName: deprecated(PropTypes.string, 'Use `expanderIcon` instead'),
    expanderIconChildren: deprecated(PropTypes.node, 'Use `expanderIcon` instead'),
    initiallyExpanded: deprecated(PropTypes.bool, 'Use `defaultExpanded` instead'),
    isExpanded: deprecated(PropTypes.bool, 'Use `expanded` instead'),
    iconChildren: deprecated(PropTypes.node, 'Use the `expanderIconChildren` prop instead'),
    iconClassName: deprecated(PropTypes.string, 'Use the `expanderIconClassName` prop instead'),
  };

  static defaultProps = {
    animate: true,
    expanderIcon: <FontIcon>keyboard_arrow_down</FontIcon>,
    expanderTooltipPosition: 'left',
  };

  static childContextTypes = contextTypes;

  constructor(props) {
    super(props);

    this.state = {
      zDepth: 1,
      expanded: typeof props.initiallyExpanded !== 'undefined' ? props.initiallyExpanded : !!props.defaultExpanded,
    };
  }

  getChildContext() {
    const {
      expanderTooltipLabel,
      expanderTooltipDelay,
      expanderTooltipPosition,
      expanderIcon,

      // deprecated
      iconClassName,
      iconChildren,
      expanderIconClassName,
      expanderIconChildren,
    } = this.props;

    const expanded = typeof this.props.isExpanded !== 'undefined'
      ? this.props.isExpanded
      : getField(this.props, this.state, 'expanded');

    return {
      expanded,
      onExpandClick: this._handleExpandClick,
      icon: getDeprecatedIcon(
        iconChildren || expanderIconChildren,
        iconClassName || expanderIconClassName,
        expanderIcon
      ),
      tooltipLabel: expanderTooltipLabel,
      tooltipDelay: expanderTooltipDelay,
      tooltipPosition: expanderTooltipPosition,
    };
  }

  _handleMouseOver = (e) => {
    if (this.props.onMouseOver) {
      this.props.onMouseOver(e);
    }

    if (this.props.raise && !this._touched) {
      this.setState({ zDepth: 4 });
    }
  };

  _handleMouseLeave = (e) => {
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(e);
    }


    this._touched = false;
    if (this.props.raise && this.state.zDepth !== 1) {
      this.setState({ zDepth: 1 });
    }
  };

  _handleTouchStart = (e) => {
    if (this.props.onTouchStart) {
      this.props.onTouchStart(e);
    }

    this._touched = true;
  };

  _handleExpandClick = (e) => {
    const { onExpanderClick } = this.props;
    const expanded = !getField(this.props, this.state, 'expanded');
    if (onExpanderClick) {
      onExpanderClick(expanded, e);
    }

    if (typeof this.props.expanded === 'undefined') {
      this.setState({ expanded });
    }
  };

  render() {
    const { zDepth } = this.state;
    const {
      className,
      raise,
      tableCard,
      children,
      animate,
      /* eslint-disable no-unused-vars */
      expanded: propExpanded,
      onExpanderClick,
      defaultExpanded,
      expanderIcon,
      expanderIconChildren,
      expanderIconClassName,
      expanderTooltipLabel,
      expanderTooltipDelay,
      expanderTooltipPosition,

      // deprecated
      iconChildren,
      iconClassName,
      isExpanded,
      initiallyExpanded,
      /* eslint-enable no-unused-vars */
      ...props
    } = this.props;

    const expanded = typeof this.props.isExpanded !== 'undefined'
      ? this.props.isExpanded
      : getField(this.props, this.state, 'expanded');
    let expanderIndex = -1;
    const parts = Children.map(Children.toArray(children), (child, i) => {
      if (!child || !child.props) {
        return child;
      } else if (expanderIndex < 0 && (child.props.isExpander || child.props.expander)) {
        expanderIndex = i;
      }

      if (!child.props.expandable) {
        return child;
      }

      const collapsed = expanderIndex === -1 || expanderIndex === i || !expanded;
      return <Collapse collapsed={collapsed} animate={animate}>{child}</Collapse>;
    });

    return (
      <Paper
        {...props}
        zDepth={zDepth}
        className={cn('md-card', {
          'md-card--raise': raise,
          'md-card--table': tableCard,
        }, 'md-background--card', className)}
        onMouseOver={this._handleMouseOver}
        onMouseLeave={this._handleMouseLeave}
        onTouchStart={this._handleTouchStart}
      >
        {parts}
      </Paper>
    );
  }
}
