import React, { PureComponent, PropTypes } from 'react';
import Layover from 'react-md/lib/Helpers/Layover';
import LoremIpsum from 'components/LoremIpsum';
import { List, ListItem } from 'react-md/lib/Lists';

const anchor = {
  x: Layover.HorizontalAnchors.CENTER,
  y: Layover.VerticalAnchors.BOTTOM,
};

export default class ContextMenuLayover extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);

    this.state = { visible: false };
  }

  open = () => {
    this.setState({ visible: true });
  };

  close = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible } = this.state;
    return (
      <div>
        <Layover
          id="context-menu-layover"
          onContextMenu={this.open}
          toggle={<LoremIpsum count={3} />}
          onClose={this.close}
          visible={visible}
          anchor={anchor}
        >
          <List className="md-paper md-paper--2" inline>
            <ListItem primaryText="Copy" />
            <ListItem primaryText="Paste" />
          </List>
        </Layover>
      </div>
    );
  }
}
