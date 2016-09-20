import React, { PureComponent, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import Menu from 'react-md/lib/Menus/Menu';
import ListItem from 'react-md/lib/Lists/ListItem';

import LoremIpsum from 'components/LoremIpsum';

export default class ContextMenuExample extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);

    this.state = { isOpen: false, listStyle: null };
    this._undo = this._undo.bind(this);
    this._copy = this._copy.bind(this);
    this._handleOpen = this._handleOpen.bind(this);
    this._handleClose = this._handleClose.bind(this);
    this._setMenuRef = this._setMenuRef.bind(this);
  }

  _copy() {
    // Works on every browser except most recent Android and Opera Mini
    document.execCommand('copy');
    this.setState({ copied: true });
  }

  _undo() {
    document.execCommand('undo');
    this.setState({ copied: false });
  }

  _setMenuRef(menuRef) {
    if (menuRef !== null) {
      this._menu = findDOMNode(menuRef);
      // React's onContextMenu is crap compared to default
      this._menu.addEventListener('contextmenu', this._handleOpen);
    }
  }

  _handleOpen(e) {
    e.preventDefault();
    const left = e.offsetX;
    const top = e.offsetY + e.target.offsetTop;

    if (this.state.isOpen) {
      this._timeout = setTimeout(() => {
        this._timeout = null;

        this.setState({ isOpen: true });
      }, 150);
    }

    this.setState({ isOpen: !this.state.isOpen, listStyle: { top, left } });
  }

  _handleClose() {
    this.setState({ isOpen: false });
  }

  render() {
    const { copied, ...state } = this.state;
    return (
      <Menu
        {...state}
        ref={this._setMenuRef}
        onClose={this._handleClose}
        toggle={<LoremIpsum count={5} />}
        position={Menu.Positions.CONTEXT}
      >
        <ListItem disabled={!copied} primaryText="Undo" onClick={this._undo} />
        <ListItem disabled primaryText="Redo" />
        <ListItem disabled primaryText="Cut" />
        <ListItem primaryText="Copy" onClick={this._copy} />
        <ListItem disabled primaryText="Paste" />
      </Menu>
    );
  }
}
