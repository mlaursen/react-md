import React, { Component, PropTypes } from 'react';
import TransitionGroup from 'react-addons-transition-group';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import { Height } from '../Transitions';

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
export default class Card extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { expanded: props.initiallyExpanded };
  }

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
  };

  static defaultProps = {
    raise: true,
    initiallyExpanded: false,
    iconClassName: 'material-icons',
    iconChildren: 'keyboard_arrow_down',
    expanderTooltipPosition: 'left',
  };

  static childContextTypes = {
    onExpandClick: PropTypes.func,
    isExpanded: PropTypes.bool,
    iconClassName: PropTypes.string,
    iconChildren: PropTypes.string,
    tooltipPosition: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    tooltipLabel: PropTypes.string,
  };

  getChildContext = () => {
    const { iconClassName, iconChildren, isExpanded, expanderTooltipLabel, expanderTooltipPosition } = this.props;
    return {
      onExpandClick: this.handleExpandClick,
      isExpanded: typeof isExpanded !== 'undefined' ? isExpanded : this.state.expanded,
      iconClassName,
      iconChildren,
      tooltipLabel: expanderTooltipLabel,
      tooltipPosition: expanderTooltipPosition,
    };
  };

  handleExpandClick = (e) => {
    if(this.props.onExpanderClick) {
      this.props.onExpanderClick(e);
    }

    if(typeof this.props.isExpanded === 'undefined') {
      this.setState({ expanded: !this.state.expanded });
    }
  };

  render() {
    const { className, children, raise, ...props } = this.props;

    let expanderIndex = -1;
    const cardChildren = React.Children.map(children, (child, i) => {
      if(!child || !child.props) { return child; }
      if(expanderIndex < 0 && child.props.isExpander) {
        expanderIndex = i;
      }

      if(!child.props.expandable) {
        return child;
      } else if(expanderIndex !== i && expanderIndex > -1 && !this.state.expanded) {
        return null;
      } else {
        return <Height>{child}</Height>;
      }
    });
    return (
      <TransitionGroup
        component="div"
        {...props}
        className={classnames('md-card', className, { raise })}
        >
        {cardChildren}
      </TransitionGroup>
    );
  }
}
