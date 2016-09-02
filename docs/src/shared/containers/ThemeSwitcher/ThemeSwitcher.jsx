import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import SelectField from 'react-md/lib/SelectFields';

import themes from 'constants/themes';
import { updateTheme } from 'actions/ui';

import './_theme-switcher.scss';

@connect(({ ui: { theme } }) => ({ value: theme }), { onChange: updateTheme })
export default class ThemeSwitcher extends PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  render() {
    const { value, onChange } = this.props;

    return (
      <SelectField
        id="themeSwitcher"
        label="Theme"
        menuClassName="fr theme-switcher"
        value={value}
        onChange={onChange}
        menuItems={themes}
        position={SelectField.Positions.BELOW}
        noAutoAdjust
      />
    );
  }
}
