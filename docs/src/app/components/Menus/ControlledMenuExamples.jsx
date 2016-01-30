import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import Menu from 'react-md/lib/Menus';
import { FlatButton } from 'react-md/lib/Buttons';
import { ListItem } from 'react-md/lib/Lists';

export default class ControlledMenuExamples extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { isOpen: false };
  }

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  };

  toggleOpen = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  close = () => {
    this.setState({ isOpen: false });
  };

  render() {
    return (
      <div>
        <Menu
          isOpen={this.state.isOpen}
          toggle={<FlatButton secondary onClick={this.toggleOpen} label="Toggle open some menu" />}
          close={this.close}
          position={Menu.positions[1]}
        >
          <ListItem primaryText="One" />
          <ListItem primaryText="Two" />
          <ListItem primaryText="Three" />
          <ListItem primaryText="Four" />
        </Menu>
      </div>
    );
  }
}
