import React, { Component, PropTypes } from 'react';
import TransitionGroup from 'react-addons-transition-group';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import { isPropEnabled } from '../utils/PropUtils';
import Height from '../Transitions';

export default class Card extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { expanded: props.isInitialExpanded };
  }

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    iconClassName: PropTypes.string,
    iconChildren: PropTypes.string,
    isInitialExpanded: PropTypes.bool,
  }

  static defaultProps = {
    isInitialExpanded: false,
  }

  static childContextTypes = {
    onExpandClick: PropTypes.func,
    isExpanded: PropTypes.bool,
    iconClassName: PropTypes.string,
    iconChildren: PropTypes.string,
  }

  getChildContext = () => {
    const iconClassName = 'material-icons' || this.props.iconClassName;
    return {
      onExpandClick: this.handleExpandClick,
      isExpanded: this.state.expanded,
      iconClassName,
      iconChildren: 'keyboard_arrow_down' || this.props.iconChildren,
    };
  }

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const { className, children, ...props } = this.props;

    let expanderIndex = -1;
    return (
      <TransitionGroup component="div" {...props} className={classnames('md-card', className)}>
        {React.Children.map(children, (child, i) => {
          if(expanderIndex < 0 && isPropEnabled(child.props, 'isExpander')) {
            expanderIndex = i;
          }

          return (expanderIndex !== i && expanderIndex > -1 && !this.state.expanded) ? null : <Height>{child}</Height>;
        })}
      </TransitionGroup>
    );
  }
}
