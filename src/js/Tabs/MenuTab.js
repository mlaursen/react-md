import React, { PureComponent, PropTypes } from 'react';
import Menu from '../Menus';
import Tab from './Tab';

export default class MenuTab extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    onClick: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = { isOpen: false };
    this._toggleOpen = this._toggleOpen.bind(this);
  }

  _toggleOpen(e) {
    if (this.props.onClick) {
      this.props.onClick(e);
    }
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const tab = <Tab {...this.props} onClick={this._toggleOpen} />;
    return (
      <Menu toggle={tab} isOpen={this.state.isOpen} id="woop" />
    );
  }
}
