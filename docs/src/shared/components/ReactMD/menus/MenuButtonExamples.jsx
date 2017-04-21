import React, { PureComponent } from 'react';
import Button from 'react-md/lib/Buttons/Button';
import Dialog from 'react-md/lib/Dialogs';
import ListItem from 'react-md/lib/Lists/ListItem';
import MenuButton from 'react-md/lib/Menus/MenuButton';

const styles = {
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
};


export default class MenuButtonExamples extends PureComponent {
  state = { visible: false };

  open = () => {
    this.setState({ visible: true });
  };

  close = () => {
    this.setState({ visible: false });
  };
  render() {
    return (
      <div style={styles}>
        <Dialog
          id="test-dialog"
          title="Test Dialog"
          actions={<Button flat label="Close" onClick={this.close} />}
          visible={this.state.visible}
          onHide={this.close}
        >
          <h2>Hello</h2>
        </Dialog>
        <MenuButton
          id="button-menu"
          label="Toggle Open a Menu"
          raised
          buttonChildren="chat"
          className="menu-example"
        >
          <ListItem onClick={this.open} primaryText="Item One" />
          <ListItem onClick={this.open} primaryText="Item Two" />
          <ListItem onClick={this.open} primaryText="Item Three" />
          <ListItem onClick={this.open} primaryText="Item Four" />
        </MenuButton>
        <MenuButton
          id="vert-menu"
          icon
          buttonChildren="more_vert"
          className="menu-example"
          tooltipLabel="Open some menu"
        >
          <ListItem primaryText="Item One" />
          <ListItem primaryText="Item Two" />
          <ListItem primaryText="Item Three" />
          <ListItem primaryText="Item Four" />
        </MenuButton>
      </div>
    );
  }
}
