import React, { PureComponent, PropTypes } from 'react';
import Button from 'react-md/lib/Buttons/Button';
import Toolbar from 'react-md/lib/Toolbars';
import Drawer from 'react-md/lib/Drawers';

import './_styles.scss';
import LoremIpsum from 'components/LoremIpsum';
const NAV_ITEMS = [{ primaryText: 'Woop Woop' }, { primaryText: 'That\'s the Sound' }, { primaryText: 'Of the Police' }];

export default class Preview extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);

    this.state = { visible: false };
  }

  _toggleDrawer = () => {
    this.setState({ visible: !this.state.visible });
  }

  _handleVisibilityChange = (visible) => {
    this.setState({ visible });
  };

  render() {
    return (
      <section className="md-background--card theme-preview" ref={container => { this._container = container; }}>
        <Toolbar
          nav={<Button icon onClick={this._toggleDrawer}>menu</Button>}
          title="Theme Preview"
          colored
          fixed
        />
        <div className="md-grid md-toolbar-relative">
          <h2 className="md-display-1 md-cell md-cell--12">Look at this</h2>
          <LoremIpsum units="sentences" className="md-cell md-cell--12" component="p" />
          <Button primary raised style={{ marginLeft: 8, marginTop: '1em' }}>
            Button
          </Button>
        </div>
        <Drawer
          renderNode={this._container}
          header={<Toolbar title="Theme Preview" />}
          navClassName="md-toolbar-relative"
          navItems={NAV_ITEMS}
          visible={this.state.visible}
          onVisibilityChange={this._handleVisibilityChange}
          overlay
          type={Drawer.DrawerTypes.TEMPORARY}
        />
        <Button floating secondary fixed>email</Button>
      </section>
    );
  }
}
