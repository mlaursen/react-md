import React, { PureComponent } from 'react';
import Button from 'react-md/lib/Buttons/Button';
import Toolbar from 'react-md/lib/Toolbars';
import Drawer from 'react-md/lib/Drawers';

const NAV_ITEMS = ['Woop woop', 'That\'s the sound', 'Of the Police'];
const styles = {
  button: {
    marginLeft: 8,
    marginTop: '1em',
  },
};

export default class Preview extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { visible: false };
  }

  toggleDrawer = () => {
    this.setState({ visible: !this.state.visible });
  };

  handleVisibilityChange = (visible) => {
    this.setState({ visible });
  };

  render() {
    return (
      <section className="md-background--card theme-preview" ref={(container) => { this._container = container; }}>
        <Toolbar
          nav={<Button icon onClick={this.toggleDrawer}>menu</Button>}
          title="Theme Preview"
          colored
          fixed
        />
        <div className="md-grid md-toolbar-relative">
          <h2 className="md-display-1 md-cell md-cell--12">Look at this</h2>
          <Button primary raised style={styles.button}>
            Button
          </Button>
        </div>
        <Drawer
          renderNode={this._container}
          header={<Toolbar title="Theme Preview" />}
          navClassName="md-toolbar-relative"
          navItems={NAV_ITEMS}
          visible={this.state.visible}
          onVisibilityChange={this.handleVisibilityChange}
          overlay
          type={Drawer.DrawerTypes.TEMPORARY}
        />
        <Button floating secondary fixed>email</Button>
      </section>
    );
  }
}
