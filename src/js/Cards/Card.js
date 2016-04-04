import React, { Component, PropTypes } from 'react';
import TransitionGroup from 'react-addons-transition-group';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import { Height } from '../Transitions';

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
    raise: PropTypes.bool,
    isExpanded: PropTypes.bool,
    onExpanderClick: PropTypes.func,
  };

  static defaultProps = {
    raise: true,
    isInitialExpanded: false,
    iconClassName: 'material-icons',
    iconChildren: 'keyboard_arrow_down',
  };

  static childContextTypes = {
    onExpandClick: PropTypes.func,
    isExpanded: PropTypes.bool,
    iconClassName: PropTypes.string,
    iconChildren: PropTypes.string,
  };

  getChildContext = () => {
    const { iconClassName, iconChildren, isExpanded } = this.props;
    return {
      onExpandClick: this.handleExpandClick,
      isExpanded: typeof isExpanded !== 'undefined' ? isExpanded : this.state.expanded,
      iconClassName,
      iconChildren,
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
    return (
      <TransitionGroup
        component="div"
        {...props}
        className={classnames('md-card', className, {
          'raise': raise,
        })}
        >
        {React.Children.map(children, (child, i) => {
          if(!child) { return child; }
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
        })}
      </TransitionGroup>
    );
  }
}
