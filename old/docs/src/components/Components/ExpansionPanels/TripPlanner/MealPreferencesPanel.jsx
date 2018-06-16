import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { ExpansionPanel, SelectField } from 'react-md';

// From United Airlines
import mealPreferences from 'constants/sampleData/mealPreferences';

const label = [
  'Meal preferences',
  <div className="md-panel-secondary-label" key="secondary">Optional</div>,
];

export default class MealPreferencesPanel extends PureComponent {
  static propTypes = {
    // Notice these three props. They are injected via the `ExpansionList` component
    // and are required to get correct styling and keyboard accessibility.
    focused: PropTypes.bool,
    overflown: PropTypes.bool,
    columnWidths: PropTypes.arrayOf(PropTypes.number),
  };

  state = { preference: mealPreferences[0], tempPreference: mealPreferences[0] };

  setMealPreference = (label, i) => {
    this.setState({ tempPreference: mealPreferences[i] });
  };

  save = () => {
    this.setState({ preference: this.state.tempPreference });
  };

  cancel = () => {
    this.setState({ tempPreference: this.state.preference });
  };

  render() {
    const { preference, tempPreference } = this.state;
    return (
      <ExpansionPanel
        {...this.props}
        label={label}
        secondaryLabel={preference.label}
        onSave={this.save}
        onCancel={this.cancel}
        contentClassName="md-grid"
      >
        <SelectField
          id="trip-meal-preferences"
          label="Meal preferences"
          menuItems={mealPreferences}
          itemValue="label"
          value={tempPreference.label}
          onChange={this.setMealPreference}
          lineDirection="right"
          className="md-cell md-cell--5 md-cell--tablet-8"
          deleteKeys="description"
        />
        <CSSTransitionGroup
          component="section"
          className="md-cell md-cell--7 md-cell--tablet-8"
          transitionName="meal-opacity"
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
