import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  List,
  ListItem,
  SelectionControl,
  SelectionControlGroup,
} from 'react-md';

export default class DisablingInk extends PureComponent {
  static childContextTypes = {
    inkDisabled: PropTypes.bool,
  };

  getChildContext() {
    return { inkDisabled: true };
  }

  render() {
    return (
      <div className="md-grid inks__disabled-examples">
        <section className="md-cell">
          <h4>Lists</h4>
          <List>
            <ListItem primaryText="Item 1" />
            <ListItem primaryText="Item 2" />
            <ListItem primaryText="Item 3" />
            <ListItem primaryText="Item 4" />
          </List>
        </section>
        <section className="md-cell inks__disabled-examples__btns">
          <h4>Buttons</h4>
          <Button flat primary>Flat button</Button>
          <Button raised secondary>Raised button</Button>
          <Button icon>home</Button>
          <Button floating primary>favorite</Button>
        </section>
        <section className="md-cell">
          <h4>Selection Controls</h4>
          <SelectionControl
            id="checkbox-control"
            name="selection-controls"
            type="checkbox"
            label="Checkbox"
          />
          <SelectionControl
            id="switch-control"
            name="selection-controls"
            type="switch"
            label="Switch"
          />
          <SelectionControlGroup
            id="radio-controls"
            name="selection-controls"
            type="radio"
            controls={[{ label: 'Radio 1', value: 'a' }, { label: 'Radio 2', value: 'b' }]}
          />
        </section>
      </div>
    );
  }
}
