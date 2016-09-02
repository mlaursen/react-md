import React, { PureComponent, PropTypes } from 'react';
import NavigationDrawer from 'react-md/lib/NavigationDrawers';
import SelectField from 'react-md/lib/SelectFields';
import { connect } from 'react-redux';

import { updateDrawerType } from 'actions/ui';

const DrawerType = NavigationDrawer.DrawerType;

const menuItems = [{
  label: 'Full Height',
  value: DrawerType.FULL_HEIGHT,
}, {
  label: 'Clipped',
  value: DrawerType.CLIPPED,
}, {
  label: 'Floating',
  value: DrawerType.FLOATING,
}, {
  label: 'Persistent',
  value: DrawerType.PERSISTENT,
}, {
  label: 'Persistent Mini',
  value: DrawerType.PERSISTENT_MINI,
}, {
  label: 'Temporary',
  value: DrawerType.TEMPORARY,
}, {
  label: 'Temporary Mini',
  value: DrawerType.TEMPORARY_MINI,
}];

function getLabel(drawerType) {
  let label = '';
  menuItems.some(item => {
    if (item.value === drawerType) {
      label = item.label;
    }

    return label;
  });

  return label || menuItems[0].label;
}

@connect(({ ui: { media, drawer } }) => {
  let key = 'desktop';
  if (media.tablet) {
    key = 'tablet';
  }

  return {
    drawerType: getLabel(drawer[`${key}DrawerType`]),
  };
}, {
  updateDrawerType,
})
export default class NavigationDrawerDemo extends PureComponent {
  static propTypes = {
    drawerType: PropTypes.string.isRequired,
    updateDrawerType: PropTypes.func.isRequired,
  };

  componentWillUnmount() {
    this.props.updateDrawerType(null);
  }

  render() {
    const { drawerType, updateDrawerType } = this.props;
    return (
      <SelectField
        id="drawerSwitcher"
        value={drawerType}
        onChange={item => updateDrawerType(item.value)}
        menuItems={menuItems}
      />
    );
  }
}
