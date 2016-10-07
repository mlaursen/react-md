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
    tablet: PropTypes.bool.isRequired,
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

  _handleChange = (label, index) => {
    this.setState({ tempPreference: preferences[index] });
  };

  render() {
    const { columnWidths, focused, tablet } = this.props;
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
        secondaryLabel={tablet ? preference.label : null}
        onSave={this._setPreference}
        onCancel={this._resetPreference}
        contentClassName="md-grid"
      >
        <SelectField
          id="mealPreferences"
          label="Meal Preferences"
          menuItems={preferences}
          value={tempPreference.label}
          onChange={this._handleChange}
          lineDirection="right"
          menuClassName="md-cell md-cell--5"
        />
        <CSSTransitionGroup
          component="section"
          className="md-cell md-cell--7"
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
