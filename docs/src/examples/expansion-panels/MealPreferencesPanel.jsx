import React, { PureComponent, PropTypes } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import ExpansionPanel from 'react-md/lib/ExpansionPanels';
import SelectField from 'react-md/lib/SelectFields';

// From United Airlines
import preferences from 'constants/mealPreferences';

export default class MealPreferencesPanel extends PureComponent {
  static propTypes = {
    // These two props get injected from `ExpansionList`. You need to
    // inject them into the `ExpansionPanel` to get correct styling and
    // keyboard accessibility
    focused: PropTypes.bool,
    columnWidths: PropTypes.arrayOf(PropTypes.number),
  };

  constructor(props) {
    super(props);

    this.state = {
      preference: preferences[0],
      tempPreference: preferences[0],
    };
  }

  _setPreference = () => {
    this.setState({ preference: this.state.tempPreference });
  };

  _resetPreference = () => {
    this.setState({ tempPreference: this.state.preference });
  };

  _handleChange = (tempPreference) => {
    this.setState({ tempPreference });
  };

  render() {
    const { columnWidths, focused } = this.props;
    const { preference, tempPreference } = this.state;
    const label = [
      'Meal preferences',
      <div key="sec" className="md-panel-secondary-label">Optional</div>,
    ];
    return (
      <ExpansionPanel
        focused={focused}
        columnWidths={columnWidths}
        label={label}
        secondaryLabel={preference.label}
        onSave={this._setPreference}
        onCancel={this._resetPreference}
        contentClassName="meal-preference-container"
      >
        <SelectField
          label="Meal Preferences"
          menuItems={preferences}
          value={tempPreference.label}
          onChange={this._handleChange}
          lineDirection="right"
          menuClassName="meal-preference-select"
        />
        <CSSTransitionGroup
          component="article"
          className="meal-preference"
          transitionName="opacity"
          transitionEnterTimeout={1000}
          transitionLeave={false}
        >
          <h5 className="md-subheading-1">Description:</h5>
          <p className="md-body-1" key={tempPreference.description}>{tempPreference.description}</p>
        </CSSTransitionGroup>
      </ExpansionPanel>
    );
  }
}
