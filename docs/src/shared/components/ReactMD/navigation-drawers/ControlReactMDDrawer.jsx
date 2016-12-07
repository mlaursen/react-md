import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import SelectField from 'react-md/lib/SelectFields';
import { updateDrawerType } from 'actions/ui';

import Drawer from 'react-md/lib/Drawers';
import { isPermanent, isPersistent } from 'react-md/lib/Drawers/isType';
const types = Object.keys(Drawer.DrawerTypes).map(key => Drawer.DrawerTypes[key]);

@connect(({ ui: { drawer: { mobile, tablet } } }) => ({ mobile, tablet }), { updateDrawerType })
export default class ControlReactMDDrawer extends PureComponent {
  static propTypes = {
    mobile: PropTypes.bool.isRequired,
    tablet: PropTypes.bool.isRequired,
    updateDrawerType: PropTypes.func.isRequired,
    className: PropTypes.string,
    children: PropTypes.node,
  };

  componentWillUnmount() {
    this.props.updateDrawerType(undefined);
  }

  render() {
    const { mobile, tablet } = this.props;
    const allowedTypes = types.filter(type => !(isPermanent(type) && (mobile || tablet)) && !(isPersistent(type) && mobile));

    return (
      <section className="md-grid">
        <SelectField
          className="md-cell"
          id="drawerType"
          menuItems={allowedTypes}
          label="Drawer Type"
          defaultValue={Drawer.getCurrentMedia(Drawer.defaultProps).type}
          onChange={this.props.updateDrawerType}
        />
      </section>
    );
  }
}
