import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { setCustomTheme } from 'actions/ui';

import ThemeBuilder from 'components/Customization/Themes/ThemeBuilder';


@connect(() => ({}), { setCustomTheme })
export default class ThemeBuilderContainer extends PureComponent {
  static propTypes = {
    setCustomTheme: PropTypes.func.isRequired,
  };

  render() {
    const { setCustomTheme } = this.props;
    return <ThemeBuilder setCustomTheme={setCustomTheme} />;
  }
}
