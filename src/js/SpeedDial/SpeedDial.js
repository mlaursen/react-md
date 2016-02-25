import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import TransitionGroup from 'react-addons-transition-group';

import { FloatingButton } from 'react-md/lib/Buttons';

export default class SpeedDial extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { isOpen: props.initiallyOpen };
  }

  static propTypes = {
    initiallyOpen: PropTypes.bool,
    children: PropTypes.element.isRequired,
    fabs: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.shape({
        onClick: PropTypes.func,
        iconClassName: PropTypes.string,
        children: PropTypes.node,
      }),
    ])).isRequired,
  };

  toggleSpeedDial = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const fabs = this.props.fabs.map((fab, i) => {
      if(React.isValidElement(fab)) {
        fab = React.Children.only(fab);
        return React.cloneElement(fab, {
          ...fab.props,
          className: 'md-speed-dial-fab',
          key: fab.key || i,
          mini: true,
        });
      } else {
        return React.createElement(FloatingButton, {
          ...fab.props,
          className: 'md-speed-dial-fab',
          key: fab.key || i,
          mini: true,
        });
      }
    });
    const child = React.Children.only(this.props.children);
    const mainFAB = React.cloneElement(child, {
      ...child.props,
      onClick: (e) => {
        child.props.onClick && child.props.onClick(e);
        this.toggleSpeedDial();
      },
      fixed: true,
    });
    return (
      <div className="md-speed-dial-container">
        <TransitionGroup>
          {fabs}
        </TransitionGroup>
        {mainFAB}
      </div>
    );
  }
}
