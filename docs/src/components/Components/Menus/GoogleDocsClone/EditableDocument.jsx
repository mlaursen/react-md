import React, { PureComponent } from 'react';
import { CardText, FontIcon, Menu, ListItem, TextField } from 'react-md';

const anchor = {
  x: Menu.HorizontalAnchors.CENTER,
  y: Menu.VerticalAnchors.BOTTOM,
};

export default class EditableDocument extends PureComponent {
  state = { visible: false };

  show = () => {
    // It can already be open if the user right clicks in another location
    // while it is currently open. The context menu callback will still be
    // called.
    if (!this.state.visible) {
      this.setState({ visible: true });
    }
  };

  hide = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible } = this.state;
    const textField = (
      <TextField
        id="editable-document"
        block
        rows={20}
        aria-label="The document's editable text content"
      />
    );

    return (
      <Menu
        id="document-container"
        listId="highlighted-options"
        visible={visible}
        onClose={this.hide}
        onContextMenu={this.show}
        toggle={textField}
        component={CardText}
        block
        listInline
        anchor={anchor}
        centered
        position={Menu.Positions.BELOW}
      >
        <ListItem leftIcon={<FontIcon>content_cut</FontIcon>} primaryText="Cut" />
        <ListItem leftIcon={<FontIcon>content_copy</FontIcon>} primaryText="Copy" />
        <ListItem leftIcon={<FontIcon>content_paste</FontIcon>} primaryText="Paste" />
      </Menu>
    );
  }
}
