import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import SelectField from 'react-md/lib/SelectFields';
import { updateDrawerType } from 'actions/ui';

import Drawer from 'react-md/lib/Drawers';
const types = Object.keys(Drawer.DrawerTypes).map(key => Drawer.DrawerTypes[key]);

@connect(() => ({}), { updateDrawerType })
export default class ControlReactMDDrawer extends PureComponent {
  static propTypes = {
    updateDrawerType: PropTypes.func.isRequired,
    className: PropTypes.string,
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <section className="md-grid">
        <SelectField
          className="md-cell"
          id="drawerType"
          menuItems={types}
          label="Drawer Type"
          defaultValue={Drawer.getCurrentMedia(Drawer.defaultProps).type}
          onChange={this.props.updateDrawerType}
        />
      </section>
    );
  }
}
