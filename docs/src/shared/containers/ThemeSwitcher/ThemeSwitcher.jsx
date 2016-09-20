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

  componentWillMount() {
    if (__CLIENT__) {
      document.querySelector('html').classList.add(this.props.value);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      const { classList } = document.querySelector('html');

      classList.remove(this.props.value);
      classList.add(nextProps.value);
    }
  }

  render() {
    const { value, onChange } = this.props;

    return (
      <SelectField
        id="themeSwitcher"
        placeholder="Theme"
        menuClassName="theme-switcher"
        value={value}
        onChange={onChange}
        menuItems={themes}
        position={SelectField.Positions.BELOW}
      />
    );
  }
}
