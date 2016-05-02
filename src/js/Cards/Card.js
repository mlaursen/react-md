import React, { Component, PropTypes } from 'react';
import TransitionGroup from 'react-addons-transition-group';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import { Height } from '../Transitions';

export default class Card extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { expanded: props.initiallyExpanded };
  }

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    iconClassName: PropTypes.string,
    iconChildren: PropTypes.string,
    initiallyExpanded: PropTypes.bool,
    raise: PropTypes.bool,
    isExpanded: PropTypes.bool,
    onExpanderClick: PropTypes.func,
    expanderTooltipPosition: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
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
