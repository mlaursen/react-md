import React, { PureComponent } from 'react';
import { Button, Grid, Cell, Toolbar, Drawer, bem } from 'react-md';

const NAV_ITEMS = [
  { primaryText: 'Woop woop' },
  { primaryText: 'That\'s the sound' },
  { primaryText: 'Of the Police' },
];

const idPrefix = 'theme-builder-preview';

export default class Preview extends PureComponent {
  state = { visible: false };

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
          id={`${idPrefix}-toolbar`}
          nav={<Button id={`${idPrefix}-drawer-toggle`} icon onClick={this.toggleDrawer}>menu</Button>}
          title="Theme Preview"
          colored
          fixed
        />
        <Grid className="md-toolbar-relative">
          <Cell component="h2" size={12} className="md-display-1">Look at this</Cell>
          <Button id={`${idPrefix}-btn`} primary raised className={bem('theme-preview', 'btn')}>
            Button
          </Button>
        </Grid>
        <Drawer
          id={`${idPrefix}-drawer`}
          renderNode={this._container}
          header={<Toolbar title="Theme Preview" id={`${idPrefix}-drawer-toolbar`} />}
          navClassName="md-toolbar-relative"
          navItems={NAV_ITEMS}
          visible={this.state.visible}
          onVisibilityChange={this.handleVisibilityChange}
          overlay
          type={Drawer.DrawerTypes.TEMPORARY}
        />
        <Button id={`${idPrefix}-floating-btn`} floating secondary fixed>email</Button>
      </section>
    );
  }
}
