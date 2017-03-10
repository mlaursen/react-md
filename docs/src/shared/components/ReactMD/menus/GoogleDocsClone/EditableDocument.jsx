import React, { PureComponent, PropTypes } from 'react';
import CardText from 'react-md/lib/Cards/CardText';
import FontIcon from 'react-md/lib/FontIcons';
import Menu from 'react-md/lib/Menus/Menu';
import ListItem from 'react-md/lib/Lists/ListItem';
import TextField from 'react-md/lib/TextFields';

const anchor = {
  x: Menu.HorizontalAnchors.CENTER,
  y: Menu.VerticalAnchors.BOTTOM,
};

export default class EditableDocument extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);

    this.state = { visible: false };
  }

  _open = () => {
    this.setState({ visible: true });
  };

  _close = () => {
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
        onClose={this._close}
        onContextMenu={this._open}
        toggle={textField}
        component={CardText}
        block
        listInline
        anchor={anchor}
        centered
      >
        <ListItem leftIcon={<FontIcon>content_cut</FontIcon>} primaryText="Cut" />
        <ListItem leftIcon={<FontIcon>content_copy</FontIcon>} primaryText="Copy" />
        <ListItem leftIcon={<FontIcon>content_paste</FontIcon>} primaryText="Paste" />
      </Menu>
    );
  }
}
