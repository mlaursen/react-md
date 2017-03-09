import React, { PureComponent, PropTypes } from 'react';
import Button from 'react-md/lib/Buttons/Button';
import Dialog from 'react-md/lib/Dialogs';
import Layover from 'react-md/lib/Helpers/Layover';
import Toolbar from 'react-md/lib/Toolbars';
import List from 'react-md/lib/Lists/List';
import ListItem from 'react-md/lib/Lists/ListItem';

import LoremIpsum from 'components/LoremIpsum';

export default class DialogExample extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);

    this.state = { visible: false, layoverVisible: false, contextMenuVisible: false };
  }

  open = () => {
    this.setState({ visible: true });
  };

  close = () => {
    this.setState({ visible: false });
  };

  openLayover = () => {
    this.setState({ layoverVisible: true });
  };

  closeLayover = () => {
    this.setState({ layoverVisible: false });
  };

  openContextMenu = () => {
    this.setState({ contextMenuVisible: true });
  };

  closeContextMenu = () => {
    this.setState({ contextMenuVisible: false });
  };

  render() {
    const { visible, layoverVisible, contextMenuVisible } = this.state;
    const nav = <Button icon onClick={this.close}>arrow_back</Button>;
    const toggle = <Button raised label="Click for Layover" onClick={this.openLayover} />;
    return (
      <div>
        <Button raised primary label="Open Dialog" onClick={this.open} />
        <Dialog
          id="layover-dialog-example"
          visible={visible}
          fullPage
          aria-labelledby="layover-dialog-title"
          dialogClassName="md-toolbar-relative md-grid md-grid--24-40"
        >
          <Toolbar nav={nav} title="Layover in Dialog" titleId="layover-dialog-title" colored fixed />
          <Layover
            className="md-text-container md-cell md-cell--12"
            toggle={<LoremIpsum count={10} />}
            onClose={this.closeContextMenu}
            onContextMenu={this.openContextMenu}
            anchor={{
              x: Layover.HorizontalAnchors.CENTER,
              y: Layover.VerticalAnchors.BOTTOM,
            }}
            visible={contextMenuVisible}
          >
            <List inline className="md-paper md-paper--2">
              <ListItem primaryText="Cut" disabled />
              <ListItem primaryText="Copy" />
              <ListItem primaryText="Paste" disabled />
            </List>
          </Layover>
          <Layover
            className="md-cell md-cell--12 md-text-container"
            toggle={toggle}
            visible={layoverVisible}
            onClose={this.closeLayover}
          >
            <div>Wowza!</div>
          </Layover>
          <LoremIpsum count={10} className="md-text-container md-cell md-cell--12" />
        </Dialog>
      </div>
    );
  }
}
