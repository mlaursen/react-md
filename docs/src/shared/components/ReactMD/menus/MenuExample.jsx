import React, { PureComponent, PropTypes } from 'react';
import Button from 'react-md/lib/Buttons/Button';
import ListItem from 'react-md/lib/Lists/ListItem';
import Menu from 'react-md/lib/Menus/Menu';

export default class MenuExample extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);

    this.state = { visible: false };
  }

  _toggle = () => {
    this.setState({ visible: !this.state.visible });
  };

  _close = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible } = this.state;
    const toggle = (
      <Button raised onClick={this._toggle}>Open Menu</Button>
    );

    return (
      <Menu id="menu-example-1" visible={visible} onClose={this._close} toggle={toggle} cascading>
        <ListItem primaryText="Item 1" onClick={() => console.log('Clicked item 1')} />
        <ListItem primaryText="Item 2" onClick={() => console.log('Clicked item 2')} />
        <ListItem primaryText="Item 3" onClick={() => console.log('Clicked item 3')} />
        <ListItem
          primaryText="Nested Items"
          nestedItems={[
            <ListItem key="item-1" primaryText="Item 1" onClick={() => console.log('Clicked item 1')} />,
            <ListItem key="item-2" primaryText="Item 2" onClick={() => console.log('Clicked item 2')} />,
            <ListItem key="item-3" primaryText="Item 3" onClick={() => console.log('Clicked item 3')} />,
          ]}
        />
      </Menu>
    );
  }
}
